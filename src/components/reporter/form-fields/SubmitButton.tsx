
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { AlertTriangle } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  const { watch } = useFormContext();
  const isHighPriority = watch("highPriority");

  return (
    <div className="pt-2">
      <Button 
        type="submit" 
        className={`w-full ${isHighPriority ? 'bg-red-600 hover:bg-red-700' : ''}`}
        disabled={isSubmitting}
      >
        {isHighPriority && <AlertTriangle className="h-4 w-4 mr-1" />}
        {isSubmitting ? "Submitting..." : isHighPriority ? "Submit Urgent Report" : "Submit Report"}
      </Button>
    </div>
  );
};

export default SubmitButton;
