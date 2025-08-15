import React from "react";

const Policies = () => {
  const policies = [
    {
      title: "Shipping Policy",
      items: [
        "Orders processed within 1-3 business days.",
        "Free shipping on orders over $50.",
        "International shipping available (extra fees may apply).",
      ],
    },
    {
      title: "Returns & Refunds",
      items: [
        "30-day return window for unworn items.",
        "Refunds issued to original payment method.",
        "Exchanges subject to product availability.",
      ],
    },
    {
      title: "Privacy Policy",
      items: [
        "We never share/sell your personal data.",
        "Secure checkout with SSL encryption.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Our Policies</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{policy.title}</h2>
            <ul className="space-y-2">
              {policy.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;