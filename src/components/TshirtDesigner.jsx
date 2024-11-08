import React, { useRef, useEffect } from 'react';

const PatternOverlay = ({ productImage, patternImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const productImg = new Image();
    productImg.src = productImage;
    productImg.onload = () => {
      canvas.width = productImg.width;
      canvas.height = productImg.height;
      ctx.drawImage(productImg, 0, 0);

      const patternImg = new Image();
      patternImg.src = patternImage;
      patternImg.onload = () => {
        const pattern = ctx.createPattern(patternImg, 'repeat');
        ctx.globalCompositeOperation = 'multiply'; 
        ctx.fillStyle = pattern;
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = 'source-over';
      };
    };
  }, [productImage, patternImage]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />;
};

export default PatternOverlay;




