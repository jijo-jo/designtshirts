import React from 'react';
import tshirt from '../data/tshirtblue.jpg'
import tshirtblack from "../data/tshirtblack.avif"
import tshirtAi from "../data/tshirtAI-white-front.webp"

const ToolbarLeft = ({ onDragStart }) => {
  return (
    <div className="p-4 border-r">
      <h2 className="text-xl font-bold mb-4">T-Shirt</h2>
      <img
        src={tshirt}
        alt="Front T-shirt"
        draggable
        onDragStart={(e) => onDragStart(e, 'front', tshirt)}
        className="w-24 cursor-pointer mb-4"
      />

      <img
        src={tshirtblack}
        alt="Front T-shirt"
        draggable
        onDragStart={(e) => onDragStart(e, 'front', tshirtblack)}
        className="w-24 cursor-pointer mb-4"
      />

      <img
        src={tshirtAi}
        alt="Front T-shirt"
        draggable
        onDragStart={(e) => onDragStart(e, 'front', tshirtAi)}
        className="w-24 cursor-pointer mb-4"
      />

    </div>
  );
};

export default ToolbarLeft;