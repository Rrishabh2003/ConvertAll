import { useState } from "react";
import DropZone from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { downloadFile, readFileAsDataURL } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";

export default function ImageConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState<string>("jpeg");
  const [quality, setQuality] = useState<number[]>([90]);
  const [convertedImages, setConvertedImages] = useState<Array<{ blob: Blob; filename: string; originalSize: number; newSize: number }>>([]);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(imageFiles);
    setConvertedImages([]);
  };

  const convertImages = async () => {
    if (files.length === 0) return;

    setIsConverting(true);
    const converted: Array<{ blob: Blob; filename: string; originalSize: number; newSize: number }> = [];

    try {
      for (const file of files) {
        const dataURL = await readFileAsDataURL(file);
        const img = new Image();

        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = dataURL;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);

          await new Promise<void>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const newFilename = file.name.replace(/\.[^/.]+$/, `.${outputFormat}`);
                converted.push({
                  blob,
                  filename: newFilename,
                  originalSize: file.size,
                  newSize: blob.size
                });
              }
              resolve();
            }, `image/${outputFormat}`, quality[0] / 100);
          });
        }
      }

      setConvertedImages(converted);
      toast({
        title: "Conversion Complete",
        description: `Successfully converted ${files.length} image(s)`,
      });
    } catch (error) {
      toast({
        title: "Conversion Failed",
        description: "An error occurred during image conversion",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = (image: typeof convertedImages[0]) => {
    downloadFile(image.blob, image.filename);
  };

  const downloadAll = () => {
    convertedImages.forEach(image => {
      downloadFile(image.blob, image.filename);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Image Format Converter</h2>
        <p className="text-muted-foreground">Convert images between PNG, JPEG, WebP, and BMP formats</p>
      </div>

      <DropZone
        onFilesSelected={handleFilesSelected}
        acceptedFileTypes="image/*"
        maxFiles={10}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                  <SelectItem value="bmp">BMP</SelectItem>
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
          </div>

          <Button
            onClick={convertImages}
            disabled={isConverting}
            className="gradient-primary text-primary-foreground"
          >
            {isConverting ? 'Converting...' : 'Convert Images'}
          </Button>
        </div>
      )}

      {convertedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Converted Images</h3>
            <Button onClick={downloadAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {convertedImages.map((image, index) => {
              const reduction = ((image.originalSize - image.newSize) / image.originalSize * 100).toFixed(1);
              return (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-2">{image.filename}</h4>
                  <div className="text-sm text-muted-foreground mb-3">
                    <p>Original: {(image.originalSize / 1024).toFixed(2)} KB</p>
                    <p>Converted: {(image.newSize / 1024).toFixed(2)} KB</p>
                    {parseFloat(reduction) > 0 && (
                      <p className="text-green-600 dark:text-green-400">
                        {reduction}% smaller
                      </p>
                    )}
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
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
