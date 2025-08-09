# freetools.page

A modern, client-side file converter built with React, TypeScript, and Express.js. Convert files instantly in your browser with complete privacy - no uploads required!

## Features

- **100% Client-Side Processing**: All conversions happen in your browser
- **Complete Privacy**: No file uploads, no tracking, no data collection
- **Lightning Fast**: Instant processing with no server delays
- **Mobile Friendly**: Works perfectly on all devices
- **Free Forever**: No subscriptions, no limits, no hidden costs

## Supported Formats

### Image Tools
- Convert between PNG, JPEG, WebP, BMP
- Compress images (up to 80% reduction)
- Resize and crop images
- Maintain quality during conversion

### PDF Tools
- Merge multiple PDFs
- Split PDFs by pages
- Compress PDF files
- Convert PDF to images

### Text Tools
- Change text case (upper, lower, title, sentence)
- Format and validate JSON
- Base64 encode/decode
- URL encode/decode

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Build Tool**: Vite
- **Fonts**: Poppins (main), Orbitron (branding), Playfair Display (formal)
- **Icons**: Lucide React
- **Processing**: Client-side libraries (PDF.js, browser-image-compression)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd freetools
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5050`

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
freetools/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utility libraries
│   │   └── types/         # TypeScript types
├── server/                # Backend Express server
├── shared/                # Shared utilities
└── dist/                  # Build output
```

## Privacy & Security

- **No File Uploads**: All processing happens locally in your browser
- **No Data Collection**: We don't store, track, or analyze your files
- **No Server Processing**: Files never leave your device
- **Open Source**: Full transparency in how your data is handled

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact us through our website.

---

**freetools** - Convert files instantly with complete privacy. Free forever.
