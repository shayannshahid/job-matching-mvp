import { Head, Link } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Users,
    Briefcase,
    UserCheck,
    FileText,
    TrendingUp,
    Calendar,
    Plus,
    ArrowRight,
    Brain,
    Target
} from 'lucide-react';

interface DashboardProps {
    stats: {
        users: number;
        jobs: number;
        candidates: number;
        resumes: number;
    };
    recentJobs: Array<{
        id: number;
        title: string;
        status: string;
        created_at: string;
        candidates_count: number;
    }>;
    recentCandidates: Array<{
        id: number;
        name: string;
        email: string;
        fit_score: number;
        created_at: string;
        analysis: any;
    }>;
}

export default function Dashboard({ stats, recentJobs, recentCandidates }: DashboardProps) {
    return (
        <AppSidebarLayout>
            <div className="flex-1 space-y-6 p-6">
                <Head title="Dashboard" />

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Welcome to your AI-powered recruitment platform</p>
                    </div>
                    <Button asChild>
                        <Link href="/jobs">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Job
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.users}</div>
                            <p className="text-xs text-muted-foreground">
                                Active platform users
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Job Descriptions</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.jobs}</div>
                            <p className="text-xs text-muted-foreground">
                                Active job postings
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Candidates</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.candidates}</div>
                            <p className="text-xs text-muted-foreground">
                                Total candidates
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resumes</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.resumes}</div>
                            <p className="text-xs text-muted-foreground">
                                Processed resumes
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Jobs */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Recent Job Descriptions
                            </CardTitle>
                            <CardDescription>
                                Latest job postings created
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentJobs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No jobs yet</h3>
                                    <p className="text-muted-foreground text-center mb-4">
                                        Create your first job description to get started
                                    </p>
                                    <Button asChild size="sm">
                                        <Link href="/jobs">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Job
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentJobs.map((job) => (
                                        <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium truncate">{job.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant={job.status === 'scored' ? 'default' : 'secondary'} className="text-xs">
                                                        {job.status}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {job.candidates_count || 0} candidates
                                                    </span>
                                                </div>
                                            </div>
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={`/jobs/${job.id}`}>
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                    <div className="pt-2">
                                        <Button asChild variant="outline" className="w-full">
                                            <Link href="/jobs">
                                                View All Jobs
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Candidates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCheck className="h-5 w-5" />
                                Recent Candidates
                            </CardTitle>
                            <CardDescription>
                                Latest candidates added
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentCandidates.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <UserCheck className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No candidates yet</h3>
                                    <p className="text-muted-foreground text-center">
                                        Add candidates to job descriptions to see them here
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentCandidates.map((candidate) => (
                                        <div key={candidate.id} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium truncate">{candidate.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {candidate.analysis ? (
                                                        <Badge
                                                            variant={candidate.fit_score >= 70 ? 'default' : candidate.fit_score >= 50 ? 'secondary' : 'outline'}
                                                            className="text-xs flex items-center gap-1"
                                                        >
                                                            <Target className="h-3 w-3" />
                                                            {Math.round(candidate.fit_score)}% fit
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-xs">
                                                            Not analyzed
                                                        </Badge>
                                                    )}
                                                    <span className="text-xs text-muted-foreground">
                                                        {candidate.email}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href={`/candidates/${candidate.id}`}>
                                                    <ArrowRight className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brain className="h-5 w-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>
                            Get started with common tasks
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Button asChild variant="outline" className="h-20 flex-col gap-2">
                                <Link href="/jobs">
                                    <Briefcase className="h-6 w-6" />
                                    <span>Create Job</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-20 flex-col gap-2">
                                <Link href="/jobs">
                                    <UserCheck className="h-6 w-6" />
                                    <span>Add Candidates</span>
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="h-20 flex-col gap-2">
                                <Link href="/jobs">
                                    <Brain className="h-6 w-6" />
                                    <span>Run Analysis</span>
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}
