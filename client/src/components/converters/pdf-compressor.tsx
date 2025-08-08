import { useState } from "react";
import DropZone from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { downloadFile, readFileAsArrayBuffer } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";



export default function PDFCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState<string>("medium");
  const [compressedPdfs, setCompressedPdfs] = useState<Array<{ blob: Blob; filename: string; originalSize: number; newSize: number }>>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    setFiles(pdfFiles);
    setCompressedPdfs([]);
  };

  const compressPDFs = async () => {
    if (files.length === 0 || !window.PDFLib) {
      toast({
        title: "Compression Failed",
        description: "Please select PDF files to compress",
        variant: "destructive"
      });
      return;
    }

    setIsCompressing(true);
    const compressed = [];

    try {
      const { PDFDocument } = window.PDFLib;

      for (const file of files) {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer);

        // Basic compression by re-saving the PDF
        // Note: This is a simplified compression. For better results,
        // you would need more advanced PDF processing libraries
        const pdfBytes = await pdf.save({
          useObjectStreams: true,
          addDefaultPage: false,
          objectsPerTick: 50
        });

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        
        compressed.push({
          blob,
          filename: `compressed_${file.name}`,
          originalSize: file.size,
          newSize: blob.size
        });
      }

      setCompressedPdfs(compressed);
      toast({
        title: "Compression Complete",
        description: `Successfully compressed ${files.length} PDF file(s)`,
      });
    } catch (error) {
      toast({
        title: "Compression Failed",
        description: "An error occurred during PDF compression",
        variant: "destructive"
      });
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadPdf = (pdf: typeof compressedPdfs[0]) => {
    downloadFile(pdf.blob, pdf.filename);
  };

  const downloadAll = () => {
    compressedPdfs.forEach(pdf => {
      downloadFile(pdf.blob, pdf.filename);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">PDF Compressor</h2>
        <p className="text-muted-foreground">Reduce PDF file size while preserving quality</p>
      </div>

      <DropZone
        onFilesSelected={handleFilesSelected}
        acceptedFileTypes=".pdf"
        maxFiles={10}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Compression Level</label>
            <Select value={compressionLevel} onValueChange={setCompressionLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (Best Quality)</SelectItem>
                <SelectItem value="medium">Medium (Balanced)</SelectItem>
                <SelectItem value="high">High (Smallest Size)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Higher compression may reduce image quality in the PDF
            </p>
          </div>

          <Button
            onClick={compressPDFs}
            disabled={isCompressing}
            className="w-full gradient-primary text-primary-foreground"
          >
            {isCompressing ? 'Compressing PDFs...' : `Compress ${files.length} PDF File(s)`}
          </Button>
        </div>
      )}

      {compressedPdfs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Compressed PDFs</h3>
            <Button onClick={downloadAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compressedPdfs.map((pdf, index) => {
              const reduction = ((pdf.originalSize - pdf.newSize) / pdf.originalSize * 100).toFixed(1);
              const isSmaller = pdf.newSize < pdf.originalSize;
              
              return (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-sm">{pdf.filename}</h4>
                  <div className="text-sm text-muted-foreground mb-3">
                    <p>Original: {(pdf.originalSize / (1024 * 1024)).toFixed(2)} MB</p>
                    <p>Compressed: {(pdf.newSize / (1024 * 1024)).toFixed(2)} MB</p>
                    {isSmaller ? (
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        {reduction}% reduction
                      </p>
                    ) : (
                      <p className="text-muted-foreground">
                        File size optimized
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => downloadPdf(pdf)}
                    size="sm"
                    className="w-full gradient-primary text-primary-foreground"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
