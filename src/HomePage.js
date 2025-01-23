import React from "react";
import FeatureCard from "./FeatureCard";
import Navbar from "./Navbar";
import URLShortener from './URLShortener';
import PDFConverter from "./PDFConverter";

import { FaLink, FaFilePdf, FaCompress, FaExchangeAlt } from "react-icons/fa";

const features = [
  {
    title: "URL Shortener",
    description: "Shorten long URLs into tiny, shareable links.",
    icon: <FaLink />,
    link: "/url-shortener",
  },
  {
    title: "PDF Converter",
    description: "Convert Word, Image, or HTML to PDF with ease.",
    icon: <FaFilePdf />,
    link: "/pdf-converter",
  },
  {
    title: "Size Reducer",
    description: "Compress images and videos to save space.",
    icon: <FaCompress />,
    link: "/size-reducer",
  },
  {
    title: "File Converter",
    description: "Convert files between multiple formats effortlessly.",
    icon: <FaExchangeAlt />,
    link: "/file-converter",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <header className="text-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-6xl font-extrabold mb-4">Welcome to All-in-One Tools!</h1>
        <p className="text-xl opacity-80 mb-8">Choose a tool to get started with our powerful utilities.</p>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            link={feature.link}
            className="transition-all transform hover:scale-105 hover:shadow-lg bg-white rounded-lg p-6 flex flex-col justify-between min-h-[300px]"
          />
        ))}
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="text-center">
          <p>© 2025 Multi-Utility WebApp. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="/terms" className="text-gray-400 hover:text-white">Terms</a>
            <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
