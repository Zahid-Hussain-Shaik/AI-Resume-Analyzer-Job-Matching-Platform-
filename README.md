# AI Resume Analyzer & Job Match Platform

AI Resume Analyzer & Job Match Platform helps candidates evaluate resumes against job descriptions, understand ATS readiness, and get practical improvement suggestions. The platform includes a React frontend experience and a Node.js backend API for authentication, resume parsing, analysis history, and AI-powered recommendations.

## Features

- Resume upload workflow for PDF and DOCX files
- Job description matching and keyword gap analysis
- ATS score and job match score reporting
- AI-generated improvement recommendations
- Analysis dashboard and report history
- User authentication and profile-aware UI
- Responsive frontend with dark mode support
- Backend API with Swagger documentation
- Docker-ready backend setup

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- Radix UI
- React Three Fiber and Drei
- Lucide React

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL or SQLite, depending on environment configuration
- JWT authentication
- Zod validation
- Multer file uploads
- pdf-parse and mammoth document parsing
- Gemini or OpenAI integration
- Swagger UI

## Frontend Setup

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The local frontend URL is shown by Vite in the terminal. In this workspace, it has run at:

```text
http://127.0.0.1:8080/
```

## Frontend Scripts

```bash
npm run dev
```

Start the local development server.

```bash
npm run build
```

Create a production build.

```bash
npm run build:dev
```

Create a development-mode build.

```bash
npm run preview
```

Preview the production build locally.

```bash
npm run lint
```

Run ESLint checks.

```bash
npm run format
```

Format the project with Prettier.

## Backend Setup

If the backend folder is available in your workspace, install and run it separately:

```bash
cd backend
npm install
```

Create a `.env` file from `.env.example` and configure the required values:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/resume_analyzer?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
AI_PROVIDER="gemini"
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="your-openai-api-key"
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./uploads"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

Start the backend server:

```bash
npm run dev
```

Backend API docs:

```text
http://localhost:5000/api/docs
```

Health check:

```text
http://localhost:5000/api/health
```

## Backend API Summary

### Authentication

- `POST /api/v1/auth/register` - Register a new account
- `POST /api/v1/auth/login` - Login and receive a JWT
- `GET /api/v1/auth/profile` - Fetch the current user profile

### Resume Management

- `POST /api/v1/resume/upload` - Upload a PDF or DOCX resume
- `GET /api/v1/resume` - List uploaded resumes
- `GET /api/v1/resume/:id` - Get resume details
- `DELETE /api/v1/resume/:id` - Delete a resume

### Resume Analysis

- `POST /api/v1/analysis` - Analyze a resume against a job description
- `GET /api/v1/analysis/history` - Get analysis history
- `GET /api/v1/analysis/:id` - Get analysis details
- `DELETE /api/v1/analysis/:id` - Delete an analysis
- `GET /api/v1/analysis/:id/report` - Export a structured report

## Frontend Project Structure

```text
src/
  components/      Reusable app and UI components
  constants/       Mock data and app constants
  hooks/           Shared React hooks
  lib/             Utility and error-handling helpers
  routes/          TanStack Router route files
  services/        API client logic
  types/           Shared TypeScript types
  utils/           Formatting helpers
```

## Backend Connection

The frontend API client points to:

```text
http://localhost:5000/api/v1
```

When the backend is unavailable, selected UI flows use demo data so the app can still be explored.

## Deployment

Build the frontend before deployment:

```bash
npm run build
```

Deploy the generated production output to your hosting provider of choice.

For backend deployment, configure environment variables, provision the database, run Prisma migrations, and start the compiled Node application.

## License

MIT
