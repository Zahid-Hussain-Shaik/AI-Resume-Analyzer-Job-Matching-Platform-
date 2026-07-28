import type { AnalysisResult, UserProfile } from "@/types/analysis";

export const mockAnalysis: AnalysisResult = {
  id: "an_001",
  resumeName: "Alex_Morgan_Resume.pdf",
  jobTitle: "Senior Frontend Engineer",
  company: "Acme Corp",
  createdAt: new Date().toISOString(),
  matchScore: 82,
  atsScore: 76,
  matchingSkills: [
    { name: "React", category: "Frontend", level: "expert" },
    { name: "TypeScript", category: "Language", level: "expert" },
    { name: "Tailwind CSS", category: "Styling", level: "expert" },
    { name: "Node.js", category: "Backend", level: "intermediate" },
    { name: "REST APIs", category: "Backend", level: "expert" },
    { name: "Git", category: "Tools", level: "expert" },
    { name: "Jest", category: "Testing", level: "intermediate" },
    { name: "Figma", category: "Design", level: "intermediate" },
  ],
  missingSkills: [
    { name: "GraphQL", category: "Backend" },
    { name: "Kubernetes", category: "DevOps" },
    { name: "AWS", category: "Cloud" },
    { name: "Playwright", category: "Testing" },
    { name: "Redis", category: "Backend" },
  ],
  keywords: [
    { keyword: "React", inResume: true, inJob: true, frequency: 12 },
    { keyword: "TypeScript", inResume: true, inJob: true, frequency: 9 },
    { keyword: "GraphQL", inResume: false, inJob: true, frequency: 6 },
    { keyword: "Testing", inResume: true, inJob: true, frequency: 5 },
    { keyword: "CI/CD", inResume: false, inJob: true, frequency: 4 },
    { keyword: "Accessibility", inResume: true, inJob: true, frequency: 3 },
    { keyword: "Kubernetes", inResume: false, inJob: true, frequency: 3 },
    { keyword: "Design Systems", inResume: true, inJob: true, frequency: 4 },
  ],
  summary:
    "Experienced frontend engineer with 6+ years building production React applications. Strong in TypeScript, component architecture, and design systems. Solid backend collaboration experience via REST APIs and Node.js services.",
  suggestions: [
    "Add specific examples of GraphQL implementations, even from side projects.",
    "Highlight measurable outcomes (e.g. 'reduced bundle size by 32%').",
    "Include cloud-provider experience such as AWS Lambda or S3.",
    "Mention testing frameworks like Playwright for end-to-end coverage.",
  ],
  improvementTips: [
    "Quantify achievements with metrics whenever possible.",
    "Use action verbs at the start of every bullet: shipped, led, migrated.",
    "Tailor your headline to match the target role verbatim.",
    "Remove outdated technologies (>7 years) unless directly relevant.",
    "Keep the resume to one page unless you have 10+ years of experience.",
  ],
  skillDistribution: [
    { category: "Frontend", value: 42 },
    { category: "Backend", value: 22 },
    { category: "DevOps", value: 8 },
    { category: "Testing", value: 14 },
    { category: "Design", value: 14 },
  ],
  strengthBreakdown: [
    { area: "Technical", score: 88 },
    { area: "Experience", score: 82 },
    { area: "Keywords", score: 74 },
    { area: "Formatting", score: 91 },
    { area: "Impact", score: 68 },
  ],
};

export const mockReports: AnalysisResult[] = [
  mockAnalysis,
  {
    ...mockAnalysis,
    id: "an_002",
    resumeName: "Alex_Morgan_Resume_v2.pdf",
    jobTitle: "Full Stack Engineer",
    company: "Northwind Labs",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    matchScore: 74,
    atsScore: 81,
  },
  {
    ...mockAnalysis,
    id: "an_003",
    resumeName: "Alex_Morgan_Resume.pdf",
    jobTitle: "Product Engineer",
    company: "Linear",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    matchScore: 91,
    atsScore: 88,
  },
  {
    ...mockAnalysis,
    id: "an_004",
    resumeName: "Alex_Morgan_Resume.pdf",
    jobTitle: "React Developer",
    company: "Vercel",
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    matchScore: 67,
    atsScore: 72,
  },
  {
    ...mockAnalysis,
    id: "an_005",
    resumeName: "Alex_Morgan_Resume_v3.pdf",
    jobTitle: "UI Engineer",
    company: "Stripe",
    createdAt: new Date(Date.now() - 86400000 * 21).toISOString(),
    matchScore: 85,
    atsScore: 79,
  },
];

export const mockProfile: UserProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  title: "Senior Frontend Engineer",
  location: "San Francisco, CA",
  bio: "Frontend engineer focused on design systems, performance, and delightful UI.",
};

export const sampleJobDescription = `We are looking for a Senior Frontend Engineer to join our product team.

Responsibilities:
- Build and maintain complex React + TypeScript applications
- Collaborate with designers on our design system
- Write unit and end-to-end tests (Jest, Playwright)
- Optimize performance and accessibility
- Work with backend engineers on GraphQL and REST APIs

Requirements:
- 5+ years frontend experience
- Expert in React, TypeScript, and modern CSS
- Experience with GraphQL, CI/CD, and cloud (AWS)
- Strong sense of product and UX
- Comfortable with Kubernetes basics is a plus`;
