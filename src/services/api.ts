// Prepared for future REST API integration. All methods return mock data today.
import type { AnalysisResult, UserProfile } from "@/types/analysis";
import { mockAnalysis, mockReports, mockProfile } from "@/constants/mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const analysisApi = {
  async list(): Promise<AnalysisResult[]> {
    await delay(300);
    return mockReports;
  },
  async get(id: string): Promise<AnalysisResult> {
    await delay(200);
    return mockReports.find((r) => r.id === id) ?? mockAnalysis;
  },
  async analyze(_payload: { resume: File | null; jobDescription: string }): Promise<AnalysisResult> {
    await delay(1500);
    return mockAnalysis;
  },
};

export const profileApi = {
  async get(): Promise<UserProfile> {
    await delay(150);
    return mockProfile;
  },
  async update(patch: Partial<UserProfile>): Promise<UserProfile> {
    await delay(300);
    return { ...mockProfile, ...patch };
  },
};
