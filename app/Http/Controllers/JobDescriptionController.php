<?php

namespace App\Http\Controllers;

use App\Models\JobDescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobDescriptionController extends Controller
{
    public function index()
    {
        $jobs = JobDescription::withCount('candidates')
            ->latest()
            ->get(['id', 'title', 'status', 'processed_at', 'created_at']);

        return Inertia::render('jobs/index', [
            'jobs' => $jobs,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => ['required', 'string', 'max:255'],
                'pdf' => ['required', 'file', 'mimes:pdf', 'max:10240'],
            ]);

            $path = $request->file('pdf')->store('jds', 'public');

            $job = JobDescription::create([
                'title' => $validated['title'],
                'pdf_path' => $path,
                'status' => 'uploaded',
            ]);

            return redirect()->route('jobs.show', $job)->with('success', 'Job description created successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create job description: ' . $e->getMessage())->withInput();
        }
    }

    public function show(JobDescription $jobDescription)
    {
        $jobDescription->load(['candidates' => function ($q) {
            $q->with(['resumes', 'analysis'])->orderByDesc('fit_score');
        }]);

        return Inertia::render('jobs/show', [
            'job' => $jobDescription,
            'candidates' => $jobDescription->candidates,
        ]);
    }

    public function destroy(JobDescription $jobDescription)
    {
        try {
            // Delete candidate resumes files and analyses, then candidates
            foreach ($jobDescription->candidates as $candidate) {
                foreach ($candidate->resumes as $resume) {
                    if ($resume->pdf_path && Storage::disk('public')->exists($resume->pdf_path)) {
                        Storage::disk('public')->delete($resume->pdf_path);
                    }
                    $resume->delete();
                }
                // Delete analysis if exists
                if ($candidate->relationLoaded('analysis') ? $candidate->analysis : $candidate->analysis()->exists()) {
                    $candidate->analysis()->delete();
                }
                $candidate->delete();
            }

            // Delete JD PDF
            if ($jobDescription->pdf_path && Storage::disk('public')->exists($jobDescription->pdf_path)) {
                Storage::disk('public')->delete($jobDescription->pdf_path);
            }

            $jobDescription->delete();

            return redirect()->route('jobs.index')->with('success', 'Job deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete job: ' . $e->getMessage());
        }
    }
}
