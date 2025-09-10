<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\JobDescription;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function store(JobDescription $jobDescription, Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['nullable', 'email'],
                'pdf' => ['required', 'file', 'mimes:pdf', 'max:10240'],
            ]);

            $candidate = Candidate::create([
                'job_description_id' => $jobDescription->id,
                'name' => $validated['name'],
                'email' => $validated['email'] ?? null,
            ]);

            $path = $request->file('pdf')->store('resumes', 'public');
            Resume::create([
                'candidate_id' => $candidate->id,
                'pdf_path' => $path,
            ]);

            return redirect()->route('jobs.show', $jobDescription)->with('success', 'Candidate added successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to add candidate: ' . $e->getMessage())->withInput();
        }
    }

    public function show(Candidate $candidate)
    {
        $candidate->load(['resumes', 'jobDescription']);
        $analysis = $candidate->analysis()->latest()->first();

        return Inertia::render('candidates/show', [
            'candidate' => array_merge($candidate->toArray(), [
                'analysis' => $analysis,
            ]),
        ]);
    }

    public function destroy(Candidate $candidate)
    {
        try {
            // Delete resume files
            foreach ($candidate->resumes as $resume) {
                if ($resume->pdf_path && Storage::disk('public')->exists($resume->pdf_path)) {
                    Storage::disk('public')->delete($resume->pdf_path);
                }
                $resume->delete();
            }

            // Delete analysis
            if ($candidate->relationLoaded('analysis') ? $candidate->analysis : $candidate->analysis()->exists()) {
                $candidate->analysis()->delete();
            }

            $jobId = $candidate->job_description_id;
            $candidate->delete();

            return redirect()->route('jobs.show', $jobId)->with('success', 'Candidate deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete candidate: ' . $e->getMessage());
        }
    }
}
