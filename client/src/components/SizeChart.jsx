import React from "react";

const SizeChart = () => {
  const sizes = [
    { size: "XS", bust: "32", waist: "24", hips: "34", length: "25" },
    { size: "S", bust: "34", waist: "26", hips: "36", length: "26" },
    { size: "M", bust: "36", waist: "28", hips: "38", length: "27" },
    { size: "L", bust: "38", waist: "30", hips: "40", length: "28" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Size Guide</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Women's Sizes (inches)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Size (US)</th>
                  <th className="p-3 text-left">Bust</th>
                  <th className="p-3 text-left">Waist</th>
                  <th className="p-3 text-left">Hips</th>
                  <th className="p-3 text-left">Length</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{row.size}</td>
                    <td className="p-3">{row.bust}</td>
                    <td className="p-3">{row.waist}</td>
                    <td className="p-3">{row.hips}</td>
                    <td className="p-3">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 p-6">
          <h3 className="font-medium mb-2">How to Measure:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Bust:</strong> Around the fullest part.</li>
            <li><strong>Waist:</strong> Narrowest part of your torso.</li>
            <li><strong>Hips:</strong> Widest part of your hips.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;