import React, { useState } from 'react';
import tshirtAi from "../data/tshirtAI-white-front.webp"

import patern from "../data/pattern1.jpeg"
import ExtractTshirtBordersWithOpenCV from './ExtractObjectfromImage2';

const MainDisplay = ({ patterns }) => {
    const [currentView, setCurrentView] = useState('front');
    const [dragFile, setDragFile] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const view = e.dataTransfer.getData('view');
        const dragImage = e.dataTransfer.getData('dropData');
        setCurrentView(view);
        setDragFile(dragImage);
    };

    return (
        <>
            <div
                className="flex flex-col items-center justify-center p-8 border border-gray-300 w-full"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <h2 className="text-xl font-bold mb-4 capitalize">{currentView} View</h2>
                <ExtractTshirtBordersWithOpenCV imageSrc={tshirtAi} patternSrc={patern}/>
              
            </div>



        </>
    );
};

export default MainDisplay;
