import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DropZone from "@/components/ui/drop-zone";
import { Copy, Download, Upload, FileText } from "lucide-react";
import { downloadFile, readFileAsDataURL, readFileAsArrayBuffer } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";

export default function Base64Converter() {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [fileOutput, setFileOutput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [decodedFileName, setDecodedFileName] = useState("");
  const { toast } = useToast();

  const encodeText = () => {
    if (!textInput.trim()) {
      toast({
        title: "Encode Failed",
        description: "Please enter some text to encode",
        variant: "destructive"
      });
      return;
    }

    try {
      const encoded = btoa(unescape(encodeURIComponent(textInput)));
      setTextOutput(encoded);
      
      toast({
        title: "Text Encoded",
        description: "Text has been successfully encoded to Base64",
      });
    } catch (error) {
      toast({
        title: "Encode Failed",
        description: "Failed to encode text to Base64",
        variant: "destructive"
      });
    }
  };

  const decodeText = () => {
    if (!textInput.trim()) {
      toast({
        title: "Decode Failed",
        description: "Please enter Base64 text to decode",
        variant: "destructive"
      });
      return;
    }

    try {
      const decoded = decodeURIComponent(escape(atob(textInput)));
      setTextOutput(decoded);
      
      toast({
        title: "Text Decoded",
        description: "Base64 has been successfully decoded to text",
      });
    } catch (error) {
      toast({
        title: "Decode Failed",
        description: "Invalid Base64 format or failed to decode",
        variant: "destructive"
      });
    }
  };

  const encodeFile = async () => {
    if (!selectedFile) {
      toast({
        title: "Encode Failed",
        description: "Please select a file to encode",
        variant: "destructive"
      });
      return;
    }

    try {
      const arrayBuffer = await readFileAsArrayBuffer(selectedFile);
      const bytes = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const encoded = btoa(binary);
      setFileOutput(encoded);
      
      toast({
        title: "File Encoded",
        description: `File "${selectedFile.name}" has been encoded to Base64`,
      });
    } catch (error) {
      toast({
        title: "Encode Failed",
        description: "Failed to encode file to Base64",
        variant: "destructive"
      });
    }
  };

  const decodeFile = () => {
    if (!fileOutput.trim() || !decodedFileName.trim()) {
      toast({
        title: "Decode Failed",
        description: "Please enter Base64 data and filename to decode",
        variant: "destructive"
      });
      return;
    }

    try {
      const binary = atob(fileOutput);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes]);
      downloadFile(blob, decodedFileName);
      
      toast({
        title: "File Decoded",
        description: "Base64 has been decoded and downloaded as file",
      });
    } catch (error) {
      toast({
        title: "Decode Failed",
        description: "Invalid Base64 format or failed to decode file",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Base64 data copied to clipboard",
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

  const handleFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setFileOutput("");
    }
  };

  const loadSample = () => {
    setTextInput("Hello, World! This is a sample text for Base64 encoding.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Base64 Encode/Decode</h2>
        <p className="text-muted-foreground">Convert text and files to/from Base64 format</p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Text
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            File
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Input Text</label>
              <Button
                onClick={loadSample}
                variant="ghost"
                size="sm"
                className="text-primary"
              >
                Load Sample
              </Button>
            </div>
            
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text to encode or Base64 data to decode..."
              className="min-h-32"
            />

            <div className="flex gap-3">
              <Button
                onClick={encodeText}
                disabled={!textInput.trim()}
                className="gradient-primary text-primary-foreground"
              >
                Encode to Base64
              </Button>
              
              <Button
                onClick={decodeText}
                disabled={!textInput.trim()}
                variant="outline"
              >
                Decode from Base64
              </Button>
            </div>

            {textOutput && (
              <div className="space-y-3">
                <label className="text-sm font-medium block">Output</label>
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
                    onClick={() => downloadText(textOutput, 'base64_output.txt')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select File to Encode</label>
              <DropZone
                onFilesSelected={handleFilesSelected}
                maxFiles={1}
                className="min-h-32"
              >
                <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Select a file to encode</h3>
                <p className="text-muted-foreground">Any file type supported</p>
              </DropZone>
            </div>

            {selectedFile && (
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                
                <Button
                  onClick={encodeFile}
                  className="w-full mt-3 gradient-primary text-primary-foreground"
                >
                  Encode File to Base64
                </Button>
              </div>
            )}

            {fileOutput && (
              <div className="space-y-3">
                <label className="text-sm font-medium block">Base64 Output</label>
                <div className="relative">
                  <Textarea
                    value={fileOutput}
                    onChange={(e) => setFileOutput(e.target.value)}
                    className="min-h-32 bg-muted font-mono text-xs"
                    placeholder="Base64 encoded file data will appear here..."
                  />
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={() => copyToClipboard(fileOutput)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Base64
                  </Button>
                  <Button
                    onClick={() => downloadText(fileOutput, 'base64_encoded.txt')}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Base64
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Decode to File</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={decodedFileName}
                      onChange={(e) => setDecodedFileName(e.target.value)}
                      placeholder="Enter filename (e.g., decoded_file.jpg)"
                      className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground"
                    />
                    <Button
                      onClick={decodeFile}
                      disabled={!fileOutput.trim() || !decodedFileName.trim()}
                      variant="outline"
                    >
                      Decode & Download
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
