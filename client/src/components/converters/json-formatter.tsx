import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, AlertCircle, CheckCircle } from "lucide-react";
import { downloadFile } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";

export default function JSONFormatter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  const formatJSON = () => {
    if (!inputText.trim()) {
      setError("Please enter some JSON to format");
      setIsValid(false);
      return;
    }

    try {
      const parsed = JSON.parse(inputText);
      const formatted = JSON.stringify(parsed, null, parseInt(indentSize));
      setOutputText(formatted);
      setIsValid(true);
      setError("");
      
      toast({
        title: "JSON Formatted",
        description: "Your JSON has been successfully formatted",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setIsValid(false);
      setOutputText("");
    }
  };

  const minifyJSON = () => {
    if (!inputText.trim()) {
      setError("Please enter some JSON to minify");
      setIsValid(false);
      return;
    }

    try {
      const parsed = JSON.parse(inputText);
      const minified = JSON.stringify(parsed);
      setOutputText(minified);
      setIsValid(true);
      setError("");
      
      toast({
        title: "JSON Minified",
        description: "Your JSON has been successfully minified",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setIsValid(false);
      setOutputText("");
    }
  };

  const validateJSON = () => {
    if (!inputText.trim()) {
      setError("Please enter some JSON to validate");
      setIsValid(false);
      return;
    }

    try {
      JSON.parse(inputText);
      setIsValid(true);
      setError("");
      setOutputText("✅ Valid JSON");
      
      toast({
        title: "Valid JSON",
        description: "Your JSON is valid!",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setIsValid(false);
      setOutputText("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy JSON to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([outputText], { type: 'application/json' });
    downloadFile(blob, 'formatted.json');
  };

  const loadSampleJSON = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "hobbies": ["reading", "swimming", "coding"],
      "address": {
        "street": "123 Main St",
        "zipCode": "10001"
      },
      "isActive": true
    };
    
    setInputText(JSON.stringify(sample, null, 2));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">JSON Formatter</h2>
        <p className="text-muted-foreground">Format, validate, and beautify JSON data</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Input JSON</label>
          <Button
            onClick={loadSampleJSON}
            variant="ghost"
            size="sm"
            className="text-primary"
          >
            Load Sample
          </Button>
        </div>
        
        <Textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setIsValid(null);
            setError("");
          }}
          placeholder="Enter or paste your JSON here..."
          className="min-h-48 font-mono text-sm"
        />

        <div className="flex flex-wrap gap-3 items-center">
          <Button
            onClick={formatJSON}
            disabled={!inputText.trim()}
            className="gradient-primary text-primary-foreground"
          >
            Format JSON
          </Button>
          
          <Button
            onClick={minifyJSON}
            disabled={!inputText.trim()}
            variant="outline"
          >
            Minify JSON
          </Button>
          
          <Button
            onClick={validateJSON}
            disabled={!inputText.trim()}
            variant="outline"
          >
            Validate JSON
          </Button>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Indent:</label>
            <Select value={indentSize} onValueChange={setIndentSize}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Status Indicator */}
        {isValid !== null && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            isValid 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
          }`}>
            {isValid ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {isValid ? 'Valid JSON' : 'Invalid JSON'}
            </span>
            {error && <span className="text-xs">: {error}</span>}
          </div>
        )}

        {outputText && (
          <div className="space-y-3">
            <label className="text-sm font-medium block">Output JSON</label>
            <div className="relative">
              <Textarea
                value={outputText}
                readOnly
                className="min-h-48 font-mono text-sm bg-muted"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button
                onClick={downloadJSON}
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
    </div>
  );
}
