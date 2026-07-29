# AI Resume Analyzer & Job Matcher

Full-stack monorepo for resume analysis and job matching.

## Live demo

[Open the live application](https://resume-analyzer-frontend-j3fk.onrender.com/)

## Project structure

```text
.
├── frontend/          # React + TanStack Start + Vite application
├── backend/           # Express + Prisma REST API
├── README.md
└── .gitignore
```

## Run the applications

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Backend:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

The frontend uses `http://localhost:5000/api/v1` for backend requests. The backend Swagger documentation is available at `http://localhost:5000/docs`.
