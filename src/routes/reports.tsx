import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/empty-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockReports } from "@/constants/mock-data";
import { formatDate } from "@/utils/format";
import { Download, FolderClock, Search, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports · ResumeIQ" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("recent");

  const filtered = useMemo(() => {
    let list = mockReports.filter(
      (r) =>
        r.jobTitle.toLowerCase().includes(q.toLowerCase()) ||
        (r.company ?? "").toLowerCase().includes(q.toLowerCase()),
    );
    if (sort === "match") list = [...list].sort((a, b) => b.matchScore - a.matchScore);
    if (sort === "ats") list = [...list].sort((a, b) => b.atsScore - a.atsScore);
    if (sort === "recent")
      list = [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return list;
  }, [q, sort]);

  return (
    <AppShell title="Reports">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by job title or company…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most recent</SelectItem>
              <SelectItem value="match">Highest match</SelectItem>
              <SelectItem value="ats">Highest ATS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={FolderClock}
            title="No reports found"
            description="Try a different search or create a new analysis."
            action={
              <Button asChild className="gradient-primary">
                <Link to="/upload">New analysis</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4">
            {filtered.map((r) => (
              <Card key={r.id} className="transition-shadow hover:shadow-elegant">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-display text-base font-semibold">{r.jobTitle}</p>
                      <Badge variant="secondary" className="rounded-full text-xs">
                        {r.company}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {r.resumeName} · {formatDate(r.createdAt)}
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
                    <Button variant="outline" size="sm">
                      <Download className="mr-1 h-3.5 w-3.5" /> PDF
                    </Button>
                    <Button asChild size="sm" className="gradient-primary">
                      <Link to="/analysis">
                        View <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
