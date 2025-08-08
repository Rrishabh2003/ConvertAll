import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  className?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ 
  value, 
  className = "",
  showPercentage = true 
}: ProgressBarProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Progress value={value} className="h-3" />
      {showPercentage && (
        <p className="text-center text-sm text-muted-foreground">
          Processing... {Math.round(value)}% complete
        </p>
      )}
    </div>
  );
}
