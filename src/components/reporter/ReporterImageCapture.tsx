
import { useState, useRef } from "react";
import { Camera, Upload, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReporterImageCaptureProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

const ReporterImageCapture = ({ imageUrl, onImageChange }: ReporterImageCaptureProps) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
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
        onImageChange(imageUrl);
        
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
          onImageChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full h-64 bg-gray-100 rounded-md overflow-hidden relative flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Captured issue" 
            className="w-full h-full object-contain"
          />
        ) : isCameraActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <Camera className="h-12 w-12 mb-2" />
            <span>Capture or upload an image of the issue</span>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex gap-2 flex-wrap">
        {!imageUrl && !isCameraActive && (
          <>
            <Button 
              type="button" 
              onClick={startCamera} 
              variant="outline"
            >
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload}
            />
          </>
        )}

        {isCameraActive && (
          <>
            <Button type="button" onClick={captureImage}>
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
            <Button type="button" variant="outline" onClick={stopCamera}>
              Cancel
            </Button>
          </>
        )}

        {imageUrl && (
          <Button type="button" variant="outline" onClick={resetImage}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReporterImageCapture;
