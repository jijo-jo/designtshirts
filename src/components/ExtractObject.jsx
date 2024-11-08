import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ExtractTshirtBorders = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const outputCanvasRef = useRef(null);
  const [extractedObjectUrl, setExtractedObjectUrl] = useState('');

  useEffect(() => {
    const loadAndProcessImage = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const model = await cocoSsd.load();
      const predictions = await model.detect(canvas);

      const tshirtPrediction = predictions.find(pred => pred.class === 't-shirt');
      
      if (tshirtPrediction) {
        const { bbox } = tshirtPrediction;
        const [x, y, width, height] = bbox;

        const outputCanvas = outputCanvasRef.current;
        const outputCtx = outputCanvas.getContext('2d');
        outputCanvas.width = width;
        outputCanvas.height = height;

        outputCtx.drawImage(
          canvas,
          x,
          y,
          width,
          height,
          0,
          0,
          width,
          height
        );

        outputCtx.strokeStyle = 'red';
        outputCtx.lineWidth = 2;
        outputCtx.strokeRect(0, 0, width, height);

        const extractedObjectUrl = outputCanvas.toDataURL('image/png');
        setExtractedObjectUrl(extractedObjectUrl);
      }
    };

    loadAndProcessImage();
  }, [imageSrc]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <canvas ref={outputCanvasRef} style={{ display: 'none' }} />
      {extractedObjectUrl && (
        <img src={extractedObjectUrl} alt="Extracted T-shirt with Borders" />
      )}
    </div>
  );
};

export default ExtractTshirtBorders;

