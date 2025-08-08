import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download } from "lucide-react";
import { downloadFile } from "@/lib/file-utils";
import { useToast } from "@/hooks/use-toast";

export default function TextCase() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  const transformText = (type: string) => {
    let result = "";
    
    switch (type) {
      case "upper":
        result = inputText.toUpperCase();
        break;
      case "lower":
        result = inputText.toLowerCase();
        break;
      case "title":
        result = inputText.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case "sentence":
        result = inputText.replace(/(^|\.\s+)([a-z])/g, (match) =>
          match.toUpperCase()
        );
        break;
      case "camel":
        result = inputText
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, "");
        break;
      case "pascal":
        result = inputText
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/\s+/g, "");
        break;
      case "snake":
        result = inputText
          .replace(/\W+/g, " ")
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join("_");
        break;
      case "kebab":
        result = inputText
          .replace(/\W+/g, " ")
          .split(/ |\B(?=[A-Z])/)
          .map(word => word.toLowerCase())
          .join("-");
        break;
      default:
        result = inputText;
    }
    
    setOutputText(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy text to clipboard",
        variant: "destructive"
      });
    }
  };

  const downloadText = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    downloadFile(blob, 'converted_text.txt');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Text Case Converter</h2>
        <p className="text-muted-foreground">Transform text case - upper, lower, title, sentence, and more</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter or paste your text here..."
            className="min-h-32"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            onClick={() => transformText("upper")}
            variant="outline"
            disabled={!inputText}
          >
            UPPERCASE
          </Button>
          <Button
            onClick={() => transformText("lower")}
            variant="outline"
            disabled={!inputText}
          >
            lowercase
          </Button>
          <Button
            onClick={() => transformText("title")}
            variant="outline"
            disabled={!inputText}
          >
            Title Case
          </Button>
          <Button
            onClick={() => transformText("sentence")}
            variant="outline"
            disabled={!inputText}
          >
            Sentence case
          </Button>
          <Button
            onClick={() => transformText("camel")}
            variant="outline"
            disabled={!inputText}
          >
            camelCase
          </Button>
          <Button
            onClick={() => transformText("pascal")}
            variant="outline"
            disabled={!inputText}
          >
            PascalCase
          </Button>
          <Button
            onClick={() => transformText("snake")}
            variant="outline"
            disabled={!inputText}
          >
            snake_case
          </Button>
          <Button
            onClick={() => transformText("kebab")}
            variant="outline"
            disabled={!inputText}
          >
            kebab-case
          </Button>
        </div>

        {outputText && (
          <div className="space-y-3">
            <label className="text-sm font-medium block">Output Text</label>
            <div className="relative">
              <Textarea
                value={outputText}
                readOnly
                className="min-h-32 bg-muted"
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
                onClick={downloadText}
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
