
import React from "react";
import { ThemeSettings } from "@/hooks/settings/useSystemSettings";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Sun,
  Moon,
  Monitor,
  Circle
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useTheme } from "next-themes";

interface ThemeSettingsTabProps {
  settings: ThemeSettings;
  updateSettings: (values: Partial<ThemeSettings>) => void;
}

const ThemeSettingsTab = ({ settings, updateSettings }: ThemeSettingsTabProps) => {
  const { setTheme } = useTheme();
  const [showPreview, setShowPreview] = React.useState(true);

  const handleModeChange = (value: 'light' | 'dark' | 'system') => {
    updateSettings({ mode: value });
    setTheme(value);
  };

  const handleColorChange = (colorType: keyof ThemeSettings['colors'], value: string) => {
    updateSettings({
      colors: {
        ...settings.colors,
        [colorType]: value
      }
    });
  };

  const handleBorderRadiusChange = (value: 'small' | 'medium' | 'large') => {
    updateSettings({ borderRadius: value });
  };

  // Function to generate preview CSS variable style based on current settings
  const getPreviewStyle = () => {
    return {
      backgroundColor: settings.colors.primary,
      borderColor: settings.colors.border,
      color: '#ffffff',
      borderRadius: {
        small: '0.25rem',
        medium: '0.5rem',
        large: '1rem',
      }[settings.borderRadius],
      padding: '0.5rem 1rem',
      border: `1px solid ${settings.colors.border}`,
      transition: 'all 0.2s ease-in-out',
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theme Mode</h3>
        <p className="text-sm text-muted-foreground">
          Choose between light, dark, or system preference
        </p>
      </div>
      
      <Separator />
      
      <RadioGroup
        value={settings.mode}
        onValueChange={(value) => handleModeChange(value as 'light' | 'dark' | 'system')}
        className="grid grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem
            value="light"
            id="theme-light"
            className="peer sr-only"
          />
          <Label
            htmlFor="theme-light"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Sun className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Light</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="dark"
            id="theme-dark"
            className="peer sr-only"
          />
          <Label
            htmlFor="theme-dark"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary dark:bg-gray-950 dark:hover:bg-gray-900 dark:border-gray-800"
          >
            <Moon className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Dark</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="system"
            id="theme-system"
            className="peer sr-only"
          />
          <Label
            htmlFor="theme-system"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Monitor className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">System</span>
          </Label>
        </div>
      </RadioGroup>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Color Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize the color scheme for your application
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              id="primaryColor"
              value={settings.colors.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              value={settings.colors.primary}
              onChange={(e) => handleColorChange("primary", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Secondary Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              id="secondaryColor"
              value={settings.colors.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              value={settings.colors.secondary}
              onChange={(e) => handleColorChange("secondary", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accentColor">Accent Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              id="accentColor"
              value={settings.colors.accent}
              onChange={(e) => handleColorChange("accent", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              value={settings.colors.accent}
              onChange={(e) => handleColorChange("accent", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="borderColor">Border Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              id="borderColor"
              value={settings.colors.border}
              onChange={(e) => handleColorChange("border", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              value={settings.colors.border}
              onChange={(e) => handleColorChange("border", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="buttonColor">Button Color</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              id="buttonColor"
              value={settings.colors.button}
              onChange={(e) => handleColorChange("button", e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              value={settings.colors.button}
              onChange={(e) => handleColorChange("button", e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Border Radius</h3>
        <p className="text-sm text-muted-foreground">
          Set the roundness of UI elements
        </p>
      </div>
      
      <Separator />
      
      <RadioGroup
        value={settings.borderRadius}
        onValueChange={(value) => handleBorderRadiusChange(value as 'small' | 'medium' | 'large')}
        className="grid grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem
            value="small"
            id="radius-small"
            className="peer sr-only"
          />
          <Label
            htmlFor="radius-small"
            className="flex flex-col items-center justify-between rounded-sm border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Circle className="h-6 w-6 mb-2 rounded-sm" />
            <span className="text-sm font-medium">Small</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="medium"
            id="radius-medium"
            className="peer sr-only"
          />
          <Label
            htmlFor="radius-medium"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Circle className="h-6 w-6 mb-2 rounded-md" />
            <span className="text-sm font-medium">Medium</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem
            value="large"
            id="radius-large"
            className="peer sr-only"
          />
          <Label
            htmlFor="radius-large"
            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Circle className="h-6 w-6 mb-2 rounded-lg" />
            <span className="text-sm font-medium">Large</span>
          </Label>
        </div>
      </RadioGroup>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Preview</h3>
        <p className="text-sm text-muted-foreground mb-4">
          See how your theme settings will appear
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Theme Preview</CardTitle>
          <CardDescription>This is how your components will look with the current settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button 
              type="button" 
              style={{
                backgroundColor: settings.colors.primary,
                color: '#ffffff',
                borderRadius: {
                  small: '0.25rem',
                  medium: '0.5rem',
                  large: '1rem',
                }[settings.borderRadius],
                padding: '0.5rem 1rem',
                border: 'none',
              }}
            >
              Primary Button
            </button>
            
            <button 
              type="button" 
              style={{
                backgroundColor: settings.colors.secondary,
                color: '#ffffff',
                borderRadius: {
                  small: '0.25rem',
                  medium: '0.5rem',
                  large: '1rem',
                }[settings.borderRadius],
                padding: '0.5rem 1rem',
                border: 'none',
              }}
            >
              Secondary Button
            </button>
            
            <button 
              type="button" 
              style={{
                backgroundColor: 'transparent',
                color: settings.colors.primary,
                borderRadius: {
                  small: '0.25rem',
                  medium: '0.5rem',
                  large: '1rem',
                }[settings.borderRadius],
                padding: '0.5rem 1rem',
                border: `1px solid ${settings.colors.border}`,
              }}
            >
              Outline Button
            </button>
          </div>
          
          <div 
            style={{
              backgroundColor: settings.colors.accent,
              color: '#ffffff',
              borderRadius: {
                small: '0.25rem',
                medium: '0.5rem',
                large: '1rem',
              }[settings.borderRadius],
              padding: '1rem',
              border: `1px solid ${settings.colors.border}`,
            }}
          >
            This is an accent container element
          </div>
          
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '9999px',
                backgroundColor: settings.colors.primary,
              }}
            />
            <div>
              <div className="font-medium">Primary Color</div>
              <div className="text-sm text-muted-foreground">{settings.colors.primary}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettingsTab;
