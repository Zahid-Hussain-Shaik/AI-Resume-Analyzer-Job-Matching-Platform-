# Resume Analyzer Backend

Node.js/Express API for the AI Resume Analyzer frontend.

## Run locally

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and a long `JWT_SECRET`.
2. Install dependencies: `npm install`
3. Generate Prisma client and apply the schema: `npm run prisma:generate && npm run prisma:migrate`
4. Start development server: `npm run dev`

The API runs at `http://localhost:5000`; Swagger is at `/docs` and health is at `/health`.

Authentication uses `Authorization: Bearer <token>`. Resume uploads use multipart field `file`; only PDF and DOCX files up to the configured size are accepted. Set `OPENAI_API_KEY` to enable AI-generated suggestions; without it, safe deterministic suggestions are returned.

## Endpoints

`POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/resume/upload`, `POST /api/v1/analysis`, `GET /api/v1/analysis/:id`, `GET /api/v1/analysis/history`, `GET /api/v1/analysis/:id/report`, and `DELETE /api/v1/analysis/:id`.
