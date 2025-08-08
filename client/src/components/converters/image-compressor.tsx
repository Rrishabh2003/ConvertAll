import { useState } from "react";
import DropZone from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { downloadFile } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";



export default function ImageCompressor() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState<number[]>([70]);
  const [compressedImages, setCompressedImages] = useState<Array<{ blob: Blob; filename: string; originalSize: number; newSize: number }>>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const { toast } = useToast();

  const handleFilesSelected = (selectedFiles: File[]) => {
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(imageFiles);
    setCompressedImages([]);
  };

  const compressImages = async () => {
    if (files.length === 0 || !window.imageCompression) {
      toast({
        title: "Compression Failed",
        description: "Image compression library not loaded",
        variant: "destructive"
      });
      return;
    }

    setIsCompressing(true);
    const compressed = [];

    try {
      for (const file of files) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          quality: quality[0] / 100
        };

        const compressedFile = await window.imageCompression(file, options);
        
        compressed.push({
          blob: compressedFile,
          filename: `compressed_${file.name}`,
          originalSize: file.size,
          newSize: compressedFile.size
        });
      }

      setCompressedImages(compressed);
      toast({
        title: "Compression Complete",
        description: `Successfully compressed ${files.length} image(s)`,
      });
    } catch (error) {
      toast({
        title: "Compression Failed",
        description: "An error occurred during image compression",
        variant: "destructive"
      });
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = (image: typeof compressedImages[0]) => {
    downloadFile(image.blob, image.filename);
  };

  const downloadAll = () => {
    compressedImages.forEach(image => {
      downloadFile(image.blob, image.filename);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Image Compressor</h2>
        <p className="text-muted-foreground">Reduce image file size while maintaining quality</p>
      </div>

      <DropZone
        onFilesSelected={handleFilesSelected}
        acceptedFileTypes="image/*"
        maxFiles={10}
      />

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Compression Level: {quality[0]}%</label>
            <Slider
              value={quality}
              onValueChange={setQuality}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Lower values = more compression (smaller file size, lower quality)
            </p>
          </div>

          <Button
            onClick={compressImages}
            disabled={isCompressing}
            className="gradient-primary text-primary-foreground"
          >
            {isCompressing ? 'Compressing...' : 'Compress Images'}
          </Button>
        </div>
      )}

      {compressedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Compressed Images</h3>
            <Button onClick={downloadAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compressedImages.map((image, index) => {
              const reduction = ((image.originalSize - image.newSize) / image.originalSize * 100).toFixed(1);
              return (
                <div key={index} className="bg-muted rounded-lg p-4">
                  <h4 className="font-medium mb-2">{image.filename}</h4>
                  <div className="text-sm text-muted-foreground mb-3">
                    <p>Original: {(image.originalSize / 1024).toFixed(2)} KB</p>
                    <p>Compressed: {(image.newSize / 1024).toFixed(2)} KB</p>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      {reduction}% reduction
                    </p>
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
