import React, { useEffect, useRef } from 'react';


const TShirtDesignerCanvas = ({ tshirtSrc, patternSrc }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    
    const tshirtImg = new Image();
    tshirtImg.src = tshirtSrc;

    tshirtImg.onload = () => {

      ctx.drawImage(tshirtImg, 0, 0, canvas.width, canvas.height);

   
      const patternImg = new Image();
      patternImg.src = patternSrc;

      patternImg.onload = () => {
       
        const pattern = ctx.createPattern(patternImg, 'repeat');

        
        ctx.globalCompositeOperation = 'source-in'; 
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = 'source-over';
      };
    };
  }, [tshirtSrc, patternSrc]);

  return (
    <canvas ref={canvasRef} width={500} height={600} className="border shadow-lg" />
  );
};

export default TShirtDesignerCanvas;

