import { Link, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <img src="/icon1.png" alt="freetools icon" className="h-8 w-8 object-contain" />
              </div>
              <h3 className="text-2xl font-bold gradient-text">
                freetools
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Convert files instantly in your browser with complete privacy. No uploads, no tracking, no limits.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for privacy and freedom</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Image Converter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">PDF Tools</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Text Tools</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Compress Files</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 freetools. All rights reserved. | 100% Free | No File Upload | Works Offline
        </div>
      </div>
    </footer>
  );
}