import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const FAQs = () => {
  // Sample FAQ data
  const faqItems = [
    {
      question: "How long does shipping take?",
      answer: "Orders typically ship within 1-3 business days. Domestic delivery takes 3-5 days, international 7-14 days."
    },
    {
      question: "What's your return policy?",
      answer: "You may return unworn items within 30 days for a refund. Exchanges are subject to availability."
    },
    {
      question: "How do I track my order?",
      answer: "Tracking links are emailed once your order ships. Contact us if you need assistance!"
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Trigger Button - Put this in your Footer */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-left hover:underline"
      >
        FAQs
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Background Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {faqItems.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border-b pb-4 last:border-0"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center text-left font-medium"
                    >
                      <span className="text-lg">{faq.question}</span>
                      <span className="text-xl ml-4">
                        {activeIndex === index ? '−' : '+'}
                      </span>
                    </button>
                    {activeIndex === index && (
                      <div className="mt-2 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">
                  Still have questions? Email us at{" "}
                  <a href="mailto:yarnlychic@gmail.com" className="text-purple-600">
                    yarnlychic@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQs;