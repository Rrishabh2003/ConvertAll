import { useState } from "react";
import DropZone from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Download, FileText, GripVertical } from "lucide-react";
import { downloadFile, readFileAsArrayBuffer } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";



export default function PDFMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPdf, setMergedPdf] = useState<Blob | null>(null);
  const [isMerging, setIsMerging] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    setFiles(pdfFiles);
    setMergedPdf(null);
  };

  const mergePDFs = async () => {
    if (files.length < 2 || !window.PDFLib) {
      toast({
        title: "Merge Failed",
        description: "Please select at least 2 PDF files",
        variant: "destructive"
      });
      return;
    }

    setIsMerging(true);

    try {
      const { PDFDocument } = window.PDFLib;
      const mergedDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await readFileAsArrayBuffer(file);
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedDoc.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page: any) => mergedDoc.addPage(page));
      }

      const pdfBytes = await mergedDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setMergedPdf(blob);

      toast({
        title: "Merge Complete",
        description: `Successfully merged ${files.length} PDF files`,
      });
    } catch (error) {
      toast({
        title: "Merge Failed",
        description: "An error occurred during PDF merging",
        variant: "destructive"
      });
    } finally {
      setIsMerging(false);
    }
  };

  const downloadMergedPdf = () => {
    if (mergedPdf) {
      downloadFile(mergedPdf, 'merged.pdf');
    }
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setFiles(newFiles);
    setMergedPdf(null); // Reset merged PDF when order changes
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">PDF Merger</h2>
        <p className="text-muted-foreground">Combine multiple PDF files into one document</p>
      </div>

      <DropZone
        onFilesSelected={handleFilesSelected}
        acceptedFileTypes=".pdf"
        maxFiles={20}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">PDF Files ({files.length})</h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop to reorder files. They will be merged in this order.
            </p>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', index.toString());
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  moveFile(fromIndex, index);
                }}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <FileText className="h-5 w-5 text-red-500" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">#{index + 1}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={mergePDFs}
            disabled={isMerging || files.length < 2}
            className="w-full gradient-primary text-primary-foreground"
          >
            {isMerging ? 'Merging PDFs...' : `Merge ${files.length} PDF Files`}
          </Button>
        </div>
      )}

      {mergedPdf && (
        <div className="bg-muted rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Merged PDF Ready!</h3>
          <div className="text-sm text-muted-foreground mb-4">
            <p>Size: {(mergedPdf.size / (1024 * 1024)).toFixed(2)} MB</p>
            <p>Contains pages from {files.length} PDF files</p>
          </div>
          <Button
            onClick={downloadMergedPdf}
            className="w-full gradient-primary text-primary-foreground"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Merged PDF
          </Button>
        </div>
      )}
    </div>
  );
}
