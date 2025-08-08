import { useState } from "react";
import DropZone from "@/components/ui/drop-zone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Download } from "lucide-react";
import { downloadFile, readFileAsDataURL } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";

export default function ImageResizer() {
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState<string>("800");
  const [height, setHeight] = useState<string>("600");
  const [preset, setPreset] = useState<string>("custom");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedImages, setResizedImages] = useState<Array<{ blob: Blob; filename: string; originalDimensions: string; newDimensions: string }>>([]);
  const [isResizing, setIsResizing] = useState(false);
  const { toast } = useToast();

  const presets = {
    "1920x1080": { width: 1920, height: 1080 },
    "1280x720": { width: 1280, height: 720 },
    "800x600": { width: 800, height: 600 },
    "640x480": { width: 640, height: 480 },
    "custom": { width: parseInt(width) || 800, height: parseInt(height) || 600 }
  };

  const handleFilesSelected = (selectedFiles: File[]) => {
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(imageFiles);
    setResizedImages([]);
  };

  const handlePresetChange = (newPreset: string) => {
    setPreset(newPreset);
    if (newPreset !== "custom") {
      const dimensions = presets[newPreset as keyof typeof presets];
      setWidth(dimensions.width.toString());
      setHeight(dimensions.height.toString());
    }
  };

  const resizeImages = async () => {
    if (files.length === 0) return;

    setIsResizing(true);
    const resized: Array<{ blob: Blob; filename: string; originalDimensions: string; newDimensions: string }> = [];

    try {
      for (const file of files) {
        const dataURL = await readFileAsDataURL(file);
        const img = new Image();

        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = dataURL;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          let newWidth = parseInt(width) || 800;
          let newHeight = parseInt(height) || 600;

          if (maintainAspectRatio) {
            const aspectRatio = img.width / img.height;
            if (newWidth / newHeight > aspectRatio) {
              newWidth = newHeight * aspectRatio;
            } else {
              newHeight = newWidth / aspectRatio;
            }
          }

          canvas.width = newWidth;
          canvas.height = newHeight;

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          await new Promise<void>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const newFilename = `resized_${file.name}`;
                resized.push({
                  blob,
                  filename: newFilename,
                  originalDimensions: `${img.width}x${img.height}`,
                  newDimensions: `${Math.round(newWidth)}x${Math.round(newHeight)}`
                });
              }
              resolve();
            }, file.type);
          });
        }
      }

      setResizedImages(resized);
      toast({
        title: "Resize Complete",
        description: `Successfully resized ${files.length} image(s)`,
      });
    } catch (error) {
      toast({
        title: "Resize Failed",
        description: "An error occurred during image resizing",
        variant: "destructive"
      });
    } finally {
      setIsResizing(false);
    }
  };

  const downloadImage = (image: typeof resizedImages[0]) => {
    downloadFile(image.blob, image.filename);
  };

  const downloadAll = () => {
    resizedImages.forEach(image => {
      downloadFile(image.blob, image.filename);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Image Resizer</h2>
        <p className="text-muted-foreground">Change image dimensions and aspect ratio</p>
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
              <label className="text-sm font-medium">Preset Size</label>
              <Select value={preset} onValueChange={handlePresetChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1920x1080">Full HD (1920x1080)</SelectItem>
                  <SelectItem value="1280x720">HD (1280x720)</SelectItem>
                  <SelectItem value="800x600">SVGA (800x600)</SelectItem>
                  <SelectItem value="640x480">VGA (640x480)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Width (px)</label>
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Height (px)</label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="aspect-ratio"
              checked={maintainAspectRatio}
              onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
            />
            <label htmlFor="aspect-ratio" className="text-sm font-medium">
              Maintain aspect ratio
            </label>
          </div>

          <Button
            onClick={resizeImages}
            disabled={isResizing}
            className="gradient-primary text-primary-foreground"
          >
            {isResizing ? 'Resizing...' : 'Resize Images'}
          </Button>
        </div>
      )}

      {resizedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Resized Images</h3>
            <Button onClick={downloadAll} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resizedImages.map((image, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <h4 className="font-medium mb-2">{image.filename}</h4>
                <div className="text-sm text-muted-foreground mb-3">
                  <p>Original: {image.originalDimensions}</p>
                  <p>Resized: {image.newDimensions}</p>
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
