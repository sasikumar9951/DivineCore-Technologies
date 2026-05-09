"use client";

import { useEffect, useRef, useState } from "react";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  threshold?: number; // How close to white (0-255) to make transparent
}

const TransparentImage = ({ src, alt, className = "", threshold = 240 }: TransparentImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If the pixel is close to white, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src, threshold]);

  if (!processedSrc) {
    return <div className={className} />;
  }

  return (
    <img 
      src={processedSrc} 
      alt={alt} 
      className={className} 
    />
  );
};

export default TransparentImage;
