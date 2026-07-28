import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScoreCircle } from "@/components/score-circle";
import { SkillBadge } from "@/components/skill-badge";
import { mockAnalysis } from "@/constants/mock-data";
import { Download, Lightbulb, Sparkles, Wand2 } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

export const Route = createFileRoute("/analysis")({
  head: () => ({ meta: [{ title: "Analysis · ResumeIQ" }] }),
  component: AnalysisPage,
});

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function AnalysisPage() {
  const a = mockAnalysis;

  return (
    <AppShell title="Analysis">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="outline" className="rounded-full">
              {a.resumeName}
            </Badge>
            <h2 className="mt-2 font-display text-2xl font-bold">{a.jobTitle}</h2>
            <p className="text-sm text-muted-foreground">{a.company}</p>
          </div>
          <Button variant="outline">
            <Download className="mr-1 h-4 w-4" /> Download report
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="flex flex-col items-center p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">Match Score</CardTitle>
            <ScoreCircle score={a.matchScore} label="of 100" className="mt-4" />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Strong alignment with the role's core requirements.
            </p>
          </Card>
          <Card className="flex flex-col items-center p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">ATS Score</CardTitle>
            <ScoreCircle score={a.atsScore} label="of 100" className="mt-4" />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Passes most applicant tracking systems.
            </p>
          </Card>
          <Card className="p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resume Summary</CardTitle>
            <p className="mt-4 text-sm leading-relaxed">{a.summary}</p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Matching Skills</CardTitle>
              <p className="text-xs text-muted-foreground">Skills found in both your resume and the job description.</p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {a.matchingSkills.map((s) => (
                <SkillBadge key={s.name} name={s.name} present />
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Missing Skills</CardTitle>
              <p className="text-xs text-muted-foreground">Add these to strengthen your application.</p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {a.missingSkills.map((s) => (
                <SkillBadge key={s.name} name={s.name} present={false} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Keyword Comparison</CardTitle>
              <p className="text-xs text-muted-foreground">Frequency of key terms in the job description.</p>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={a.keywords} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" className="text-xs" stroke="currentColor" />
                  <YAxis type="category" dataKey="keyword" width={110} className="text-xs" stroke="currentColor" />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="frequency" radius={[0, 6, 6, 0]}>
                    {a.keywords.map((k, i) => (
                      <Cell key={i} fill={k.inResume ? "var(--color-chart-1)" : "var(--color-chart-5)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={a.skillDistribution} dataKey="value" nameKey="category" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {a.skillDistribution.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Resume Strength</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={a.strengthBreakdown}>
                  <PolarGrid className="stroke-border" />
                  <PolarAngleAxis dataKey="area" className="text-xs" stroke="currentColor" />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="score" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-primary" /> AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {a.suggestions.map((s, i) => (
                <div key={i} className="flex gap-3 rounded-lg border bg-card/50 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-sm">{s}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-warning" /> Improvement Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2">
              {a.improvementTips.map((t, i) => (
                <li key={i} className="flex gap-3 rounded-lg border p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
