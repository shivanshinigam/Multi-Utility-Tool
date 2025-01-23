import React, { useState } from "react";
import './stylepdf.css';  // Optional for styling

const PDFConverter = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    setFile(selectedFile);
  };

  // Handle file upload and conversion
  const handleFileUpload = async (e) => {
    e.preventDefault();
    console.log("Form submitted, processing file...");

    if (!file) {
      alert("Please select a file to convert.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsProcessing(true);
    setError("");  // Reset any previous errors

    try {
      // Make the actual API call to your backend
      const response = await fetch("http://localhost:5001/api/convert-to-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("PDF URL:", data.pdfUrl);
        setDownloadLink(data.pdfUrl);
      } else {
        console.error("Error converting file:", response.status, response.statusText);
        setError("Error during file conversion. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Failed to connect to the server. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="container">
      <h2>PDF Converter</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" accept=".doc,.docx,.jpg,.png,.html" onChange={handleFileChange} required />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Converting..." : "Convert to PDF"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}  {/* Display error message if any */}

      {downloadLink && (
        <div className="result">
          <p>Conversion successful!</p>
          {/* Download link for the converted PDF */}
          <a href={downloadLink} download="converted-file.pdf">Download Converted PDF</a>
        </div>
      )}
    </div>
  );
};

export default PDFConverter;
