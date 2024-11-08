import React, { useEffect, useState } from 'react';

const PatternedTshirt = ({ imageSrc, patternSrc, patternScale = 1 }) => {
  const [tshirtLoaded, setTshirtLoaded] = useState(false);

  useEffect(() => {
    
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => setTshirtLoaded(true);
  }, [imageSrc]);

  if (!tshirtLoaded) return <p>Loading T-shirt...</p>;

  return (
    <div className="relative flex justify-center items-center">
      <img
        src={imageSrc}
        alt="T-shirt"
        className="relative w-full"
        style={{ zIndex: 1 }}
      />

      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${patternSrc})`,
          backgroundSize: `${patternScale * 100}% ${patternScale * 100}%`,
          backgroundRepeat: 'repeat',
          WebkitMaskImage: `url(${imageSrc})`,
          maskImage: `url(${imageSrc})`,
          WebkitMaskSize: 'cover',
          maskSize: 'cover',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          zIndex: 2,
        }}
      ></div>
    </div>
  );
};

export default PatternedTshirt;


