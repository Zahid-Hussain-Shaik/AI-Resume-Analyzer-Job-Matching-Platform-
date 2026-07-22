import { ArrowRight, Sparkles, XCircle, CheckCircle2, Info } from "lucide-react";

interface BeforeAfterCardProps {
  original: string;
  improved: string;
  reason: string;
}

export function BeforeAfterCard({ original, improved, reason }: BeforeAfterCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md">
      <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Original Side */}
        <div className="flex flex-col bg-muted/20 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <XCircle className="h-4 w-4 text-muted-foreground/70" />
              Original Version
            </span>
          </div>
          <div className="relative flex-1 rounded-md border border-dashed border-muted-foreground/20 bg-background/50 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground line-through decoration-destructive/30">
              {original}
            </p>
          </div>
        </div>

        {/* Improved Side */}
        <div className="flex flex-col bg-primary/[0.02] p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" />
              AI Optimized
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              + Impact
            </span>
          </div>
          <div className="relative flex-1 rounded-md border border-primary/20 bg-background p-4 shadow-sm">
            <p className="text-sm font-medium leading-relaxed text-foreground">
              {improved}
            </p>
          </div>
        </div>
      </div>

      {/* Rationale Footer */}
      <div className="border-t bg-muted/10 px-5 py-3">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 rounded-full bg-primary/10 p-1">
            <Info className="h-3 w-3 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">
            <strong className="font-semibold text-foreground">Why this works:</strong> {reason}
          </p>
        </div>
      </div>
    </div>
  );
}
