const express = require("express");
const cors = require("cors");
const shortid = require("shortid");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { exec } = require("child_process"); // To execute LibreOffice command

const app = express();

// Directory for converted PDFs
const convertedFolder = path.join(__dirname, "converted");
if (!fs.existsSync(convertedFolder)) {
  fs.mkdirSync(convertedFolder, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json()); // For handling POST requests

const port = process.env.PORT || 5001;

// Store the original URLs
const urls = {};

// File storage for PDF conversion (using multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); // Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Shorten URL endpoint
app.post("/api/shorten-url", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "No URL provided" });
  }

  const shortUrl = shortid.generate(); // Generate a short URL
  urls[shortUrl] = url; // Store the original URL with the short URL key

  // Respond with the shortened URL
  res.json({ shortUrl: `http://localhost:${port}/${shortUrl}` });
});

// Redirect to original URL
app.get("/:shortUrl", (req, res) => {
  const { shortUrl } = req.params;
  const originalUrl = urls[shortUrl]; // Find the original URL from the mapping

  if (originalUrl) {
    return res.redirect(originalUrl); // Redirect to the original URL
  } else {
    return res.status(404).json({ message: "URL not found" }); // URL not found
  }
});

// PDF Conversion API
app.post("/api/convert-to-pdf", upload.single("file"), (req, res) => {
  const file = req.file;

  // Log the uploaded file details to ensure it's uploaded correctly
  console.log("File uploaded:", file);

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filePath = file.path;
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (fileExtension === ".png") {
    try {
      // Validate the file path
      if (!fs.existsSync(filePath)) {
        return res.status(400).send("File does not exist.");
      }

      // Define the output path for the converted PDF file
      const outputPath = path.join(convertedFolder, `${Date.now()}-converted-file.pdf`);

      // Convert PNG to PDF using sharp
      sharp(filePath)
        .toFormat("pdf") // Convert to PDF format
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error("Error converting PNG to PDF:", err);
            return res.status(500).send("Error converting to PDF");
          }

          console.log("PDF file created at:", outputPath);
          res.json({ pdfUrl: `http://localhost:${port}/converted/${path.basename(outputPath)}` });
        });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during the PNG to PDF conversion.");
    }
  } else if (fileExtension === ".docx") {
    // Handle Word-to-PDF conversion using LibreOffice
    const outputPath = path.join(convertedFolder, `${Date.now()}-converted-file.pdf`);

    // LibreOffice command to convert docx to pdf
    const command = `/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf --outdir "${convertedFolder}" "${filePath}"`;


    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error("Error converting Word to PDF:", stderr);
        return res.status(500).send("Error converting Word to PDF");
      }

      console.log("PDF file created at:", outputPath);
      res.json({ pdfUrl: `http://localhost:${port}/converted/${path.basename(outputPath)}` });
    });
  } else {
    // Unsupported file type
    console.log("Unsupported file type:", fileExtension);
    return res.status(400).send("Unsupported file type");
  }
});

// Serve converted files (so the frontend can download them)
app.use("/converted", express.static("converted"));
app.use("/uploads", express.static("uploads")); // To serve uploaded files if needed

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
