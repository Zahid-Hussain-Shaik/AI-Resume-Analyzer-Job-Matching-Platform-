# 🚀 AI Resume Analyzer & Job Match Platform — Backend API

Production-ready Node.js, Express, and PostgreSQL backend for an AI-powered Resume Analyzer & Job Match Platform. This backend uses Prisma ORM, JWT authentication, Zod validation, PDF/DOCX file text extraction, and dual AI model support (Google Gemini 2.0 Flash & OpenAI GPT-4o-mini).

---

## ✨ Features

- **🔒 User Authentication**: Secure JWT-based authentication with bcrypt password hashing (12 salt rounds).
- **📄 Resume Upload & Text Extraction**: Accepts PDF and DOCX uploads using Multer, automatically extracting raw text via `pdf-parse` and `mammoth`.
- **🤖 AI Resume & Job Matching**: Evaluates resume text against job descriptions using Google Gemini 2.0 Flash or OpenAI GPT-4o-mini.
- **📊 ATS & Match Scoring**: Computes objective ATS compatibility and job role match scores (0–100%).
- **💡 Actionable Improvement Suggestions**: Returns prioritized recommendations (High/Medium/Low) categorized by Skills, Experience, Formatting, and Education.
- **🔍 Keyword Gap Analysis**: Identifies matched and missing job keywords.
- **📜 Analysis History**: Paginated, filterable history of all candidate resume analyses.
- **📥 Exportable Reports**: Endpoint to fetch full structured JSON analysis reports.
- **📖 Swagger/OpenAPI Specs**: Interactive API documentation at `/api/docs`.
- **🐳 Docker Ready**: Multi-stage `Dockerfile` and `docker-compose.yml` with PostgreSQL configuration.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v20+) & TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **File Processing**: Multer, `pdf-parse`, `mammoth`
- **Validation**: Zod
- **AI Integration**: Google Gemini 2.0 Flash / OpenAI API (`gpt-4o-mini`)
- **Logging & Security**: Winston, Morgan, Helmet, CORS, Express-Rate-Limit
- **Documentation**: Swagger UI & `swagger-jsdoc`

---

## 📁 Directory Structure

```
backend/
├── src/
│   ├── app.ts                  # Main Express application entry point
│   ├── config/                 # Environment, Database, and Swagger configurations
│   ├── controllers/            # Request handlers (Auth, Resume, Analysis)
│   ├── middleware/             # Auth, File Upload, Validation & Error handling
│   ├── models/                 # Model type helpers & DTO placeholders
│   ├── routes/                 # Express routes with Swagger annotations
│   ├── services/               # Core business logic & AI API calls
│   ├── types/                  # Shared TypeScript interfaces
│   ├── utils/                  # Winston Logger, Custom Error & API Response helpers
│   └── validations/            # Zod validation schemas
├── prisma/
│   ├── schema.prisma           # Prisma database schema definition
│   └── seed.ts                 # Database seeder script
├── uploads/                    # Directory for uploaded resume files
├── Dockerfile                  # Production Docker multi-stage build
├── docker-compose.yml          # Services definition (API + PostgreSQL)
├── .env.example                # Template for environment variables
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database (or Docker installed)
- Gemini API Key or OpenAI API Key

### 1. Installation

Clone the project and navigate to the backend folder:

```bash
cd backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `backend` directory based on `.env.example`:

```env
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/resume_analyzer?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# AI Provider Configuration ("gemini" or "openai")
AI_PROVIDER="gemini"
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="your-openai-api-key"

# Upload & Rate Limit Settings
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./uploads"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### 3. Database Migration & Prisma Client

Ensure your PostgreSQL service is running, then run:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

### 4. Running the Application

```bash
# Development mode (with live reload)
npm run dev

# Production build & start
npm run build
npm start
```

---

## 🐳 Running with Docker

You can launch both PostgreSQL and the Backend API simultaneously using Docker Compose:

```bash
# Build and start services
docker-compose up -d

# Stop services
docker-compose down
```

---

## 📚 API Endpoints Summary

### Authentication
- `POST /api/v1/auth/register` — Register a new account
- `POST /api/v1/auth/login` — Login & obtain JWT token
- `GET /api/v1/auth/profile` — Fetch current user profile *(Requires Auth)*

### Resume Management
- `POST /api/v1/resume/upload` — Upload PDF/DOCX resume file *(Requires Auth)*
- `GET /api/v1/resume` — List user's resumes *(Requires Auth)*
- `GET /api/v1/resume/:id` — Get specific resume details *(Requires Auth)*
- `DELETE /api/v1/resume/:id` — Delete a resume *(Requires Auth)*

### AI Resume Analysis
- `POST /api/v1/analysis` — Analyze resume against job description *(Requires Auth)*
- `GET /api/v1/analysis/history` — Get paginated analysis history *(Requires Auth)*
- `GET /api/v1/analysis/:id` — Get analysis result details *(Requires Auth)*
- `DELETE /api/v1/analysis/:id` — Delete analysis record *(Requires Auth)*
- `GET /api/v1/analysis/:id/report` — Export structured JSON report *(Requires Auth)*

### Documentation & Health
- `GET /api/docs` — Interactive Swagger UI Documentation
- `GET /api/health` — Health check endpoint

---

## 🧪 Testing with cURL

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "Password123", "name": "Jane Doe"}'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "Password123"}'
```

### 3. Upload Resume
```bash
curl -X POST http://localhost:5000/api/v1/resume/upload \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -F "file=@/path/to/resume.pdf"
```

### 4. Create Analysis
```bash
curl -X POST http://localhost:5000/api/v1/analysis \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "resumeId": "<RESUME_UUID>",
    "jobTitle": "Full Stack Developer",
    "jobDescription": "We are seeking a Full Stack Developer experienced with Node.js, Express, React, and PostgreSQL..."
  }'
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
