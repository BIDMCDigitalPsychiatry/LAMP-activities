/**
 * @file   Image.tsx
 * @brief  Component for showing image 
 * @date   July , 2025
 * @author ZCO Engineer
 * @copyright (c) 2025, ZCO
 */
import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image: React.FC<ImageProps> = ({ src, alt,  className}) => {

  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};
export default Image;