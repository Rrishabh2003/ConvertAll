# ConvertAll

The most secure and fastest online file converter. Convert images, PDFs, and documents instantly in your browser with complete privacy.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Image Converter**: Convert images between formats (JPEG, PNG, WebP, etc.)
- **PDF Tools**: Merge, split, compress, and convert PDFs
- **Text Utilities**: Format JSON, encode Base64, change text case
- **Compression Tools**: Compress images and PDFs
- **Works Offline**: No file uploads, complete privacy
- **Responsive UI**: Modern, mobile-friendly design
- **Google AdSense Integration**: Monetization-ready

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Build Tools**: Vite
- **Other Libraries**: PDF.js, PDF-lib, browser-image-compression

## Getting Started

### Prerequisites
- Node.js v20+
- npm v8+

### Installation
```bash
git clone https://github.com/yourusername/FileConvertPro.git
cd FileConvertPro
npm install
```

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

The server will run on [http://localhost:5050](http://localhost:5050) by default.

## Usage
- Access the web app in your browser.
- Select the desired tool from the homepage.
- Follow on-screen instructions to convert or process your files.

## Project Structure
```
FileConvertPro/
├── client/         # Frontend source code
├── server/         # Backend server code
├── shared/         # Shared types and schema
├── public/         # Static assets (favicon, etc.)
├── package.json    # Project metadata and scripts
├── README.md       # Project documentation
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a pull request

Please ensure your code follows the existing style and passes all tests.

## License
This project is licensed under the MIT License.