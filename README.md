# AI-Powered Resume-JD Matching Platform

A modern Laravel + Inertia React application that helps recruiters efficiently compare multiple resumes to job descriptions and automatically rank candidates by fit using AI analysis.

## ✨ Features

### Core Functionality
- 📄 **Job Description Management**: Upload and manage PDF job descriptions
- 👥 **Candidate Management**: Add candidates with resume uploads
- 🤖 **AI-Powered Analysis**: Automated resume-to-JD matching using OpenAI GPT-4o-mini
- 📊 **Intelligent Scoring**: Automatic fit scoring (0-100) with detailed rationale
- 📋 **Detailed Reports**: Comprehensive strengths & weaknesses analysis
- 🎯 **Smart Ranking**: Candidates automatically ranked by AI fit score

### User Experience
- 💻 **Modern UI**: Clean, responsive interface built with Radix UI components
- 📱 **Mobile-First**: Fully responsive design for all devices
- ⚡ **Real-time Feedback**: Live status updates and error handling
- 🎨 **Professional Design**: Modern card-based layouts with smooth animations
- 📈 **Dashboard Analytics**: Overview stats and recent activity tracking

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 12.x
- **PHP Version**: 8.2+
- **Database**: SQLite (default), MySQL/PostgreSQL supported
- **PDF Processing**: Smalot PDF Parser
- **AI Integration**: OpenAI GPT-4o-mini API

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: Inertia.js for seamless Laravel-React integration

### Development Tools
- **Package Manager**: Composer (PHP), npm (Node.js)
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

## 🚀 Quick Start Guide

### Prerequisites
- **PHP**: 8.2 or higher
- **Composer**: Latest version
- **Node.js**: 18+ with npm
- **OpenAI API Key**: Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel-jd-resume-mvp-v1
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure OpenAI API**
   Edit `.env` file and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

6. **Database setup**
   ```bash
   # Run migrations to create database tables
   php artisan migrate
   
   # Create symbolic link for file storage
   php artisan storage:link
   ```

7. **Generate frontend routes**
   ```bash
   php artisan wayfinder:generate
   ```

8. **Start development servers**
   ```bash
   # Terminal 1: Start Laravel development server
   php artisan serve
   
   # Terminal 2: Start Vite development server
   npm run dev
   ```

9. **Access the application**
   - Open your browser and visit: http://localhost:8000
   - Register a new account or login
   - Navigate to "Dashboard" or "Jobs" in the sidebar

### First Time Setup Checklist

- [ ] PHP 8.2+ installed
- [ ] Composer installed
- [ ] Node.js 18+ installed
- [ ] OpenAI API key obtained
- [ ] Dependencies installed (`composer install` & `npm install`)
- [ ] Environment file configured (`.env`)
- [ ] Database migrated (`php artisan migrate`)
- [ ] Storage linked (`php artisan storage:link`)
- [ ] Routes generated (`php artisan wayfinder:generate`)
- [ ] Development servers running
- [ ] Application accessible at http://localhost:8000

## 📖 How to Use

### Getting Started
1. **Access the Dashboard**: After login, you'll see the main dashboard with platform statistics
2. **Navigate to Jobs**: Use the sidebar to access the Jobs module
3. **Create Your First Job**: Upload a job description PDF to get started

### Step-by-Step Workflow

#### 1. Create a Job Description
- Navigate to "Jobs" in the sidebar
- Fill in the job title (e.g., "Senior Backend Engineer")
- Upload a PDF job description file
- Click "Create Job Description"
- The job will appear in your jobs list

#### 2. Add Candidates
- Click on a job to open its detail page
- Use the "Add Candidate" form on the left
- Fill in candidate details:
  - Full name (required)
  - Email address (optional)
- Upload the candidate's resume PDF
- Click "Add Candidate"
- Repeat for multiple candidates

