import { useState } from "react";
import DropZone from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { downloadFile, readFileAsArrayBuffer } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";



export default function PDFToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [quality, setQuality] = useState<number[]>([90]);
  const [scale, setScale] = useState<number[]>([1.5]);
  const [images, setImages] = useState<Array<{ blob: Blob; filename: string; pageNumber: number }>>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { toast } = useToast();

  const handleFilesSelected = async (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      const pdfFile = selectedFiles[0];
      setFile(pdfFile);
      setImages([]);
      
      // Get total page count
      try {
        if (window.pdfjsLib) {
          const arrayBuffer = await readFileAsArrayBuffer(pdfFile);
          const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
          setTotalPages(pdf.numPages);
        }
      } catch (error) {
        console.error('Error loading PDF:', error);
      }
    }
  };

  const convertPDFToImages = async () => {
    if (!file || !window.pdfjsLib) {
      toast({
        title: "Conversion Failed",
        description: "Please select a PDF file",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);
    const convertedImages: Array<{ blob: Blob; filename: string; pageNumber: number }> = [];

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: scale[0] });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          await page.render(renderContext).promise;

          await new Promise<void>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const filename = `${file.name.replace('.pdf', '')}_page_${pageNum}.${outputFormat}`;
                convertedImages.push({
                  blob,
                  filename,
                  pageNumber: pageNum
                });
              }
              resolve();
            }, `image/${outputFormat}`, quality[0] / 100);
          });
        }
      }

      setImages(convertedImages);
      toast({
        title: "Conversion Complete",
        description: `Successfully converted ${pdf.numPages} page(s) to images`,
      });
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "An error occurred during PDF to image conversion",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = (image: typeof images[0]) => {
    downloadFile(image.blob, image.filename);
  };

  const downloadAll = () => {
    images.forEach(image => {
      downloadFile(image.blob, image.filename);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">PDF to Image</h2>
        <p className="text-muted-foreground">Convert PDF pages to PNG, JPEG images</p>
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
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">PDF</span>
              </div>
              <div>
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {totalPages} pages • {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Quality: {quality[0]}%</label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Resolution: {scale[0]}x</label>
              <Slider
                value={scale}
                onValueChange={setScale}
                min={0.5}
                max={3}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher values = better quality, larger file size
              </p>
            </div>
          </div>

          <Button
            onClick={convertPDFToImages}
            disabled={isConverting}
            className="w-full gradient-primary text-primary-foreground"
          >
            {isConverting ? 'Converting PDF...' : `Convert ${totalPages} Page(s) to Images`}
          </Button>
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Converted Images</h3>
            <Button onClick={downloadAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm">{image.filename}</h4>
                <div className="text-sm text-muted-foreground mb-3">
                  <p>Page {image.pageNumber}</p>
                  <p>Size: {(image.blob.size / 1024).toFixed(2)} KB</p>
                </div>
                <Button
                  onClick={() => downloadImage(image)}
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
