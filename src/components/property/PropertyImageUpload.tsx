
import { useRef } from "react";
import { Building } from "lucide-react";

interface PropertyImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

const PropertyImageUpload = ({ imageUrl, onImageChange }: PropertyImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      onImageChange(tempUrl);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div 
        className="h-40 w-full max-w-64 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        onClick={handleImageClick}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Property"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <Building className="h-12 w-12 mb-2" />
            <span className="text-sm">Click to upload image</span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default PropertyImageUpload;
