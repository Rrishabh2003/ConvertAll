import { Badge } from "@/components/ui/badge";
import { RotateCcw, Minimize2, Maximize2, Crop, Link, Scissors, Archive, Image, Type, Code, Lock, Globe, LucideIcon } from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon; // Changed from string to LucideIcon
  gradient: string;
  badge?: string;
  tags?: string[];
}

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon; // Changed from string to LucideIcon
  onClick: () => void;
}

export default function ToolCard({ title, description, icon: Icon, onClick }: ToolCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group p-6 rounded-xl border border-border bg-card hover:bg-accent transition-all duration-200 cursor-pointer hover:shadow-lg hover:border-primary/20"
    >
      <div className="flex items-start space-x-4">
        <div className="text-primary group-hover:scale-110 transition-transform duration-200">
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">{title}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}