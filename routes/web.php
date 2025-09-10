<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\JobDescriptionController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\AnalysisController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $stats = [
            'users' => \App\Models\User::count(),
            'jobs' => \App\Models\JobDescription::count(),
            'candidates' => \App\Models\Candidate::count(),
            'resumes' => \App\Models\Resume::count(),
        ];

        $recentJobs = \App\Models\JobDescription::withCount('candidates')
            ->latest()
            ->limit(5)
            ->get();

        $recentCandidates = \App\Models\Candidate::with('analysis')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentJobs' => $recentJobs,
            'recentCandidates' => $recentCandidates,
        ]);
    })->name('dashboard');

    // Job Descriptions
    Route::get('/jobs', [JobDescriptionController::class, 'index'])->name('jobs.index');
    Route::post('/jobs', [JobDescriptionController::class, 'store'])->name('jobs.store');
    Route::get('/jobs/{jobDescription}', [JobDescriptionController::class, 'show'])->name('jobs.show');
    Route::delete('/jobs/{jobDescription}', [JobDescriptionController::class, 'destroy'])->name('jobs.destroy');

    // Candidates + resumes
    Route::post('/jobs/{jobDescription}/candidates', [CandidateController::class, 'store'])->name('candidates.store');
    Route::get('/candidates/{candidate}', [CandidateController::class, 'show'])->name('candidates.show');
    Route::post('/candidates/{candidate}/process', [AnalysisController::class, 'processCandidate'])->name('candidates.process');
    Route::delete('/candidates/{candidate}', [CandidateController::class, 'destroy'])->name('candidates.destroy');

    // Analysis processing
    Route::post('/jobs/{jobDescription}/process', [AnalysisController::class, 'processJob'])->name('jobs.process');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
