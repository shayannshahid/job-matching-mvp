import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { store as jobsStore, show as jobsShow, destroy as jobsDestroy } from '@/routes/jobs';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, FileText, Calendar, Users, Trash2 } from 'lucide-react';

export default function JobsIndex({ jobs }: { jobs: Array<any> }) {
    const { flash } = usePage().props as any;
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        pdf: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(jobsStore().url);
    };

    const handleDelete = (jobId: number) => {
        if (!confirm('Delete this job and all related candidates and files?')) return;
        router.delete(jobsDestroy(jobId).url);
    };

    return (
        <AppSidebarLayout>
            <div className="flex-1 space-y-6 p-6">
                <Head title="Jobs" />
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Job Descriptions</h1>
                        <p className="text-muted-foreground mt-2">Manage and analyze job postings with AI-powered candidate matching</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{jobs.length} jobs</span>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{flash.error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Create Job Form - Compact Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Plus className="h-5 w-5" />
                                    Create Job
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Upload a job description PDF
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-sm">Job Title</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g. Senior Backend Engineer"
                                            required
                                            className="h-9"
                                        />
                                        {errors?.title && <p className="text-xs text-red-600">{errors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="pdf" className="text-sm">PDF Upload</Label>
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="pdf" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-3 pb-3">
                                                    <FileText className="w-6 h-6 mb-2 text-gray-500" />
                                                    <p className="text-xs text-gray-500">
                                                        <span className="font-semibold">Click to upload</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF only</p>
                                                </div>
                                                <input
                                                    id="pdf"
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={(e) => setData('pdf', e.target.files?.[0] ?? null)}
                                                    className="hidden"
                                                    required
                                                />
                                            </label>
                                        </div>
                                        {data.pdf && (
                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                <FileText className="h-3 w-3" />
                                                {data.pdf.name}
                                            </p>
                                        )}
                                        {errors?.pdf && <p className="text-xs text-red-600">{errors.pdf}</p>}
                                    </div>

                                    <Button type="submit" disabled={processing} className="w-full h-9">
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Job
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Jobs List - Main Content */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Your Job Descriptions</h2>
                        </div>

                        {jobs.length === 0 ? (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-16">
                                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                                    <h3 className="text-xl font-medium mb-2">No job descriptions yet</h3>
                                    <p className="text-muted-foreground text-center max-w-md">
                                        Create your first job description to start analyzing candidates with AI-powered matching
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-3">
                                {jobs.map((job) => (
                                    <Card key={job.id} className="group hover:shadow-md transition-all duration-200 hover:border-gray-300">
                                        <CardContent className="relative p-4">
                                            {/* Delete icon in corner */}
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            aria-label="Delete job"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-2 top-2 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                                                            onClick={() => handleDelete(job.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>Delete job</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <Link href={jobsShow(job.id).url} className="block">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold mb-1 truncate">{job.title}</h3>
                                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {new Date(job.created_at).toLocaleDateString()}
                                                            </div>
                                                            <Badge variant={job.status === 'scored' ? 'default' : 'secondary'} className="text-xs">
                                                                {job.status}
                                                            </Badge>
                                                            <Badge variant="outline" className="text-xs">
                                                                {(job.candidates_count || 0)} {job.candidates_count === 1 ? 'candidate' : 'candidates'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
