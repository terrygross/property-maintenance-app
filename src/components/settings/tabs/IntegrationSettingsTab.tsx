
import React from "react";
import { IntegrationSettings } from "@/hooks/settings/useSystemSettings";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, X, EyeOff, Eye } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface IntegrationSettingsTabProps {
  settings: IntegrationSettings;
  updateSettings: (values: Partial<IntegrationSettings>) => void;
}

const IntegrationSettingsTab = ({ settings, updateSettings }: IntegrationSettingsTabProps) => {
  const [showApiKeys, setShowApiKeys] = React.useState<Record<string, boolean>>({});

  const toggleShowApiKey = (apiKeyName: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [apiKeyName]: !prev[apiKeyName]
    }));
  };

  const handleEmailServerChange = (field: keyof IntegrationSettings['emailServer'], value: string | boolean | number) => {
    updateSettings({
      emailServer: {
        ...settings.emailServer,
        [field]: field === 'port' ? Number(value) : value
      }
    });
  };

  const handleSmsGatewayChange = (field: keyof IntegrationSettings['smsGateway'], value: string) => {
    updateSettings({
      smsGateway: {
        ...settings.smsGateway,
        [field]: value
      }
    });
  };

  const handleApiKeyChange = (index: number, field: keyof IntegrationSettings['thirdPartyApiKeys'][0], value: string) => {
    const newApiKeys = [...settings.thirdPartyApiKeys];
    newApiKeys[index] = { ...newApiKeys[index], [field]: value };
    updateSettings({ thirdPartyApiKeys: newApiKeys });
  };

  const addApiKey = () => {
    updateSettings({
      thirdPartyApiKeys: [...settings.thirdPartyApiKeys, { name: "New API", key: "" }]
    });
  };

  const removeApiKey = (index: number) => {
    updateSettings({
      thirdPartyApiKeys: settings.thirdPartyApiKeys.filter((_, i) => i !== index)
    });
  };

  const handleExportFormatChange = (format: string) => {
    const newFormats = settings.exportFormats.includes(format)
      ? settings.exportFormats.filter(f => f !== format)
      : [...settings.exportFormats, format];
    
    updateSettings({ exportFormats: newFormats });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email Server Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Configure SMTP server settings for sending emails
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emailHost">SMTP Host</Label>
          <Input
            id="emailHost"
            value={settings.emailServer.host}
            onChange={(e) => handleEmailServerChange("host", e.target.value)}
            placeholder="smtp.example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emailPort">SMTP Port</Label>
          <Input
            id="emailPort"
            type="number"
            value={settings.emailServer.port}
            onChange={(e) => handleEmailServerChange("port", e.target.value)}
            placeholder="587"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emailUsername">SMTP Username</Label>
          <Input
            id="emailUsername"
            value={settings.emailServer.username}
            onChange={(e) => handleEmailServerChange("username", e.target.value)}
            placeholder="notifications@example.com"
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-8">
          <Switch
            id="emailSsl"
            checked={settings.emailServer.useSsl}
            onCheckedChange={(value) => handleEmailServerChange("useSsl", value)}
          />
          <Label htmlFor="emailSsl">Use SSL/TLS</Label>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-6">SMS Gateway</h3>
        <p className="text-sm text-muted-foreground">
          Configure SMS gateway settings for sending text notifications
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="smsProvider">SMS Provider</Label>
          <Select
            value={settings.smsGateway.provider}
            onValueChange={(value) => handleSmsGatewayChange("provider", value)}
          >
            <SelectTrigger id="smsProvider">
              <SelectValue placeholder="Select SMS provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Twilio">Twilio</SelectItem>
              <SelectItem value="MessageBird">MessageBird</SelectItem>
              <SelectItem value="Vonage">Vonage</SelectItem>
              <SelectItem value="AWS SNS">AWS SNS</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="smsSenderId">Sender ID</Label>
          <Input
            id="smsSenderId"
            value={settings.smsGateway.senderId}
            onChange={(e) => handleSmsGatewayChange("senderId", e.target.value)}
            placeholder="Maintenance"
          />
        </div>
        
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="smsApiKey">API Key</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="smsApiKey"
              type={showApiKeys.sms ? "text" : "password"}
              value={settings.smsGateway.apiKey}
              onChange={(e) => handleSmsGatewayChange("apiKey", e.target.value)}
              placeholder="Enter your SMS gateway API key"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleShowApiKey('sms')}
              type="button"
            >
              {showApiKeys.sms ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            The API key is stored in your browser and is not sent to our servers.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Third-Party API Credentials</h3>
        <p className="text-sm text-muted-foreground">
          Configure credentials for external service integrations
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        {settings.thirdPartyApiKeys.map((apiKey, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor={`apiName-${index}`}>API Name</Label>
                <Input
                  id={`apiName-${index}`}
                  value={apiKey.name}
                  onChange={(e) => handleApiKeyChange(index, "name", e.target.value)}
                  placeholder="API Name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`apiKey-${index}`}>API Key</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id={`apiKey-${index}`}
                    type={showApiKeys[apiKey.name] ? "text" : "password"}
                    value={apiKey.key}
                    onChange={(e) => handleApiKeyChange(index, "key", e.target.value)}
                    placeholder="Enter your API key"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleShowApiKey(apiKey.name)}
                    type="button"
                  >
                    {showApiKeys[apiKey.name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="mt-8"
              onClick={() => removeApiKey(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button variant="outline" size="sm" onClick={addApiKey}>
          <Plus className="h-4 w-4 mr-2" />
          Add API Key
        </Button>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mt-6">Data Export Formats</h3>
        <p className="text-sm text-muted-foreground">
          Select available formats for exporting data
        </p>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["CSV", "PDF", "JSON", "Excel", "XML", "Text"].map((format) => (
          <div key={format} className="flex items-center space-x-2">
            <Checkbox
              id={`format-${format}`}
              checked={settings.exportFormats.includes(format)}
              onCheckedChange={() => handleExportFormatChange(format)}
            />
            <Label htmlFor={`format-${format}`}>{format}</Label>
          </div>
        ))}
      </div>
      
      <div className="pt-4">
        <Badge variant="outline" className="mr-1">Note</Badge>
        <span className="text-sm text-muted-foreground">
          API keys and credentials are stored locally in your browser for security.
        </span>
      </div>
    </div>
  );
};

export default IntegrationSettingsTab;
