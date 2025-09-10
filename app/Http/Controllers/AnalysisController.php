<?php

namespace App\Http\Controllers;

use App\Models\Analysis;
use App\Models\JobDescription;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Smalot\PdfParser\Parser as PdfParser;

class AnalysisController extends Controller
{
    public function processJob(JobDescription $jobDescription, Request $request)
    {
        try {
            $apiKey = config('services.openai.key', env('OPENAI_API_KEY'));

            if (!$apiKey) {
                return back()->with('error', 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment.');
            }

            $parser = new PdfParser();
            $processedCount = 0;
            $errorCount = 0;
            $errors = [];

            // Parse job description if needed
            if (!$jobDescription->jd_text && $jobDescription->pdf_path) {
                $jdFullPath = storage_path('app/public/'.$jobDescription->pdf_path);
                if (is_file($jdFullPath)) {
                    try {
                        $jdText = (string) optional($parser->parseFile($jdFullPath))->getText();
                        $jobDescription->update([
                            'jd_text' => $jdText,
                            'status' => 'parsed',
                        ]);
                    } catch (\Exception $e) {
                        Log::error('Failed to parse job description PDF', [
                            'job_id' => $jobDescription->id,
                            'error' => $e->getMessage()
                        ]);
                        return back()->with('error', 'Failed to parse job description PDF: ' . $e->getMessage());
                    }
                }
            }

            $candidates = $jobDescription->candidates()->with(['resumes' => function ($q) {
                $q->latest();
            }])->get();

            if ($candidates->isEmpty()) {
                return back()->with('warning', 'No candidates found for this job. Please add candidates first.');
            }

            foreach ($candidates as $candidate) {
                $resume = $candidate->resumes->first();
                if (!$resume) {
                    $errors[] = "No resume found for candidate: {$candidate->name}";
                    $errorCount++;
                    continue;
                }

                // Parse resume if needed
                if (!$resume->resume_text && $resume->pdf_path) {
                    $resumeFullPath = storage_path('app/public/'.$resume->pdf_path);
                    if (is_file($resumeFullPath)) {
                        try {
                            $resumeText = (string) optional($parser->parseFile($resumeFullPath))->getText();
                            $resume->update(['resume_text' => $resumeText]);
                        } catch (\Exception $e) {
                            Log::error('Failed to parse resume PDF', [
                                'candidate_id' => $candidate->id,
                                'resume_id' => $resume->id,
                                'error' => $e->getMessage()
                            ]);
                            $errors[] = "Failed to parse resume for {$candidate->name}: " . $e->getMessage();
                            $errorCount++;
                            continue;
                        }
                    }
                }

                // Call OpenAI API
                $payload = [
                    'model' => 'gpt-4o-mini',
                    'messages' => [[
                        'role' => 'user',
                        'content' => "You are a recruiting assistant. Compare the Job Description and Candidate Resume. Return concise strengths (3-6 bullets), weaknesses (3-6 bullets), and a numeric fit score 0-100. Respond strictly as JSON with keys: strengths (array of strings), weaknesses (array of strings), score (number 0-100), rationale (short string).",
                    ], [
                        'role' => 'user',
                        'content' => "JOB DESCRIPTION:\n" . ($jobDescription->jd_text ?? '') . "\n\nRESUME:\n" . ($resume->resume_text ?? ''),
                    ]],
                    'temperature' => 0.2,
                    // Enforce JSON response when supported
                    'response_format' => [ 'type' => 'json_object' ],
                ];

                try {
                    $response = Http::withToken($apiKey)
                        ->timeout(60)
                        ->post('https://api.openai.com/v1/chat/completions', $payload);

                    if ($response->failed()) {
                        $responseBody = $response->body();
                        $errorDetails = json_decode($responseBody, true);

                        // Parse the error message from the response
                        $errorMessage = "OpenAI API error for {$candidate->name}";
                        if (isset($errorDetails['error']['message'])) {
                            $message = $errorDetails['error']['message'];

                            // Make common errors more user-friendly
                            if (str_contains($message, 'insufficient_quota')) {
                                $errorMessage = "OpenAI API quota exceeded for {$candidate->name}. Please check your billing and upgrade your plan.";
                            } elseif (str_contains($message, 'rate_limit')) {
                                $errorMessage = "OpenAI API rate limit exceeded for {$candidate->name}. Please wait a moment and try again.";
                            } elseif (str_contains($message, 'invalid_api_key')) {
                                $errorMessage = "Invalid OpenAI API key for {$candidate->name}. Please check your API key configuration.";
                            } else {
                                $errorMessage .= ": " . $message;
                            }
                        } elseif (isset($errorDetails['error']['type'])) {
                            $errorMessage .= ": " . $errorDetails['error']['type'];
                        } else {
                            $errorMessage .= " (Status: " . $response->status() . ")";
                        }

                        Log::error('OpenAI API failed', [
                            'candidate_id' => $candidate->id,
                            'status' => $response->status(),
                            'response' => $responseBody
                        ]);
                        $errors[] = $errorMessage;
                        $errorCount++;
                        continue;
                    }

                    $content = data_get($response->json(), 'choices.0.message.content');

                    // Try direct JSON decode first
                    $json = json_decode((string) $content, true);

                    if (!is_array($json)) {
                        // Strip Markdown code fences if present
                        $stripped = preg_replace('/^```[a-zA-Z]*\s*/', '', (string) $content);
                        if (is_string($stripped)) {
                            $stripped = preg_replace('/```\s*$/', '', $stripped);
                        }
                        if (is_string($stripped)) {
                            $try = json_decode($stripped, true);
                            if (is_array($try)) {
                                $json = $try;
                            }
                        }
                    }

                    if (!is_array($json)) {
                        // Fallback: extract first JSON object from text
                        if (preg_match('/\{[\s\S]*\}/', (string) $content, $m)) {
                            $try2 = json_decode($m[0], true);
                            if (is_array($try2)) {
                                $json = $try2;
                            }
                        }
                    }

                    if (!is_array($json) || !isset($json['strengths'], $json['weaknesses'], $json['score'])) {
                        $errorMessage = "Invalid response format for {$candidate->name}";
                        Log::error('Invalid OpenAI response format', [
                            'candidate_id' => $candidate->id,
                            'content' => $content
                        ]);
                        $errors[] = $errorMessage;
                        $errorCount++;
                        continue;
                    }

                    $strengths = implode("\n", $json['strengths'] ?? []);
                    $weaknesses = implode("\n", $json['weaknesses'] ?? []);
                    $score = (float) ($json['score'] ?? 0);

                    Analysis::updateOrCreate([
                        'candidate_id' => $candidate->id,
                        'job_description_id' => $jobDescription->id,
                    ], [
                        'strengths' => $strengths,
                        'weaknesses' => $weaknesses,
                        'explanations' => ['rationale' => $json['rationale'] ?? ''],
                        'score' => $score,
                    ]);

                    $candidate->update(['fit_score' => $score]);
                    $processedCount++;

                } catch (\Exception $e) {
                    $errorMessage = "Exception processing {$candidate->name}: " . $e->getMessage();
                    Log::error('Exception during candidate processing', [
                        'candidate_id' => $candidate->id,
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                    $errors[] = $errorMessage;
                    $errorCount++;
                }
            }

            $jobDescription->update(['processed_at' => now(), 'status' => 'scored']);

            // Prepare response message
            if ($processedCount > 0 && $errorCount === 0) {
                $message = "Successfully processed {$processedCount} candidate(s).";
                return back()->with('success', $message);
            } elseif ($processedCount > 0 && $errorCount > 0) {
                $message = "Processed {$processedCount} candidate(s) successfully, but {$errorCount} failed.";
                return back()->with('warning', $message)->with('error_details', $errors);
            } else {
                $message = "Failed to process all candidates. Please check the errors below.";

                // Add helpful message for quota exceeded
                $hasQuotaError = false;
                foreach ($errors as $error) {
                    if (str_contains($error, 'quota exceeded')) {
                        $hasQuotaError = true;
                        break;
                    }
                }

                if ($hasQuotaError) {
                    $message .= " If you see quota exceeded errors, please check your OpenAI billing and upgrade your plan.";
                }

                return back()->with('error', $message)->with('error_details', $errors);
            }

        } catch (\Exception $e) {
            Log::error('Critical error in processJob', [
                'job_id' => $jobDescription->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'A critical error occurred: ' . $e->getMessage());
        }
    }

    public function processCandidate(Candidate $candidate, Request $request)
    {
        try {
            $apiKey = config('services.openai.key', env('OPENAI_API_KEY'));
            if (!$apiKey) {
                return back()->with('error', 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment.');
            }

            $parser = new PdfParser();
            $jobDescription = $candidate->jobDescription()->first();
            if (!$jobDescription) {
                return back()->with('error', 'Missing job description for this candidate.');
            }

            // Ensure texts are parsed
            if (!$jobDescription->jd_text && $jobDescription->pdf_path) {
                $jdFullPath = storage_path('app/public/'.$jobDescription->pdf_path);
                if (is_file($jdFullPath)) {
                    try {
                        $jdText = (string) optional($parser->parseFile($jdFullPath))->getText();
                        $jobDescription->update(['jd_text' => $jdText, 'status' => 'parsed']);
                    } catch (\Exception $e) {
                        return back()->with('error', 'Failed to parse job description PDF: '.$e->getMessage());
                    }
                }
            }

            $resume = $candidate->resumes()->latest()->first();
            if (!$resume) {
                return back()->with('error', 'No resume found for this candidate.');
            }

            if (!$resume->resume_text && $resume->pdf_path) {
                $resumeFullPath = storage_path('app/public/'.$resume->pdf_path);
                if (is_file($resumeFullPath)) {
                    try {
                        $resumeText = (string) optional($parser->parseFile($resumeFullPath))->getText();
                        $resume->update(['resume_text' => $resumeText]);
                    } catch (\Exception $e) {
                        return back()->with('error', 'Failed to parse resume PDF: '.$e->getMessage());
                    }
                }
            }

            $payload = [
                'model' => 'gpt-4o-mini',
                'messages' => [[
                    'role' => 'user',
                    'content' => "You are a recruiting assistant. Compare the Job Description and Candidate Resume. Return concise strengths (3-6 bullets), weaknesses (3-6 bullets), and a numeric fit score 0-100. Respond strictly as JSON with keys: strengths (array of strings), weaknesses (array of strings), score (number 0-100), rationale (short string).",
                ], [
                    'role' => 'user',
                    'content' => "JOB DESCRIPTION:\n" . ($jobDescription->jd_text ?? '') . "\n\nRESUME:\n" . ($resume->resume_text ?? ''),
                ]],
                'temperature' => 0.2,
                'response_format' => [ 'type' => 'json_object' ],
            ];

            $response = Http::withToken($apiKey)->timeout(60)->post('https://api.openai.com/v1/chat/completions', $payload);
            if ($response->failed()) {
                $body = $response->body();
                Log::error('OpenAI API failed (single)', ['candidate_id' => $candidate->id, 'status' => $response->status(), 'response' => $body]);
                return back()->with('error', 'OpenAI API failed: '.$response->status());
            }

            $content = data_get($response->json(), 'choices.0.message.content');

            // Parse JSON with robust extractor (same as batch)
            $json = json_decode((string) $content, true);
            if (!is_array($json)) {
                $stripped = preg_replace('/^```[a-zA-Z]*\s*/', '', (string) $content);
                if (is_string($stripped)) {
                    $stripped = preg_replace('/```\s*$/', '', $stripped);
                }
                if (is_string($stripped)) {
                    $try = json_decode($stripped, true);
                    if (is_array($try)) {
                        $json = $try;
                    }
                }
            }
            if (!is_array($json) && preg_match('/\{[\s\S]*\}/', (string) $content, $m)) {
                $try2 = json_decode($m[0], true);
                if (is_array($try2)) {
                    $json = $try2;
                }
            }

            if (!is_array($json) || !isset($json['strengths'], $json['weaknesses'], $json['score'])) {
                Log::error('Invalid OpenAI response format (single)', ['candidate_id' => $candidate->id, 'content' => $content]);
                return back()->with('error', 'Invalid AI response format.');
            }

            $strengths = implode("\n", $json['strengths'] ?? []);
            $weaknesses = implode("\n", $json['weaknesses'] ?? []);
            $score = (float) ($json['score'] ?? 0);

            Analysis::updateOrCreate([
                'candidate_id' => $candidate->id,
                'job_description_id' => $jobDescription->id,
            ], [
                'strengths' => $strengths,
                'weaknesses' => $weaknesses,
                'explanations' => ['rationale' => $json['rationale'] ?? ''],
                'score' => $score,
            ]);

            $candidate->update(['fit_score' => $score]);

            return back()->with('success', 'Candidate processed and scored.');
        } catch (\Exception $e) {
            Log::error('Critical error in processCandidate', [
                'candidate_id' => $candidate->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->with('error', 'A critical error occurred: '.$e->getMessage());
        }
    }
}
