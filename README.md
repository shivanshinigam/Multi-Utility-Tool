# Multi-Tool File Conversion App 🚀

Welcome to the **Multi-Tool File Conversion App**! This is a simple yet powerful web application that provides several utilities to make your daily file management tasks easier. The app includes a **URL Shortener**, **PDF Converter**, **File Size Reducer**, and **File Format Converter**.

## Features ✨

- **URL Shortener**: Easily shorten long URLs for quick sharing.
- **PDF Converter**: Convert images, documents, and more to PDF format.
- **Size Reducer**: Compress large files without losing quality.
- **File Converter**: Convert between different file formats seamlessly.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **API-Driven**: Backend API handles file conversions and URL shortening.

---

## Tools & Technologies 🛠️

- **Frontend**: React
- **Backend**: Node.js (Express.js)
- **Database**: In-memory URL storage
- **File Handling**: Multer (for file uploads) and Sharp (for image processing)
- **File Conversion**: LibreOffice (for Word-to-PDF conversion)

---

## 🛠️ How to Set Up the Project Locally

### Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **LibreOffice** (for converting `.docx` to `.pdf` on Mac/Linux systems)

💻 Usage
1. URL Shortener:
Visit the Home Page of the app and enter the long URL you want to shorten.
The app will return a shorter version of the URL which you can share.
2. PDF Converter:
Upload a file (e.g., .docx, .png, .jpg) to convert it to PDF.
After conversion, you will receive a link to download the converted PDF.

🎯 API Endpoints
1. Shorten URL:
POST /api/shorten-url
Request body:

{
  "url": "http://long-url.com"
}
Response:
{
  "shortUrl": "http://localhost:5001/abc123"
}

2. Convert to PDF:
POST /api/convert-to-pdf
Form-data: Upload a file (e.g., .png, .docx)
{
  "pdfUrl": "http://localhost:5001/converted/converted-file.pdf"
