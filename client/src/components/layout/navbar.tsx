import { RotateCcw } from "lucide-react";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <RotateCcw className="h-6 w-6 text-white" />
            </div>
            <a href="/" className="text-2xl font-bold gradient-text tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
              ConvertAll
            </a>
          </div>

          {/* Theme Toggle */}
          <ThemeToggleButton showLabel variant="circle" start="center" />
        </div>
      </div>
    </nav>
  );
}