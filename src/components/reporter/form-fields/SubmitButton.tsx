
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { AlertTriangle } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  const { watch, formState } = useFormContext();
  const isHighPriority = watch("highPriority");
  const { isValid } = formState;

  return (
    <div className="pt-2">
      <Button 
        type="submit" 
        className={`w-full ${isHighPriority ? 'bg-red-600 hover:bg-red-700' : ''}`}
        disabled={isSubmitting || !isValid}
      >
        {isHighPriority && <AlertTriangle className="h-4 w-4 mr-1" />}
        {isSubmitting ? "Submitting..." : isHighPriority ? "Submit Urgent Report" : "Submit Report"}
      </Button>
      {!isValid && (
        <p className="text-sm text-red-500 mt-2 text-center">
          Please fill in all required fields correctly
        </p>
      )}
    </div>
  );
};

export default SubmitButton;
