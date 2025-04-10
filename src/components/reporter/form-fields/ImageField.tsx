
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

interface ImageFieldProps {
  imageUrl: string | undefined;
  setShowCamera: (show: boolean) => void;
}

const ImageField = ({ imageUrl, setShowCamera }: ImageFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>Add a Photo</Label>
      {imageUrl ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Captured" 
                className="w-full h-auto" 
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="absolute bottom-2 right-2"
                onClick={() => setShowCamera(true)}
              >
                Retake
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-32 flex flex-col items-center justify-center gap-2"
          onClick={() => setShowCamera(true)}
        >
          <Camera className="h-6 w-6" />
          <span>Take Photo</span>
        </Button>
      )}
    </div>
  );
};

export default ImageField;
