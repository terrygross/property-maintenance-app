
import React from "react";
import { Camera } from "lucide-react";

const NoPhotosPlaceholder: React.FC = () => {
  return (
    <div className="text-center py-8 bg-gray-50 rounded-lg">
      <Camera className="mx-auto h-8 w-8 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">No photos available</p>
    </div>
  );
};

export default NoPhotosPlaceholder;
