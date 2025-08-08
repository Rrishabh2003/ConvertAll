import { useState } from "react";
import DropZone from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText } from "lucide-react";
import { downloadFile, readFileAsArrayBuffer } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";



export default function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [splitMethod, setSplitMethod] = useState<string>("pages");
  const [pageRange, setPageRange] = useState<string>("");
  const [splitPdfs, setSplitPdfs] = useState<Array<{ blob: Blob; filename: string; pages: string }>>([]);
  const [isSplitting, setIsSplitting] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { toast } = useToast();

  const handleFilesSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      const pdfFile = selectedFiles[0];
      setFile(pdfFile);
      setSplitPdfs([]);
      
      // Get total page count
      try {
        if (window.PDFLib) {
          const { PDFDocument } = window.PDFLib;
          const arrayBuffer = await readFileAsArrayBuffer(pdfFile);
          const pdf = await PDFDocument.load(arrayBuffer);
          setTotalPages(pdf.getPageCount());
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    }
  };

  const splitPDF = async () => {
    if (!file || !window.PDFLib) {
      toast({
        title: "Split Failed",
        description: "Please select a PDF file",
        variant: "destructive"
      });
      return;
    }

    setIsSplitting(true);
    const results = [];

    try {
      const { PDFDocument } = window.PDFLib;
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const sourcePdf = await PDFDocument.load(arrayBuffer);
      const totalPageCount = sourcePdf.getPageCount();

      if (splitMethod === "individual") {
        // Split into individual pages
        for (let i = 0; i < totalPageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(sourcePdf, [i]);
          newPdf.addPage(page);
          
          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          
          results.push({
            blob,
            filename: `${file.name.replace('.pdf', '')}_page_${i + 1}.pdf`,
            pages: `Page ${i + 1}`
          });
        }
      } else if (splitMethod === "pages" && pageRange) {
        // Split by page range
        const ranges = pageRange.split(',').map(range => range.trim());
        
        for (let i = 0; i < ranges.length; i++) {
          const range = ranges[i];
          let startPage = 1;
          let endPage = totalPageCount;
          
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(p => parseInt(p.trim()));
            startPage = Math.max(1, start);
            endPage = Math.min(totalPageCount, end);
          } else {
            startPage = endPage = Math.max(1, Math.min(totalPageCount, parseInt(range)));
          }
          
          if (startPage <= endPage) {
            const newPdf = await PDFDocument.create();
            const pageIndices = [];
            for (let j = startPage - 1; j < endPage; j++) {
              pageIndices.push(j);
            }
            
            const pages = await newPdf.copyPages(sourcePdf, pageIndices);
            pages.forEach((page: any) => newPdf.addPage(page));
            
            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            results.push({
              blob,
              filename: `${file.name.replace('.pdf', '')}_pages_${startPage}-${endPage}.pdf`,
              pages: startPage === endPage ? `Page ${startPage}` : `Pages ${startPage}-${endPage}`
            });
          }
        }
      }

      setSplitPdfs(results);
      toast({
        title: "Split Complete",
        description: `PDF split into ${results.length} file(s)`,
      });
    } catch (error) {
      toast({
        title: "Split Failed",
        description: "An error occurred during PDF splitting",
        variant: "destructive"
      });
    } finally {
      setIsSplitting(false);
    }
  };

  const downloadPdf = (pdf: typeof splitPdfs[0]) => {
    downloadFile(pdf.blob, pdf.filename);
  };

  const downloadAll = () => {
    splitPdfs.forEach(pdf => {
      downloadFile(pdf.blob, pdf.filename);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">PDF Splitter</h2>
        <p className="text-muted-foreground">Extract specific pages or split into multiple files</p>
      </div>

      <DropZone
        onFilesSelected={handleFilesSelected}
        acceptedFileTypes=".pdf"
        maxFiles={1}
      />

      {file && (
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {totalPages} pages • {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Split Method</label>
              <Select value={splitMethod} onValueChange={setSplitMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual Pages</SelectItem>
                  <SelectItem value="pages">Specific Pages/Ranges</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {splitMethod === "pages" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Page Range</label>
                <Input
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="e.g., 1-3, 5, 7-10"
                />
                <p className="text-xs text-muted-foreground">
                  Use commas to separate ranges. Example: 1-3, 5, 7-10
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={splitPDF}
            disabled={isSplitting || (splitMethod === "pages" && !pageRange)}
            className="w-full gradient-primary text-primary-foreground"
          >
            {isSplitting ? 'Splitting PDF...' : 'Split PDF'}
          </Button>
        </div>
      )}

      {splitPdfs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Split PDF Files</h3>
            <Button onClick={downloadAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {splitPdfs.map((pdf, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm">{pdf.filename}</h4>
                <div className="text-sm text-muted-foreground mb-3">
                  <p>{pdf.pages}</p>
                  <p>Size: {(pdf.blob.size / 1024).toFixed(2)} KB</p>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
