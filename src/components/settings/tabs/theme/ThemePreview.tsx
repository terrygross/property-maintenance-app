
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { type ThemeFormValues } from "./themeFormSchema";

export function ThemePreview() {
  const { watch } = useFormContext<ThemeFormValues>();
  
  // Get preview class names based on form values
  const getPreviewClasses = () => {
    const borderRadiusClasses = {
      none: "rounded-none",
      small: "rounded",
      medium: "rounded-md",
      large: "rounded-lg",
    };
    
    return `${borderRadiusClasses[watch("borderRadius")]}`;
  };

  return (
    <div className="pt-4 border-t">
      <h3 className="text-lg font-medium mb-4">Preview</h3>
      <div className="flex items-center justify-center p-6 bg-background border rounded-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            <Button
              style={{ 
                backgroundColor: watch("primaryColor"),
                color: "#ffffff"
              }}
              className={getPreviewClasses()}
            >
              Primary Button
            </Button>
            <Button
              variant="outline"
              className={getPreviewClasses()}
              style={{ 
                borderColor: watch("accentColor"),
                color: watch("accentColor"),
                borderWidth: "1px"
              }}
            >
              Secondary Button
            </Button>
          </div>
          <div
            className={`bg-card p-4 border shadow-sm ${getPreviewClasses()}`}
            style={{ 
              borderColor: watch("accentColor") + "33",
              borderWidth: "1px"
            }}
          >
            <h4 className="font-medium mb-2">Sample Card</h4>
            <p className="text-sm text-muted-foreground">
              This is how cards will appear with your selected theme options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
