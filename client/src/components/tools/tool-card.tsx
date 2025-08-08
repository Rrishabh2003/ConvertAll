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
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const Icon = tool.icon;
  return (
    <div 
      onClick={onClick}
      className="group sleek-card p-6 cursor-pointer tool-card-hover"
    >
      <div className="flex items-start space-x-4">
        <div className="text-primary group-hover:scale-110 transition-transform duration-200">
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">{tool.title}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
          {tool.badge && (
            <Badge variant="secondary" className="mb-2">
              {tool.badge}
            </Badge>
          )}
          {tool.tags && (
            <div className="flex flex-wrap gap-1">
              {tool.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}