import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ToolCard from "@/components/tools/tool-card";
import Workspace from "@/components/tools/workspace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Image, 
  FileText, 
  Scissors, 
  Merge, 
 Compress, 
  ImageIcon,
  Type,
  Code2,
  Hash,
  Link,
  Rocket,
  CheckCircle,
  Zap,
  Shield,
  Smartphone,
  RotateCcw,
  Minimize2,
  Maximize2,
  Crop,
  Archive
} from "lucide-react";

const imageTools = [
  {
    id: "image-convert",
    title: "Image Converter",
    description: "Convert between PNG, JPEG, WebP, and BMP formats",
    icon: RotateCcw,
    gradient: "from-blue-500 to-cyan-500",
    tags: ["PNG", "JPEG", "WebP"]
  },
  {
    id: "image-compress",
    title: "Compress Image",
    description: "Reduce image file size while maintaining quality",
    icon: Minimize2,
    gradient: "from-green-500 to-emerald-500",
    badge: "Up to 80% reduction"
  },
  {
    id: "image-resize",
    title: "Resize Image",
    description: "Change image dimensions and aspect ratio",
    icon: Maximize2,
    gradient: "from-purple-500 to-pink-500",
    badge: "Maintain quality"
  },
  {
    id: "image-crop",
    title: "Crop Image",
    description: "Crop and trim images to exact specifications",
    icon: Crop,
    gradient: "from-orange-500 to-red-500",
    badge: "Precise control"
  }
];

const pdfTools = [
  {
    id: "pdf-merge",
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one document",
    icon: Link,
    gradient: "from-red-500 to-pink-500",
    badge: "Unlimited files"
  },
  {
    id: "pdf-split",
    title: "Split PDF",
    description: "Extract specific pages or split into multiple files",
    icon: Scissors,
    gradient: "from-yellow-500 to-orange-500",
    badge: "Page by page"
  },
  {
    id: "pdf-compress",
    title: "Compress PDF",
    description: "Reduce PDF file size while preserving quality",
    icon: Archive,
    gradient: "from-green-500 to-teal-500",
    badge: "Smart compression"
  },
  {
    id: "pdf-to-image",
    title: "PDF to Image",
    description: "Convert PDF pages to PNG, JPEG images",
    icon: Image,
    gradient: "from-indigo-500 to-purple-500",
    badge: "High resolution"
  }
];

const textTools = [
  {
    id: "text-case",
    title: "Change Case",
    description: "Transform text case - upper, lower, title, sentence",
    icon: Type,
    gradient: "from-teal-500 to-cyan-500",
    tags: ["UPPER", "lower"]
  },
  {
    id: "json-format",
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON data",
    icon: Code2,
    gradient: "from-yellow-500 to-amber-500",
    badge: "Syntax validation"
  },
  {
    id: "base64",
    title: "Base64 Encode/Decode",
    description: "Convert text and files to/from Base64 format",
    icon: Hash,
    gradient: "from-purple-500 to-indigo-500",
    badge: "Bidirectional"
  },
  {
    id: "url-encode",
    title: "URL Encode/Decode",
    description: "Encode and decode URLs for web safety",
    icon: Link,
    gradient: "from-rose-500 to-pink-500",
    badge: "Web safe"
  }
];

export default function Home() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const allTools = [...imageTools, ...pdfTools, ...textTools];
  const filteredTools = (tools: typeof imageTools) => 
    tools.filter(tool => 
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const hasImageResults = filteredTools(imageTools).length > 0;
  const hasPdfResults = filteredTools(pdfTools).length > 0;
  const hasTextResults = filteredTools(textTools).length > 0;

  if (selectedTool) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <Workspace 
          toolId={selectedTool} 
          onBack={() => setSelectedTool(null)} 
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-pink-50/40 dark:from-slate-900 dark:via-purple-950/30 dark:to-blue-950/20 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="float-animation">
            <div className="inline-flex items-center space-x-2 mb-6">
              <img src="/icon1.png" alt="Logo" className="w-40 h-50" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="gradient-text leading-tight">
              freetools - Your Ultimate Free Toolkit
            </span>
          </h1>
          <p className="text-xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Access powerful free tools for converting images, PDFs, and documents right in your browser. 
            <span className="text-primary font-semibold">100% private</span> - no uploads needed, 
            <span className="text-secondary font-semibold">works offline</span> after first load.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="feature-badge-green">
              <CheckCircle className="h-4 w-4 mr-2" /> No Upload Required
            </span>
            <span className="feature-badge-blue">
              <Zap className="h-4 w-4 mr-2" /> Instant Processing
            </span>
            <span className="feature-badge-purple">
              <Shield className="h-4 w-4 mr-2" /> 100% Private
            </span>
            <span className="feature-badge-orange">
              <Smartphone className="h-4 w-4 mr-2" /> Mobile Friendly
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="pl-10 pr-4 py-4 text-lg rounded-2xl bg-card border-border focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="Search tools... (e.g., 'png to jpg', 'compress pdf', 'merge documents')"
            />
          </div>
        </div>

        {/* Tools Categories */}
        <div className="space-y-12">
          {/* Image Tools */}
          {hasImageResults && (
            <div className="tool-category">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Image className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Image Tools</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTools(imageTools).map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onClick={() => setSelectedTool(tool.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* PDF Tools */}
          {hasPdfResults && (
            <div className="tool-category">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">PDF Tools</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent dark:from-red-800"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTools(pdfTools).map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onClick={() => setSelectedTool(tool.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Text Tools */}
          {hasTextResults && (
            <div className="tool-category">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Type className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Text Tools</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-teal-200 to-transparent dark:from-teal-800"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTools(textTools).map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onClick={() => setSelectedTool(tool.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchTerm && !hasImageResults && !hasPdfResults && !hasTextResults && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-2xl flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">No tools found</h3>
              <p className="text-muted-foreground">
                Try searching for different keywords like "image", "pdf", or "text"
              </p>
            </div>
          )}
        </div>

        {/* Features Section */}
        <section className="mt-20 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ConvertAll?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of file conversion with complete privacy and instant processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">All processing happens in your browser. Your files never leave your device.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">No upload delays. Convert files instantly with client-side processing.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-muted-foreground">Works perfectly on all devices - desktop, tablet, and mobile.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
              <p className="text-muted-foreground">No subscriptions, no limits, no hidden costs. Free forever.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
