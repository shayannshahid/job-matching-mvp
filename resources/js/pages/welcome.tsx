import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Brain,
    FileText,
    Users,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Target,
    Zap,
    Shield
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="AI-Powered Resume Matching Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {/* Navigation */}
                <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600">
                            <Brain className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">ResumeMatch AI</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                            >
                                <TrendingUp className="h-4 w-4" />
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                >
                                    Get Started
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
                            <div className="mt-24 sm:mt-32 lg:mt-16">
                                <a href="#" className="inline-flex space-x-6">
                                    <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                                        AI-Powered
                                    </span>
                                    <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">
                                        <span>New platform</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                </a>
                            </div>
                            <h1 className="mt-10 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
                                Match the perfect candidate with AI precision
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Transform your recruitment process with our AI-powered platform that automatically analyzes resumes against job descriptions, providing intelligent scoring and detailed insights to help you find the best candidates faster.
                            </p>
                            <div className="mt-10 flex items-center gap-x-6">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                >
                                    {auth.user ? 'Go to Dashboard' : 'Start Free Trial'}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <a href="#features" className="text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                                <div className="relative rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 lg:rounded-2xl lg:p-4">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-2xl"></div>
                                    <div className="relative rounded-xl bg-white p-8 shadow-2xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-900 dark:text-white">Senior Backend Engineer</h3>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">Job Description Uploaded</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                                                            <span className="text-sm font-medium text-green-600 dark:text-green-400">JS</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white">John Smith</p>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400">5 years experience</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 dark:bg-green-900">
                                                            <Target className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                            <span className="text-sm font-medium text-green-600 dark:text-green-400">92%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">MJ</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white">Maria Johnson</p>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400">3 years experience</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900">
                                                            <Target className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">87%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-700">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center dark:bg-orange-900">
                                                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">DW</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-900 dark:text-white">David Wilson</p>
                                                            <p className="text-sm text-slate-600 dark:text-slate-400">7 years experience</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 dark:bg-orange-900">
                                                            <Target className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">78%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <Brain className="h-4 w-4" />
                                                <span>AI Analysis Complete</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                Powerful features for modern recruitment
                            </p>
                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                                Our AI-powered platform streamlines your entire recruitment process, from job posting to candidate selection.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <Brain className="h-6 w-6 text-white" />
                                        </div>
                                        AI-Powered Analysis
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                                        <p className="flex-auto">
                                            Advanced AI algorithms analyze resumes against job descriptions, providing intelligent scoring and detailed insights.
                                        </p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <Zap className="h-6 w-6 text-white" />
                                        </div>
                                        Lightning Fast Processing
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                                        <p className="flex-auto">
                                            Process multiple candidates in seconds with our optimized AI pipeline and real-time analysis.
                                        </p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <Target className="h-6 w-6 text-white" />
                                        </div>
                                        Precise Matching
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                                        <p className="flex-auto">
                                            Get accurate fit scores and detailed strengths/weaknesses analysis for every candidate.
                                        </p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <FileText className="h-6 w-6 text-white" />
                                        </div>
                                        PDF Processing
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                                        <p className="flex-auto">
                                            Seamlessly upload and process PDF job descriptions and resumes with advanced text extraction.
                                        </p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <TrendingUp className="h-6 w-6 text-white" />
                                        </div>
                                        Smart Ranking
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                                        <p className="flex-auto">
                                            Automatically rank candidates by fit score and prioritize the best matches for your positions.
                                        </p>
                                    </dd>
                                </div>
                                <div className="flex flex-col">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <Shield className="h-6 w-6 text-white" />
                                        </div>
                                        Secure & Reliable
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                                        <p className="flex-auto">
                                            Enterprise-grade security with comprehensive error handling and data protection.
                                        </p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-slate-900 dark:bg-slate-800">
                    <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to transform your recruitment process?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
                                Join thousands of recruiters who are already using AI to find the perfect candidates faster and more accurately.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100"
                                >
                                    {auth.user ? 'Go to Dashboard' : 'Start Free Trial'}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <a href="#features" className="text-sm font-semibold leading-6 text-white">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white dark:bg-slate-900">
                    <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                        <div className="flex justify-center space-x-6 md:order-2">
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-r from-blue-600 to-indigo-600">
                                    <Brain className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">ResumeMatch AI</span>
                            </div>
                        </div>
                        <div className="mt-8 md:order-1 md:mt-0">
                            <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                                &copy; 2025 ResumeMatch AI. Built with Laravel, React, and OpenAI.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
