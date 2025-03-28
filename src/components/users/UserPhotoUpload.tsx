
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserPhotoUploadProps {
  photoUrl: string;
  initials: string;
  onPhotoChange: (url: string) => void;
}

const UserPhotoUpload = ({ photoUrl, initials, onPhotoChange }: UserPhotoUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      onPhotoChange(tempUrl);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-24 w-24 cursor-pointer" onClick={handlePhotoClick}>
        <AvatarImage src={photoUrl} />
        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
      </Avatar>
      <div className="absolute bottom-0 right-0 rounded-full bg-primary p-1 cursor-pointer" onClick={handlePhotoClick}>
        <Upload className="h-4 w-4 text-white" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
      />
    </div>
  );
};

export default UserPhotoUpload;
