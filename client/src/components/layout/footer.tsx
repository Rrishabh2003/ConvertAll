import { Search, RefreshCw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">
                ConvertAll
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The most secure and fastest online file converter. Convert images, PDFs, and documents instantly in your browser with complete privacy.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>All systems operational</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Image Converter</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">PDF Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Text Utilities</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Compression Tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-center md:text-left">
            © 2024 ConvertAll. All rights reserved. | 100% Free | No File Upload | Works Offline
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground flex items-center">
              Built with <RefreshCw className="h-4 w-4 mx-1 text-primary" /> for privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}