#### 3. Run AI Analysis
- Once you have candidates added, click "Process & Score"
- The system will:
  - Parse the job description text
  - Extract text from all candidate resumes
  - Send data to OpenAI for analysis
  - Generate fit scores and detailed reports
- Wait for processing to complete (10-30 seconds per candidate)

#### 4. Review Results
- Candidates are automatically ranked by fit score (highest first)
- View the candidates table with:
  - Candidate names and contact info
  - AI-generated fit scores (0-100)
  - Status indicators
- Click "View Details" on any candidate to see:
  - Detailed strengths analysis
  - Areas for improvement
  - Full resume content
  - AI reasoning for the score

### Dashboard Features
- **Statistics Overview**: Total users, jobs, candidates, and resumes
- **Recent Activity**: Latest jobs and candidates added
- **Quick Actions**: Fast access to common tasks
- **Real-time Updates**: Live data and status information

## 🤖 AI Integration Details

### OpenAI Configuration
The application uses OpenAI's GPT-4o-mini model for intelligent analysis:

- **Model**: `gpt-4o-mini` (cost-effective with high quality)
- **Temperature**: 0.2 (ensures consistent, reliable results)
- **Timeout**: 60 seconds per request
- **Response Format**: Structured JSON with predefined fields
- **Cost**: Approximately $0.01-0.05 per candidate analysis

### AI Analysis Process
The system performs comprehensive analysis by:

1. **Text Extraction**: Parses PDF content from both job descriptions and resumes
2. **Data Preparation**: Structures the information for AI processing
3. **AI Analysis**: Sends data to OpenAI with carefully crafted prompts
4. **Response Processing**: Validates and stores the AI-generated insights

### Scoring Algorithm
The AI evaluates candidates based on:

- **Skills Match**: How well candidate skills align with job requirements
- **Experience Relevance**: Relevance and depth of work experience
- **Education Alignment**: Educational background vs. job requirements
- **Overall Fit**: Comprehensive assessment of candidate suitability

### AI Response Structure
Each analysis returns:

- **Strengths**: 3-6 specific bullet points highlighting candidate advantages
- **Weaknesses**: 3-6 areas where the candidate could improve
- **Score**: Numeric rating from 0-100 representing overall fit
- **Explanations**: Detailed reasoning behind the assessment

## 🛡️ Error Handling & Reliability

### Comprehensive Error Management
The application includes robust error handling for:

- **API Errors**: OpenAI service failures, rate limits, quota exceeded
- **File Processing**: PDF parsing failures, corrupted files, unsupported formats
- **Validation Errors**: Missing required fields, file size limits, invalid data
- **System Errors**: Database connectivity, storage issues, server problems

### User-Friendly Error Messages
- **Clear Communication**: Errors are displayed with actionable guidance
- **Contextual Help**: Specific instructions for resolving common issues
- **Graceful Degradation**: Partial failures don't break the entire process
- **Logging**: All errors are logged for debugging and monitoring

### Common Error Scenarios
- **OpenAI API Issues**: Clear messages about quota, rate limits, or API key problems
- **PDF Processing**: Helpful guidance for file format or quality issues
- **Network Problems**: Timeout handling and retry suggestions
- **Validation Failures**: Field-specific error messages with correction hints

## 📊 Database Schema

### Core Tables
- **users**: User authentication and profile data
- **job_descriptions**: Job posting information and PDF storage
- **candidates**: Candidate personal information and contact details
- **resumes**: Resume PDF storage and extracted text content
- **analyses**: AI-generated analysis results and fit scores

### Relationships
- Job Descriptions → Candidates (One-to-Many)
- Candidates → Resumes (One-to-Many)
- Candidates → Analyses (One-to-One)
- Analyses → Job Descriptions (Many-to-One)

## ⚠️ Current Limitations & Trade-offs

