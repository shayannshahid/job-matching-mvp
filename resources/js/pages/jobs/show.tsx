import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { destroy as candidatesDestroy, show as candidatesShow, store as candidatesStore } from '@/routes/candidates';
import { process as jobsProcess } from '@/routes/jobs';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Brain, Calendar, FileText, Mail, Plus, TrendingUp, Users, Trash2, Eye } from 'lucide-react';

export default function JobShow({ job, candidates }: { job: any; candidates: Array<any> }) {
    const { flash, errors } = usePage().props as any;
    const { data, setData, post, processing, reset, clearErrors } = useForm({
        name: '',
        email: '',
        pdf: null as File | null,
    });

    const goBack = () => {
        router.visit('/jobs');
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(candidatesStore(job.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
        });
    };

    const processAll = (e: React.MouseEvent) => {
        e.preventDefault();
        post(jobsProcess(job.id).url);
    };

    return (
        <AppSidebarLayout>
            <div className="flex-1 space-y-6 p-6">
                <Head title={job.title} />

                {/* Header */}
                <Button variant="outline" size="sm" onClick={goBack}>
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
                    </div>
                    <Button onClick={processAll} disabled={processing} className="flex items-center gap-2">
                        {processing ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <Brain className="h-4 w-4" />
                                Process & Score
                            </>
                        )}
                    </Button>
                </div>

                {/* Meta */}
                <div className="mt-0.5 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {candidates.length} candidates
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created {new Date(job.created_at).toLocaleDateString()}
                    </div>
                    <Badge variant={job.status === 'scored' ? 'default' : 'secondary'}>{job.status}</Badge>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {flash?.warning && (
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-yellow-800">{flash.warning}</p>
                                {flash.error_details && flash.error_details.length > 0 && (
                                    <div className="mt-3">
                                        <h4 className="mb-2 text-sm font-medium text-yellow-800">Issues Found:</h4>
                                        <ul className="space-y-1 text-sm text-yellow-700">
                                            {flash.error_details.map((error: string, index: number) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="mr-2 text-yellow-500">•</span>
                                                    <span className="flex-1">{error}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{flash.error}</p>
                                {flash.error_details && flash.error_details.length > 0 && (
                                    <div className="mt-3">
                                        <h4 className="mb-2 text-sm font-medium text-red-800">Error Details:</h4>
                                        <ul className="space-y-1 text-sm text-red-700">
                                            {flash.error_details.map((error: string, index: number) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="mr-2 text-red-500">•</span>
                                                    <span className="flex-1">{error}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Add Candidate Form */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Add Candidate
                            </CardTitle>
                            <CardDescription>Upload a candidate's resume for analysis</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="John Doe"
                                        required
                                    />
                                    {errors?.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="john@example.com"
                                    />
                                    {errors?.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resume">Resume PDF</Label>
                                    <div className="flex w-full items-center justify-center">
                                        <label
                                            htmlFor="resume"
                                            className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                                <FileText className="mb-2 h-6 w-6 text-gray-500" />
                                                <p className="text-xs text-gray-500">
                                                    <span className="font-semibold">Click to upload</span>
                                                </p>
                                                <p className="text-xs text-gray-500">PDF files only</p>
                                            </div>
                                            <input
                                                id="resume"
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) => setData('pdf', e.target.files?.[0] ?? null)}
                                                className="hidden"
                                                required
                                            />
                                        </label>
                                    </div>
                                    {data.pdf && (
                                        <p className="flex items-center gap-1 text-sm text-green-600">
                                            <FileText className="h-4 w-4" />
                                            {data.pdf.name}
                                        </p>
                                    )}
                                    {errors?.pdf && <p className="text-sm text-red-600">{errors.pdf}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Candidate
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Job Description & Candidates */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Job Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Job Description
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="max-h-64 overflow-auto rounded-lg bg-gray-50 p-4 text-sm whitespace-pre-wrap text-muted-foreground">
                                    {job.jd_text?.slice(0, 4000) ?? 'Not parsed yet. Click Process & Score to parse and analyze.'}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Candidates Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Candidates ({candidates.length})
                                </CardTitle>
                                <CardDescription>Candidates ranked by AI fit score</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {candidates.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                                        <h3 className="mb-2 text-lg font-medium">No candidates yet</h3>
                                        <p className="text-center text-muted-foreground">Add candidates using the form to start analyzing resumes</p>
                                    </div>
                                ) : (
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Candidate</TableHead>
                                                    <TableHead>Contact</TableHead>
                                                    <TableHead className="text-center">Fit Score</TableHead>
                                                    <TableHead className="text-center">Created At</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {candidates.map((candidate) => (
                                                    <TableRow key={candidate.id}>
                                                        <TableCell>
                                                            <div>
                                                                <div className="font-medium">{candidate.name}</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="space-y-1">
                                                                {candidate.email && (
                                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                        <Mail className="h-3 w-3" />
                                                                        {candidate.email}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <div className="flex items-center justify-center">
                                                                {candidate.analysis == null || candidate.fit_score === null || candidate.fit_score === undefined ? (
                                                                    <Badge variant="outline" className="text-xs text-muted-foreground">Not processed</Badge>
                                                                ) : (
                                                                    <Badge
                                                                        variant={candidate.fit_score >= 70 ? 'default' : candidate.fit_score >= 50 ? 'secondary' : 'outline'}
                                                                        className="flex items-center gap-1"
                                                                    >
                                                                        <TrendingUp className="h-3 w-3" />
                                                                        {Math.round(candidate.fit_score)}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center text-sm text-muted-foreground">
                                                            {new Date(candidate.created_at).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button asChild variant="ghost" size="icon" aria-label="View details">
                                                                    <Link href={candidatesShow(candidate.id).url}>
                                                                        <Eye className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    aria-label="Delete candidate"
                                                                    onClick={() => {
                                                                        if (!confirm('Delete this candidate, their analyses and resumes?')) return;
                                                                        router.delete(candidatesDestroy(candidate.id).url);
                                                                    }}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
