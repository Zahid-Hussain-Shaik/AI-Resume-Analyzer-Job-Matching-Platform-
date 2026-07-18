import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreCircle } from "@/components/score-circle";
import { mockReports } from "@/constants/mock-data";
import { formatDate } from "@/utils/format";
import { ArrowUpRight, FilePlus2, TrendingUp, Target, FileText } from "lucide-react";
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
  head: () => ({ meta: [{ title: "Dashboard · ResumeIQ" }] }),
  component: Dashboard,
});

function Dashboard() {
  const recent = mockReports.slice(0, 4);
  const avgMatch = Math.round(mockReports.reduce((s, r) => s + r.matchScore, 0) / mockReports.length);
  const avgAts = Math.round(mockReports.reduce((s, r) => s + r.atsScore, 0) / mockReports.length);
  const trendData = [...mockReports]
    .reverse()
    .map((r, i) => ({ name: `#${i + 1}`, match: r.matchScore, ats: r.atsScore }));

  return (
    <AppShell title="Dashboard">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">Welcome back, Alex 👋</h2>
            <p className="text-sm text-muted-foreground">
              Here's how your resume is performing across recent applications.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/reports">View reports</Link>
            </Button>
            <Button asChild className="gradient-primary">
              <Link to="/upload">
                <FilePlus2 className="mr-1 h-4 w-4" /> New analysis
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Analyses", value: mockReports.length, icon: FileText },
            { label: "Avg. Match Score", value: `${avgMatch}%`, icon: Target },
            { label: "Avg. ATS Score", value: `${avgAts}%`, icon: TrendingUp },
            { label: "Applications", value: 24, icon: ArrowUpRight },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Score trend</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" stroke="currentColor" />
                  <YAxis className="text-xs" stroke="currentColor" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="match" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="ats" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest analysis</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ScoreCircle score={recent[0].matchScore} label="Match" />
              <p className="mt-4 text-center font-display font-semibold">{recent[0].jobTitle}</p>
              <p className="text-xs text-muted-foreground">{recent[0].company}</p>
              <Button asChild variant="ghost" size="sm" className="mt-4">
                <Link to="/analysis">
                  View details <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent analyses</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/reports">See all</Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y">
            {recent.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate font-medium">{r.jobTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.company} · {formatDate(r.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Match</p>
                    <p className="font-display font-bold text-primary">{r.matchScore}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">ATS</p>
                    <p className="font-display font-bold text-success">{r.atsScore}%</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
