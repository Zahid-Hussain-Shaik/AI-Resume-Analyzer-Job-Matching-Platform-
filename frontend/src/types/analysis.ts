export type MatchLevel = "excellent" | "good" | "fair" | "poor";

export interface Skill {
  name: string;
  category?: string;
  level?: "beginner" | "intermediate" | "expert";
}

export interface KeywordMatch {
  keyword: string;
  inResume: boolean;
  inJob: boolean;
  frequency: number;
}

export interface AnalysisResult {
  id: string;
  resumeName: string;
  jobTitle: string;
  company?: string;
  createdAt: string;
  matchScore: number;
  atsScore: number;
  matchingSkills: Skill[];
  missingSkills: Skill[];
  keywords: KeywordMatch[];
  summary: string;
  suggestions: string[];
  improvementTips: string[];
  skillDistribution: { category: string; value: number }[];
  strengthBreakdown: { area: string; score: number }[];
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  location: string;
  bio: string;
  avatarUrl?: string;
}
