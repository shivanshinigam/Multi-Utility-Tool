import React from "react";
import { FaLink, FaFilePdf, FaCompress, FaExchangeAlt } from "react-icons/fa";

const FeatureCard = ({ title, description, icon, link }) => {
  return (
    <a href={link} className="transform transition-all hover:scale-105">
      <div className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl transition duration-300">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default FeatureCard;



