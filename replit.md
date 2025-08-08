# ConvertAll - Online File Converter

## Overview

ConvertAll is a fully client-side web application for converting files between different formats. Built with React, TypeScript, and Express.js, the application provides a secure file conversion experience that runs entirely in the browser without uploading files to external servers. It supports image conversion, PDF manipulation, and text utilities with a modern, responsive interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Shadcn/UI components built on Radix UI primitives for accessibility and customization
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Context-based theme provider supporting light/dark modes with system preference detection

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Development Server**: Vite integration for hot module replacement in development
- **API Structure**: RESTful API design with /api prefix routing
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request monitoring and debugging

### Data Storage Solutions
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless integration
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **Client Storage**: Browser localStorage for theme preferences and application state

### File Processing Architecture
- **Client-Side Processing**: All file conversions happen in the browser using WebAPIs
- **Image Processing**: Canvas API for format conversion, HTML5 File API for reading files
- **PDF Operations**: PDF-lib for creation/manipulation, PDF.js for rendering and extraction
- **Text Processing**: Native JavaScript string manipulation and encoding functions
- **Memory Management**: Blob URLs and proper cleanup to prevent memory leaks

### Component Architecture
- **Layout Components**: Reusable Navbar and Footer with theme integration
- **Tool Components**: Modular converter components for different file types
- **UI Components**: Comprehensive component library with consistent design system
- **Workspace System**: Dynamic tool loading based on user selection
- **Drop Zone**: Unified file input handling with drag-and-drop support

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18, React DOM, React Hook Form for form management
- **TypeScript**: Full TypeScript support across frontend and backend
- **Express.js**: Web framework for Node.js backend services
- **Drizzle ORM**: Database toolkit with PostgreSQL dialect support

### UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide React**: Modern icon library with consistent design
- **Class Variance Authority**: Type-safe component variant management

### File Processing Libraries
- **PDF.js**: Mozilla's PDF rendering library loaded via CDN
- **PDF-lib**: PDF creation and manipulation library
- **Browser Image Compression**: Client-side image compression utility
- **Native Web APIs**: FileReader, Canvas, Blob for file operations

### Development Tools
- **Vite**: Build tool with React plugin and development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **TypeScript Compiler**: Type checking and compilation
- **Replit Integration**: Development environment optimization and error handling

### Database and Session Management
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store for Express
- **Drizzle Kit**: Database migration and introspection tools

### Utility Libraries
- **TanStack Query**: Powerful data fetching and caching library
- **Wouter**: Minimalist router for React applications
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally