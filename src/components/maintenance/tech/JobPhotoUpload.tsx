
import { useState, useRef } from "react";
import { Camera, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface JobPhotoUploadProps {
  jobId: string;
  label: string;
  onPhotoCapture: (jobId: string, type: "before" | "after", imageUrl: string) => void;
  photoType: "before" | "after";
  existingImage?: string;
}

const JobPhotoUpload = ({ 
  jobId, 
  label, 
  onPhotoCapture, 
  photoType,
  existingImage 
}: JobPhotoUploadProps) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please make sure you've granted permission or upload an image instead.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to image URL
        const imageUrl = canvas.toDataURL('image/jpeg');
        onPhotoCapture(jobId, photoType, imageUrl);
        
        // Stop camera after capturing
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotoCapture(jobId, photoType, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center gap-2">
          {existingImage ? (
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setShowImagePreview(true)}
              >
                <ImageIcon className="mr-1 h-4 w-4" />
                View {label}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-1 h-4 w-4" />
                Replace
              </Button>
            </div>
          ) : (
            <>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={startCamera}
              >
                <Camera className="mr-1 h-4 w-4" />
                Take {label}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-1 h-4 w-4" />
                Upload {label}
              </Button>
            </>
          )}
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Camera dialog */}
      <Dialog open={isCameraActive} onOpenChange={(open) => !open && stopCamera()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Take {label}</DialogTitle>
          </DialogHeader>
          <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <Button type="button" onClick={captureImage}>
            <Camera className="mr-2 h-4 w-4" />
            Capture
          </Button>
        </DialogContent>
      </Dialog>

      {/* Image preview dialog */}
      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
          </DialogHeader>
          <div className="w-full rounded-md overflow-hidden flex justify-center">
            <img 
              src={existingImage} 
              alt={`${label} photo`}
              className="max-h-96 object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobPhotoUpload;
