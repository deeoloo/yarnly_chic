import React from "react";
import { FaInstagram, FaYoutube, FaTiktok, FaEnvelope } from "react-icons/fa";

const Socials = () => {
  const platforms = [
    { 
      name: "Instagram", 
      icon: <FaInstagram size={24} />, 
      handle: "@yarnlychic_ke",
      url: "https://www.instagram.com/yarnlychic_ke?igsh=ZzZoMnUxdmoydm12" 
    },
    { 
      name: "YouTube", 
      icon: <FaYoutube size={24} />, 
      handle: "@yarnlychic_ke",
      url: "https://youtube.com/@yarnlychic_ke?si=EeKOLhg_-H3znu8I" 
    },
    { 
      name: "TikTok", 
      icon: <FaTiktok size={24} />, 
      handle: "@yarnlychic_ke",
      url: "https://www.tiktok.com/@yarnlychic_ke?_t=ZM-8ymvGZKhmUi&_r=1" 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Connect With Us</h1>
      
      <div className="grid sm:grid-cols-3 gap-6">
        {platforms.map((platform, index) => (
          <a
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center hover:bg-gray-50"
          >
            <span className="text-2xl mb-3 text-purple-600">{platform.icon}</span>
            <h3 className="font-semibold text-lg mb-1">{platform.name}</h3>
            <p className="text-gray-600 text-sm">{platform.handle}</p>
          </a>
        ))}
      </div>

      <div className="bg-white mt-8 p-6 rounded-lg shadow-md text-center max-w-md mx-auto">
        <div className="flex justify-center mb-3">
          <FaEnvelope size={24} className="text-purple-600" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Email Us</h3>
        <a 
          href="mailto:yarnlychic@gmail.com" 
          className="text-purple-600 hover:underline font-medium"
        >
          yarnlychic@gmail.com
        </a>
      </div>
    </div>
  );
};

export default Socials;