### Technical Limitations
- **PDF Quality Dependency**: Text extraction quality depends on PDF format and structure
- **Processing Time**: 10-30 seconds per candidate analysis (synchronous processing)
- **Language Support**: Optimized for English content analysis
- **File Size Limits**: 10MB maximum per PDF file
- **API Costs**: ~$0.01-0.05 per candidate analysis

### Design Decisions
- **SQLite Default**: Easy local development, easily upgradeable to MySQL/PostgreSQL
- **Synchronous Processing**: Simple implementation, but UI blocks during analysis
- **GPT-4o-mini Model**: Cost-effective choice with good quality results
- **Pure PHP PDF Parser**: No external service dependencies, but limited parsing capabilities
- **Single User Focus**: Current implementation optimized for individual recruiters

## 🚀 Future Enhancement Opportunities

### High Priority Improvements
1. **Queue System**: Background job processing for large candidate batches
2. **Batch Upload**: Multiple resume upload and processing
3. **Export Features**: PDF reports, CSV exports, candidate summaries
4. **Advanced Filtering**: Filter by score ranges, skills, experience levels
5. **User Management**: Multi-user support, team collaboration features

### Medium Priority Features
6. **Analytics Dashboard**: Processing statistics, success rates, usage metrics
7. **Custom AI Prompts**: Configurable analysis prompts for different industries
8. **API Endpoints**: REST API for third-party integrations
9. **Caching Layer**: Redis integration for improved performance
10. **Testing Suite**: Comprehensive unit and integration tests

### Advanced Features
11. **Machine Learning**: Custom scoring models based on historical data
12. **Interview Scheduling**: Integration with calendar systems
13. **Candidate Communication**: Email templates and automated follow-ups
14. **Compliance Features**: GDPR compliance, data retention policies
15. **Mobile App**: Native mobile application for recruiters

## What would you improve if you had more time?

- Subscription plans with usage-based metering:
  - Tiered plans (Starter, Pro, Enterprise) limiting number of candidates/resumes processed per month
  - Hard/soft limits with graceful overage handling and upgrade prompts
  - Stripe Billing integration (customer portal, webhooks for invoice/usage sync)
  - Server-side metering counters (per team/user): candidates created, resumes processed, AI tokens used
  - Feature gating by plan (batch size, export, custom prompts, SSO)
- Team/Org model: multiple seats, roles/permissions (Owner, Recruiter, Viewer)
- Background queues for AI analysis with progress notifications (email/in-app)
- Robust evaluation harness for LLM prompts and scoring consistency
- Prompt tuning and model fallbacks; caching of analysis to reduce costs
- Better PDF handling (OCR via Tesseract/Azure Vision for scanned PDFs)
- Analytics: pipeline funnel, time-to-score, accuracy feedback loop

## 🔧 Troubleshooting

### Common Issues & Solutions

#### Setup Issues
- **Composer/Node errors**: Ensure PHP 8.2+ and Node.js 18+ are installed
- **Database connection**: Check `.env` file database configuration
- **Storage permissions**: Run `php artisan storage:link` and check file permissions

#### Runtime Issues
- **OpenAI API errors**: Verify API key and check quota/billing status
- **PDF parsing failures**: Ensure PDFs are text-based (not scanned images)
- **Route generation errors**: Run `php artisan wayfinder:generate` after adding new routes

#### Performance Issues
- **Slow analysis**: Normal for 10-30 seconds per candidate
- **Memory issues**: Consider increasing PHP memory limit for large PDFs
- **Database performance**: Consider upgrading from SQLite to MySQL/PostgreSQL

### Getting Help
1. **Check Application Logs**: Review `storage/logs/laravel.log` for detailed error information
2. **Verify Configuration**: Ensure all environment variables are properly set
3. **Test API Connectivity**: Verify OpenAI API key and network connectivity
4. **File Validation**: Ensure uploaded PDFs are valid and readable

## 📄 License

MIT License - This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests to improve the application.

---

**Built with ❤️ using Laravel, React, and OpenAI**
