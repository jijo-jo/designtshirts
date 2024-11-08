import React, { useEffect, useRef, useState } from 'react';

const ExtractTshirtBordersWithPattern = ({ imageSrc, patternSrc, patternScale = 1 }) => {
  const canvasRef = useRef(null);
  const outputCanvasRef = useRef(null);
  const [finalImageUrl, setFinalImageUrl] = useState('');

  useEffect(() => {
    const loadAndProcessImage = async () => {
      if (!window.cv) {
        console.error("OpenCV is not loaded yet.");
        return;
      }

      const canvas = canvasRef.current;
      const outputCanvas = outputCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const outputCtx = outputCanvas.getContext('2d');

      const tshirtImage = new Image();
      tshirtImage.src = imageSrc;
      await new Promise((resolve) => (tshirtImage.onload = resolve));
      canvas.width = tshirtImage.width;
      canvas.height = tshirtImage.height;
      outputCanvas.width = tshirtImage.width;
      outputCanvas.height = tshirtImage.height;
      ctx.drawImage(tshirtImage, 0, 0);

  
      const patternImage = new Image();
      patternImage.src = patternSrc;
      await new Promise((resolve) => (patternImage.onload = resolve));

     
      const src = cv.imread(canvas);
      const gray = new cv.Mat();
      const edges = new cv.Mat();
      const mask = new cv.Mat();
      const contours = new cv.MatVector();
      const hierarchy = new cv.Mat();


      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
      cv.Canny(gray, edges, 50, 150, 3, false);
      cv.threshold(edges, mask, 1, 255, cv.THRESH_BINARY_INV);

   
      cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      cv.drawContours(mask, contours, -1, new cv.Scalar(0), 3); 

      const tshirtArea = new cv.Mat();
      src.copyTo(tshirtArea, mask);

      cv.imshow(outputCanvas, tshirtArea);

      // Create and apply pattern
      const patternCanvas = document.createElement('canvas');
      patternCanvas.width = patternImage.width * patternScale;
      patternCanvas.height = patternImage.height * patternScale;
      const patternCtx = patternCanvas.getContext('2d');
      patternCtx.drawImage(patternImage, 0, 0, patternCanvas.width, patternCanvas.height);

      // Fill T-shirt area with pattern
      const pattern = outputCtx.createPattern(patternCanvas, 'repeat');
      outputCtx.fillStyle = pattern;
      outputCtx.globalCompositeOperation = 'source-in';
      outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

      // Fill outside area with white
      outputCtx.globalCompositeOperation = 'destination-over';
      outputCtx.fillStyle = 'white';
      outputCtx.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

      // Convert to URL for displaying the final image
      const finalImageUrl = outputCanvas.toDataURL('image/png');
      setFinalImageUrl(finalImageUrl);

      // Cleanup
      src.delete();
      gray.delete();
      edges.delete();
      mask.delete();
      tshirtArea.delete();
      contours.delete();
      hierarchy.delete();
    };

    if (window.cv && window.cv['onRuntimeInitialized']) {
      loadAndProcessImage();
    } else {
      const checkInterval = setInterval(() => {
        if (window.cv && window.cv['onRuntimeInitialized']) {
          clearInterval(checkInterval);
          loadAndProcessImage();
        }
      }, 100);
    }
  }, [imageSrc, patternSrc, patternScale]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <canvas ref={outputCanvasRef} style={{ display: 'none' }} />
      {finalImageUrl && (
        <img src={finalImageUrl} alt="T-shirt with Applied Pattern and Border" />
      )}
    </div>
  );
};

export default ExtractTshirtBordersWithPattern;










