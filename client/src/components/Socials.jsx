import React from "react";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Socials = () => {
  const platforms = [
    { name: "Instagram", icon: <FaInstagram size={24} />, handle: "https://www.instagram.com/yarnlychic_ke?igsh=ZzZoMnUxdmoydm12" },
    { name: "Youtube", icon: <FaYoutube size={24} />, handle: "https://youtube.com/@yarnlychic_ke?si=EeKOLhg_-H3znu8I" },
    { name: "TikTok", icon: <FaTiktok size={24} />, handle: "https://www.tiktok.com/@yarnlychic_ke?_t=ZM-8ymvGZKhmUi&_r=1" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Connect With Us</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((platform, index) => (
          <a
            key={index}
            href="#"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <span className="text-2xl mb-2 text-pink-500">{platform.icon}</span>
            <h3 className="font-semibold">{platform.name}</h3>
            <p className="text-gray-600 mt-1">{platform.handle}</p>
          </a>
        ))}
      </div>
      <div className="bg-white mt-8 p-6 rounded-lg shadow-md text-center">
        <h3 className="font-semibold mb-2">Email Us</h3>
        <a href="mailto:hello@yourbrand.com" className="text-blue-500 hover:underline">
          .com
        </a>
      </div>
    </div>
  );
};

export default Socials;