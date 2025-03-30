
import React from "react";

interface PhotoTabProps {
  photo: string;
  alt: string;
  description: string;
}

const PhotoTab: React.FC<PhotoTabProps> = ({ photo, alt, description }) => {
  return (
    <div className="mt-4">
      <div className="rounded-md overflow-hidden border flex items-center justify-center bg-gray-50 h-64">
        <img 
          src={photo} 
          alt={alt} 
          className="max-w-full max-h-64 object-contain"
        />
      </div>
      <p className="text-xs text-center mt-2 text-gray-500">{description}</p>
    </div>
  );
};

export default PhotoTab;
