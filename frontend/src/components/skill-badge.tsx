import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export function SkillBadge({
  name,
  present = true,
  className,
}: {
  name: string;
  present?: boolean;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        present
          ? "border-success/30 bg-success/10 text-success"
          : "border-destructive/30 bg-destructive/10 text-destructive",
        className,
      )}
    >
      {present ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {name}
    </Badge>
  );
}
