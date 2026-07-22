import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreCircle } from "@/components/score-circle";
import { EmptyState } from "@/components/empty-state";
import { formatDate } from "@/utils/format";
import { useAuth } from "@/hooks/use-auth";
import { analysisApi } from "@/services/api";
import type { AnalysisResult } from "@/types/analysis";
import {
  ArrowUpRight,
  FilePlus2,
  TrendingUp,
  Target,
  FileText,
  Upload,
  FolderClock,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · AI Resume Analyzer & Job Match Platform" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    analysisApi.list().then((data) => {
      if (mounted) {
        setReports(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const hasReports = reports.length > 0;
  const recent = reports.slice(0, 4);

  const avgMatch = hasReports
    ? Math.round(reports.reduce((s, r) => s + r.matchScore, 0) / reports.length)
    : 0;

  const avgAts = hasReports
    ? Math.round(reports.reduce((s, r) => s + r.atsScore, 0) / reports.length)
    : 0;

  const trendData = [...reports]
    .reverse()
    .map((r, i) => ({ name: `#${i + 1}`, match: r.matchScore, ats: r.atsScore }));

  const latest = reports[0];

  const firstName = user?.name ? user.name.split(" ")[0] : "there";

  return (
    <AppShell title="Dashboard">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Header Banner */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">Welcome back, {firstName}</h2>
            <p className="text-sm text-muted-foreground">
              {hasReports
                ? "Here's how your resume is performing across recent job applications."
                : "Get started by uploading your resume and matching it against job descriptions."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {hasReports && (
              <Button asChild variant="outline">
                <Link to="/reports">View reports</Link>
              </Button>
            )}
            <Button asChild>
              <Link to="/upload">
                <FilePlus2 className="mr-2 h-4 w-4" /> New analysis
              </Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center rounded-xl border bg-card text-muted-foreground">
            <Sparkles className="mr-2 h-5 w-5 animate-spin text-primary" /> Loading dashboard...
          </div>
        ) : !hasReports ? (
          /* NEW USER EMPTY STATE */
          <div className="space-y-6">
            <EmptyState
              icon={Upload}
              title="No Resume Analyses Yet"
              description="Upload your resume (PDF or DOCX) and paste a job description to calculate your ATS compatibility score and get tailored AI improvement suggestions."
              action={
                <Button asChild size="lg" className="gap-2">
                  <Link to="/upload">
                    <Sparkles className="h-4 w-4" /> Run Your First Analysis
                  </Link>
                </Button>
              }
              className="py-16"
            />

            {/* Quick Start Steps for New Users */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-bold">1</span>
                    Upload Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Upload your PDF or DOCX resume. We automatically extract and parse your experience and skills.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-bold">2</span>
                    Paste Job Post
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Add the target job description or requirements for the position you want to apply for.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary font-bold">3</span>
                    Get ATS Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  View your ATS score, matched vs missing keywords, and actionable AI recommendations.
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* USER WITH ANALYSES DATA */
          <>
            {/* Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Analyses</p>
                    <p className="mt-1 font-display text-2xl font-bold">{reports.length}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Avg. Match Score</p>
                    <p className="mt-1 font-display text-2xl font-bold">{avgMatch}%</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Avg. ATS Score</p>
                    <p className="mt-1 font-display text-2xl font-bold">{avgAts}%</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Applications</p>
                    <p className="mt-1 font-display text-2xl font-bold">{reports.length}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Charts & Latest Report Widget */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Score trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                        <YAxis domain={[0, 100]} stroke="#888888" fontSize={12} tickLine={false} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="match"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          name="Match Score"
                        />
                        <Line
                          type="monotone"
                          dataKey="ats"
                          stroke="hsl(var(--success))"
                          strokeWidth={2}
                          name="ATS Score"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {latest && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">Latest analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center space-y-4 pt-2">
                    <ScoreCircle score={latest.matchScore} label="Match" size={140} />
                    <div className="text-center">
                      <p className="font-display font-semibold">{latest.jobTitle}</p>
                      <p className="text-xs text-muted-foreground">{latest.company}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/analysis">
                        View details <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Recent Analyses List */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Recent analyses</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/reports">See all</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {recent.map((r) => (
                    <div key={r.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium text-sm">{r.jobTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.company} · {formatDate(r.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <div>
                          <span className="text-muted-foreground font-normal">Match </span>
                          <span className="text-primary">{r.matchScore}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground font-normal">ATS </span>
                          <span className="text-success">{r.atsScore}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </AppShell>
  );
}
