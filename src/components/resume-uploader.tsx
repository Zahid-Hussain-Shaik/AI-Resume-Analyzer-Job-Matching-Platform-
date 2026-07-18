import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ResumeUploaderProps {
  onFile?: (file: File | null) => void;
}

export function ResumeUploader({ onFile }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const f = accepted[0];
      if (!f) return;
      setFile(f);
      onFile?.(f);
      setProgress(0);
      // Simulated upload progress (UI only)
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 8;
        });
      }, 90);
    },
    [onFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  const clear = () => {
    setFile(null);
    setProgress(0);
    onFile?.(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-card p-10 text-center transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-accent/30",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-glow">
          <Upload className="h-6 w-6 text-primary-foreground" />
        </div>
        <p className="mt-4 font-display text-base font-semibold">
          {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">or click to browse — PDF or DOCX, up to 10MB</p>
      </div>

      {file && (
        <div className="rounded-xl border bg-card p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB · {progress < 100 ? "Uploading…" : "Ready"}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={clear} aria-label="Remove">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="mt-3 h-1.5" />
        </div>
      )}
    </div>
  );
}
