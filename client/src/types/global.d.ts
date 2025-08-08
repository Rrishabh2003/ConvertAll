// Type declarations for external libraries loaded via CDN

declare global {
  interface Window {
    PDFLib: {
      PDFDocument: {
        create(): Promise<any>;
        load(data: ArrayBuffer): Promise<any>;
      };
    };
    pdfjsLib: {
      getDocument(data: ArrayBuffer): {
        promise: Promise<{
          numPages: number;
          getPage(pageNumber: number): Promise<any>;
        }>;
      };
    };
    imageCompression: (
      file: File,
      options: {
        maxSizeMB?: number;
        maxWidthOrHeight?: number;
        useWebWorker?: boolean;
        quality?: number;
      }
    ) => Promise<File>;
  }
}

export {};