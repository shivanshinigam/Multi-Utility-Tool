import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import "./index.css";
import "./FeatureCard";
import "./Navbar";
import URLShortener from './URLShortener';
import PDFConverter from "./PDFConverter";
import SizeReducer from "./SizeReducer";
import FileConverter from "./FileConverter";

//import './styleurl.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/url-shortener" element={<URLShortener />} /> {/* URL Shortener route */}
        <Route path="/pdf-converter" element={<PDFConverter />} /> {/* PDF Converter route */}
      </Routes>
    </Router>
  );
};

export default App;
