import { Head, Link, router } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, FileText, Brain } from 'lucide-react';
import { process as candidateProcess } from '@/routes/candidates';

export default function CandidateShow({ candidate }: { candidate: any }) {
    const resume = candidate.resumes?.[0];
    const analysis = candidate.analysis || null;

    const processOne = () => {
        router.post(candidateProcess(candidate.id).url);
    };

    return (
        <AppSidebarLayout>
            <div className="flex-1 space-y-6 p-6">
                <Head title={candidate.name} />

                {/* Header */}
                <Button asChild variant="outline" size="sm">
                    <Link href={candidate.job_description_id ? `/jobs/${candidate.job_description_id}` : '/jobs'}>
                        <ArrowLeft className="mr-1 h-4 w-4" /> Back
                    </Link>
                </Button>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{candidate.name}</h1>
                            <p className="text-muted-foreground">Candidate Analysis Report</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant={candidate.fit_score >= 70 ? 'default' : candidate.fit_score >= 50 ? 'secondary' : 'outline'}
                            className="flex items-center gap-1 px-4 py-2 text-lg"
                        >
                            <Brain className="h-4 w-4" />
                            {analysis ? `Fit Score: ${Math.round(candidate.fit_score)}` : 'Not processed'}
                        </Badge>
                    </div>
                </div>

                {analysis ? (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Strengths */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-700">
                                    <TrendingUp className="h-5 w-5" />
                                    Strengths
                                </CardTitle>
                                <CardDescription>
                                    Key strengths identified by AI analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none">
                                    <pre className="whitespace-pre-wrap text-sm text-green-700 bg-green-50 p-4 rounded-lg">
                                        {analysis.strengths}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Weaknesses */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-700">
                                    <TrendingDown className="h-5 w-5" />
                                    Areas for Improvement
                                </CardTitle>
                                <CardDescription>
                                    Areas where the candidate could improve
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none">
                                    <pre className="whitespace-pre-wrap text-sm text-red-700 bg-red-50 p-4 rounded-lg">
                                        {analysis.weaknesses}
                                    </pre>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No analysis available</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Click "Process & Score" to run AI analysis for this candidate.
                            </p>
                            <Button onClick={processOne}>
                                <Brain className="h-4 w-4 mr-2" /> Process & Score
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Resume Content */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Resume Content
                        </CardTitle>
                        <CardDescription>
                            Extracted text from the candidate's resume
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-auto">
                            <pre className="whitespace-pre-wrap text-sm text-gray-700">
                                {resume?.resume_text?.slice(0, 8000) ?? 'Resume not parsed yet. Please process the job to extract resume content.'}
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
