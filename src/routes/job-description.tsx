import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, FileText } from "lucide-react";
import { sampleJobDescription } from "@/constants/mock-data";

export const Route = createFileRoute("/job-description")({
  head: () => ({ meta: [{ title: "Job Description · AI Resume Analyzer & Job Match Platform" }] }),
  component: JobDescriptionPage,
});

const MAX = 5000;

function JobDescriptionPage() {
  const [text, setText] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  return (
    <AppShell title="Job Description">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Paste the job description</CardTitle>
              <p className="text-sm text-muted-foreground">
                We'll compare it against your resume to find matches, gaps, and improvements.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setText(sampleJobDescription)}>
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Use sample
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="role">Job title</Label>
                <Input
                  id="role"
                  placeholder="Senior Frontend Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company (optional)</Label>
                <Input
                  id="company"
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="jd">Job description</Label>
                <span className="text-xs text-muted-foreground">
                  {text.length.toLocaleString()} / {MAX.toLocaleString()}
                </span>
              </div>
              <Textarea
                id="jd"
                placeholder="Paste the full job description here…"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, MAX))}
                className="min-h-72 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                <FileText className="mr-1 inline h-3 w-3" />
                Tip: include responsibilities and requirements for the most accurate match.
              </p>
            </div>

            <div className="flex justify-between">
              <Button asChild variant="ghost">
                <Link to="/upload">Back</Link>
              </Button>
              <Button asChild disabled={text.length < 50}>
                <Link to="/analysis">
                  Analyze <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
