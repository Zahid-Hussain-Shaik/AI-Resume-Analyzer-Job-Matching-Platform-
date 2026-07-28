import type { AnalysisResult, UserProfile } from "@/types/analysis";
import { mockAnalysis, mockReports, mockProfile } from "@/constants/mock-data";

const API_BASE = "http://localhost:5000/api/v1";

export const analysisApi = {
  async list(): Promise<AnalysisResult[]> {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (token) {
      try {
        const res = await fetch(`${API_BASE}/analysis/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data.analyses)) {
          // If the user has analyses in the backend, format and return them
          if (data.data.analyses.length > 0) {
            return data.data.analyses.map((a: any) => ({
              id: a.id,
              resumeName: a.resume?.originalName || "Uploaded_Resume.pdf",
              jobTitle: a.jobTitle || "Job Match Analysis",
              company: "Target Employer",
              createdAt: a.createdAt,
              matchScore: Math.round(a.matchScore || 0),
              atsScore: Math.round(a.atsScore || 0),
              matchingSkills: (a.matchedKeywords || []).map((k: string) => ({ name: k, category: "Skills" })),
              missingSkills: (a.missingKeywords || []).map((k: string) => ({ name: k, category: "Skills" })),
              keywords: [],
              summary: a.detailedReport?.overallAssessment || "Analysis complete.",
              suggestions: (a.suggestions?.items || []).map((i: any) => i.suggestion || i),
              improvementTips: a.detailedReport?.actionPlan || [],
              skillDistribution: [],
              strengthBreakdown: [],
            }));
          } else if (user?.email !== "demo@example.com") {
            // New user with 0 analyses in database
            return [];
          }
        }
      } catch (e) {
        console.warn("Backend API unavailable for history:", e);
      }
    }

    // Demo user preview
    if (user?.email === "demo@example.com") {
      return mockReports;
    }

    // New users default to empty array
    return [];
  },

  async get(id: string): Promise<AnalysisResult> {
    const token = localStorage.getItem("token");
    if (token && !id.startsWith("an_")) {
      try {
        const res = await fetch(`${API_BASE}/analysis/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.data) {
          const a = data.data;
          return {
            id: a.id,
            resumeName: a.resume?.originalName || "Uploaded_Resume.pdf",
            jobTitle: a.jobTitle || "Job Match Analysis",
            company: "Target Employer",
            createdAt: a.createdAt,
            matchScore: Math.round(a.matchScore || 0),
            atsScore: Math.round(a.atsScore || 0),
            matchingSkills: (a.matchedKeywords || []).map((k: string) => ({ name: k, category: "Skills" })),
            missingSkills: (a.missingKeywords || []).map((k: string) => ({ name: k, category: "Skills" })),
            keywords: [],
            summary: a.detailedReport?.overallAssessment || "Analysis complete.",
            suggestions: (a.suggestions?.items || []).map((i: any) => i.suggestion || i),
            improvementTips: a.detailedReport?.actionPlan || [],
            skillDistribution: [],
            strengthBreakdown: [],
          };
        }
      } catch (e) {
        console.warn("Error fetching single analysis:", e);
      }
    }
    return mockReports.find((r) => r.id === id) ?? mockAnalysis;
  },

  async analyze(payload: { resume: File | null; jobDescription: string; jobTitle?: string }): Promise<AnalysisResult> {
    const token = localStorage.getItem("token");

    if (token && payload.resume) {
      try {
        // 1. Upload resume
        const formData = new FormData();
        formData.append("file", payload.resume);

        const uploadRes = await fetch(`${API_BASE}/resume/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (uploadData.success && uploadData.data?.id) {
          const resumeId = uploadData.data.id;

          // 2. Create analysis
          const analysisRes = await fetch(`${API_BASE}/analysis`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              resumeId,
              jobDescription: payload.jobDescription,
              jobTitle: payload.jobTitle || "Target Role",
            }),
          });

          const analysisData = await analysisRes.json();
          if (analysisData.success && analysisData.data) {
            const a = analysisData.data;
            return {
              id: a.id,
              resumeName: payload.resume.name,
              jobTitle: a.jobTitle || payload.jobTitle || "Target Role",
              company: "Target Employer",
              createdAt: a.createdAt,
              matchScore: Math.round(a.matchScore || 0),
              atsScore: Math.round(a.atsScore || 0),
              matchingSkills: (a.matchedKeywords || []).map((k: string) => ({ name: k, category: "Skills" })),
              missingSkills: (a.missingKeywords || []).map((k: string) => ({ name: k, category: "Skills" })),
              keywords: [],
              summary: a.detailedReport?.overallAssessment || "Analysis complete.",
              suggestions: (a.suggestions?.items || []).map((i: any) => i.suggestion || i),
              improvementTips: a.detailedReport?.actionPlan || [],
              skillDistribution: [],
              strengthBreakdown: [],
            };
          }
        }
      } catch (e) {
        console.warn("Backend analysis error, using fallback:", e);
      }
    }

    return mockAnalysis;
  },
};

export const profileApi = {
  async get(): Promise<UserProfile> {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const u = JSON.parse(savedUser);
        return {
          name: u.name || "User",
          email: u.email || "",
          title: "Job Candidate",
          location: "Location Not Set",
          bio: "Welcome to AI Resume Analyzer!",
        };
      } catch {}
    }
    return mockProfile;
  },

  async update(patch: Partial<UserProfile>): Promise<UserProfile> {
    return { ...mockProfile, ...patch };
  },
};
