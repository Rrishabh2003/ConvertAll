import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ToolCard from "@/components/tools/tool-card";
import Workspace from "@/components/tools/workspace";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const imageTools = [
  {
    id: "image-convert",
    title: "Image Converter",
    description: "Convert between PNG, JPEG, WebP, and BMP formats",
    icon: "🔄",
    gradient: "from-blue-500 to-cyan-500",
    tags: ["PNG", "JPEG", "WebP"]
  },
  {
    id: "image-compress",
    title: "Compress Image",
    description: "Reduce image file size while maintaining quality",
    icon: "📉",
    gradient: "from-green-500 to-emerald-500",
    badge: "Up to 80% reduction"
  },
  {
    id: "image-resize",
    title: "Resize Image",
    description: "Change image dimensions and aspect ratio",
    icon: "📐",
    gradient: "from-purple-500 to-pink-500",
    badge: "Maintain quality"
  },
  {
    id: "image-crop",
    title: "Crop Image",
    description: "Crop and trim images to exact specifications",
    icon: "✂️",
    gradient: "from-orange-500 to-red-500",
    badge: "Precise control"
  }
];

const pdfTools = [
  {
    id: "pdf-merge",
    title: "Merge PDFs",
    description: "Combine multiple PDF files into one document",
    icon: "🔗",
    gradient: "from-red-500 to-pink-500",
    badge: "Unlimited files"
  },
  {
    id: "pdf-split",
    title: "Split PDF",
    description: "Extract specific pages or split into multiple files",
    icon: "✂️",
    gradient: "from-yellow-500 to-orange-500",
    badge: "Page by page"
  },
  {
    id: "pdf-compress",
    title: "Compress PDF",
    description: "Reduce PDF file size while preserving quality",
    icon: "🗜️",
    gradient: "from-green-500 to-teal-500",
    badge: "Smart compression"
  },
  {
    id: "pdf-to-image",
    title: "PDF to Image",
    description: "Convert PDF pages to PNG, JPEG images",
    icon: "🖼️",
    gradient: "from-indigo-500 to-purple-500",
    badge: "High resolution"
  }
];

const textTools = [
  {
    id: "text-case",
    title: "Change Case",
    description: "Transform text case - upper, lower, title, sentence",
    icon: "Aa",
    gradient: "from-teal-500 to-cyan-500",
    tags: ["UPPER", "lower"]
  },
  {
    id: "json-format",
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON data",
    icon: "{ }",
    gradient: "from-yellow-500 to-amber-500",
    badge: "Syntax validation"
  },
  {
    id: "base64",
    title: "Base64 Encode/Decode",
    description: "Convert text and files to/from Base64 format",
    icon: "🔒",
    gradient: "from-purple-500 to-indigo-500",
    badge: "Bidirectional"
  },
  {
    id: "url-encode",
    title: "URL Encode/Decode",
    description: "Encode and decode URLs for web safety",
    icon: "🌐",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="float-animation">
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl">🚀</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">
              Free Online File Converter
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Convert images, PDFs, and documents instantly in your browser. 
            <span className="text-primary font-semibold"> 100% private</span> - no file uploads, 
            <span className="text-secondary font-semibold"> completely offline</span> after first load.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
              ✓ No Upload Required
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
              ⚡ Instant Processing
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
              🔒 100% Private
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
              📱 Mobile Friendly
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
                  <span className="text-white text-2xl">🖼️</span>
                </div>
                <h2 className="text-3xl font-bold">Image Tools</h2>
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
                  <span className="text-white text-2xl">📄</span>
                </div>
                <h2 className="text-3xl font-bold">PDF Tools</h2>
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
                  <span className="text-white text-2xl">📝</span>
                </div>
                <h2 className="text-3xl font-bold">Text Tools</h2>
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
              <h3 className="text-xl font-semibold mb-2">No tools found</h3>
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
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">All processing happens in your browser. Your files never leave your device.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">No upload delays. Convert files instantly with client-side processing.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-muted-foreground">Works perfectly on all devices - desktop, tablet, and mobile.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🆓</span>
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
