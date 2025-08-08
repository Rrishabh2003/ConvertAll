import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Link, Type } from "lucide-react";
import { downloadFile } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";

export default function URLEncoder() {
  const [urlInput, setUrlInput] = useState("");
  const [urlOutput, setUrlOutput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const { toast } = useToast();

  const encodeURL = () => {
    if (!urlInput.trim()) {
      toast({
        title: "Encode Failed",
        description: "Please enter a URL to encode",
        variant: "destructive"
      });
      return;
    }

    try {
      const encoded = encodeURIComponent(urlInput);
      setUrlOutput(encoded);
      
      toast({
        title: "URL Encoded",
        description: "URL has been successfully encoded",
      });
    } catch (error) {
      toast({
        title: "Encode Failed",
        description: "Failed to encode URL",
        variant: "destructive"
      });
    }
  };

  const decodeURL = () => {
    if (!urlInput.trim()) {
      toast({
        title: "Decode Failed",
        description: "Please enter an encoded URL to decode",
        variant: "destructive"
      });
      return;
    }

    try {
      const decoded = decodeURIComponent(urlInput);
      setUrlOutput(decoded);
      
      toast({
        title: "URL Decoded",
        description: "URL has been successfully decoded",
      });
    } catch (error) {
      toast({
        title: "Decode Failed",
        description: "Invalid URL encoding or failed to decode",
        variant: "destructive"
      });
    }
  };

  const encodeText = () => {
    if (!textInput.trim()) {
      toast({
        title: "Encode Failed",
        description: "Please enter text to encode",
        variant: "destructive"
      });
      return;
    }

    try {
      const encoded = encodeURIComponent(textInput);
      setTextOutput(encoded);
      
      toast({
        title: "Text Encoded",
        description: "Text has been successfully URL encoded",
      });
    } catch (error) {
      toast({
        title: "Encode Failed",
        description: "Failed to encode text",
        variant: "destructive"
      });
    }
  };

  const decodeText = () => {
    if (!textInput.trim()) {
      toast({
        title: "Decode Failed",
        description: "Please enter encoded text to decode",
        variant: "destructive"
      });
      return;
    }

    try {
      const decoded = decodeURIComponent(textInput);
      setTextOutput(decoded);
      
      toast({
        title: "Text Decoded",
        description: "Text has been successfully URL decoded",
      });
    } catch (error) {
      toast({
        title: "Decode Failed",
        description: "Invalid URL encoding or failed to decode",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    downloadFile(blob, filename);
  };

  const loadURLSample = () => {
    setUrlInput("https://example.com/search?q=hello world&category=web development&sort=date");
  };

  const loadTextSample = () => {
    setTextInput("Hello World! This is a test with special characters: @#$%^&*()");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">URL Encode/Decode</h2>
        <p className="text-muted-foreground">Encode and decode URLs and text for web safety</p>
      </div>

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            URL
          </TabsTrigger>
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">URL Input</label>
              <Button
                onClick={loadURLSample}
                variant="ghost"
                size="sm"
                className="text-primary"
              >
                Load Sample URL
              </Button>
            </div>
            
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL to encode or encoded URL to decode..."
              className="font-mono text-sm"
            />

            <div className="flex gap-3">
              <Button
                onClick={encodeURL}
                disabled={!urlInput.trim()}
                className="gradient-primary text-primary-foreground"
              >
                Encode URL
              </Button>
              
              <Button
                onClick={decodeURL}
                disabled={!urlInput.trim()}
                variant="outline"
              >
                Decode URL
              </Button>
            </div>

            {urlOutput && (
              <div className="space-y-3">
                <label className="text-sm font-medium block">Output URL</label>
                <div className="relative">
                  <Textarea
                    value={urlOutput}
                    readOnly
                    className="min-h-24 bg-muted font-mono text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(urlOutput)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    onClick={() => downloadText(urlOutput, 'url_output.txt')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Common URL Encoding Examples:</h4>
              <div className="text-xs space-y-1 text-muted-foreground font-mono">
                <div>Space → %20</div>
                <div>& → %26</div>
                <div>? → %3F</div>
                <div># → %23</div>
                <div>+ → %2B</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Text Input</label>
              <Button
                onClick={loadTextSample}
                variant="ghost"
                size="sm"
                className="text-primary"
              >
                Load Sample Text
              </Button>
            </div>
            
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text to encode or encoded text to decode..."
              className="min-h-32"
            />

            <div className="flex gap-3">
              <Button
                onClick={encodeText}
                disabled={!textInput.trim()}
                className="gradient-primary text-primary-foreground"
              >
                Encode Text
              </Button>
              
              <Button
                onClick={decodeText}
                disabled={!textInput.trim()}
                variant="outline"
              >
                Decode Text
              </Button>
            </div>

            {textOutput && (
              <div className="space-y-3">
                <label className="text-sm font-medium block">Output Text</label>
                <div className="relative">
                  <Textarea
                    value={textOutput}
                    readOnly
                    className="min-h-32 bg-muted font-mono text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(textOutput)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    onClick={() => downloadText(textOutput, 'text_output.txt')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Use Cases for URL Encoding Text:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Preparing text for URL parameters</li>
                <li>• Encoding special characters for web forms</li>
                <li>• Making text safe for HTTP transmission</li>
                <li>• Handling international characters in URLs</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
