import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-4">
          Email us at: <a href="mailto:hello@yarnlychic.com" className="text-purple-600 hover:underline">hello@yarnlychic.com</a>
        </p>
        
        <h3 className="font-medium mb-2">Business Hours:</h3>
        <p className="mb-4">Monday - Friday: 9AM - 5PM EAT</p>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Follow Us:</h3>
          <div className="flex gap-4">
            <a href="https://instagram.com/yarnlychic_ke" className="hover:text-purple-600">
              Instagram
            </a>
            <a href="https://youtube.com/@yarnlychic_ke" className="hover:text-purple-600">
              YouTube
            </a>
            <a href="https://tiktok.com/@yarnlychic_ke" className="hover:text-purple-600">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;