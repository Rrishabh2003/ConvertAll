import { Badge } from "@/components/ui/badge";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  badge?: string;
  tags?: string[];
}

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <div 
      className="tool-card-hover group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-border">
        <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
          <span className="text-white text-xl font-medium">{tool.icon}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
        <p className="text-muted-foreground mb-4">{tool.description}</p>
        
        {tool.badge && (
          <div className="text-sm font-medium mb-2" style={{ color: `hsl(var(--primary))` }}>
            {tool.badge}
          </div>
        )}
        
        {tool.tags && (
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
