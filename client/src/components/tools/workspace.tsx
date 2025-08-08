import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageConverter from "@/components/converters/image-converter";
import ImageCompressor from "@/components/converters/image-compressor";
import ImageResizer from "@/components/converters/image-resizer";
import PDFMerger from "@/components/converters/pdf-merger";
import PDFSplitter from "@/components/converters/pdf-splitter";
import PDFCompressor from "@/components/converters/pdf-compressor";
import PDFToImage from "@/components/converters/pdf-to-image";
import TextCase from "@/components/converters/text-case";
import JSONFormatter from "@/components/converters/json-formatter";
import Base64Converter from "@/components/converters/base64-converter";
import URLEncoder from "@/components/converters/url-encoder";

interface WorkspaceProps {
  toolId: string;
  onBack: () => void;
}

export default function Workspace({ toolId, onBack }: WorkspaceProps) {
  const renderTool = () => {
    switch (toolId) {
      case 'image-convert':
        return <ImageConverter />;
      case 'image-compress':
        return <ImageCompressor />;
      case 'image-resize':
        return <ImageResizer />;
      case 'image-crop':
        return <ImageResizer />; // Using resizer for crop functionality
      case 'pdf-merge':
        return <PDFMerger />;
      case 'pdf-split':
        return <PDFSplitter />;
      case 'pdf-compress':
        return <PDFCompressor />;
      case 'pdf-to-image':
        return <PDFToImage />;
      case 'text-case':
        return <TextCase />;
      case 'json-format':
        return <JSONFormatter />;
      case 'base64':
        return <Base64Converter />;
      case 'url-encode':
        return <URLEncoder />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-foreground">Tool Under Construction</h3>
            <p className="text-muted-foreground">This tool is being developed. Please check back soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/50">
          <Button
            onClick={onBack}
            variant="default"
            className="inline-flex items-center gradient-primary text-primary-foreground hover:shadow-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </div>
        
        <div className="p-8">
          {renderTool()}
        </div>
      </div>
    </div>
  );
}
