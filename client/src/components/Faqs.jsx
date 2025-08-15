import React, { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Orders typically ship within 1-3 business days. Domestic delivery takes 3-5 days, international 7-14 days.",
    },
    {
      question: "What's your return policy?",
      answer: "You may return unworn items within 30 days for a refund. Exchanges are subject to availability.",
    },
    {
      question: "How do I track my order?",
      answer: "Tracking links are emailed once your order ships. Contact us if you need assistance!",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We ship worldwide. Customs fees may apply depending on your country.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-gray-50"
            >
              <span>{faq.question}</span>
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="p-4 pt-0 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;