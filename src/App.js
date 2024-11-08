import React, { useState } from 'react';
import ToolbarLeft from './components/ToolbarLeft';
import MainDisplay from './components/MainDisplay';
import ToolbarRight from './components/ToolbarRight';
import "./App.css"

function App() {
  const [patterns, setPatterns] = useState(null);

  const handleDragStart = (e, view, dropData) => {
    e.dataTransfer.setData('view', view);
    e.dataTransfer.setData("dropData",dropData)
  };

  const handleSelectPattern = (pattern) => {
    setPatterns(pattern);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100">
        <ToolbarLeft onDragStart={handleDragStart} />
      </div>
      <div className="w-3/5 bg-white flex items-center justify-center">
        <MainDisplay patterns={patterns} />
      </div>
      <div className="w-1/5 bg-gray-100">
        <ToolbarRight onSelectPattern={handleSelectPattern} />
      </div>
    </div>
  );
}

export default App;

