import React from 'react';
import pattern1 from "../data/pattern1.jpeg"
import pattern2 from "../data/pattern2.jpeg"
import pattern3 from "../data/pattern3.jpeg"

const ToolbarRight = ({ onSelectPattern }) => {
  const patterns = [pattern1,pattern2,pattern3]; 

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl font-bold mb-4">Patterns</h2>
      <div className="space-y-2">
        {patterns.map((pattern, index) => (
          <img
            key={index}
            src={pattern}
            alt="Pattern"
            onClick={() => onSelectPattern(pattern)}
            className="w-16 cursor-pointer border p-1"
          />
        ))}
      </div>
    </div>
  );
};

export default ToolbarRight;
