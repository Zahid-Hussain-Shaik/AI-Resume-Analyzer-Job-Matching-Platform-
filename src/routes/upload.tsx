import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ResumeUploader } from "@/components/resume-uploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({ meta: [{ title: "Upload Resume · ResumeIQ" }] }),
  component: UploadPage,
});

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <AppShell title="Upload Resume">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Upload your resume</CardTitle>
              <p className="text-sm text-muted-foreground">
                Supported formats: PDF, DOCX. Your file never leaves your session.
              </p>
            </CardHeader>
            <CardContent>
              <ResumeUploader onFile={setFile} />
              <div className="mt-6 flex justify-end">
                <Button asChild disabled={!file} className="gradient-primary">
                  <Link to="/job-description">
                    Continue <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {file ? (
                <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-6 text-center">
                  <FileText className="h-10 w-10 text-primary" />
                  <p className="mt-3 truncate text-sm font-medium">{file.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Preview available after analysis
                  </p>
                </div>
              ) : (
                <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-6 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">No resume yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Upload a file to see the preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
