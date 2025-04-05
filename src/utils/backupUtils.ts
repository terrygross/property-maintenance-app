
import { AES, enc } from 'crypto-js';

// Encryption key - in a real app, we'd use a proper key management system
// This is a simplified example
const ENCRYPTION_KEY = "maintenance-system-backup-key";

// Define the structure of our backup data
interface BackupData {
  version: string;
  timestamp: string;
  users: any[];
  properties: any[];
  jobs: any[];
  settings: Record<string, any>;
}

/**
 * Collects all data from localStorage for backup
 */
const collectBackupData = (): BackupData => {
  // Get data from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const properties = JSON.parse(localStorage.getItem("properties") || "[]");
  const jobs = JSON.parse(localStorage.getItem("reporterJobs") || "[]");
  
  // Collect all settings
  const settings: Record<string, any> = {};
  const settingsKeys = [
    "autoBackupEnabled", 
    "backupFrequency", 
    "backupRetention",
    "backupEncryption",
    "additionalStations"
  ];
  
  settingsKeys.forEach(key => {
    settings[key] = localStorage.getItem(key);
  });
  
  return {
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    users,
    properties,
    jobs,
    settings
  };
};

/**
 * Encrypts the backup data
 */
const encryptBackupData = (data: BackupData): string => {
  const jsonString = JSON.stringify(data);
  return AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
};

/**
 * Decrypts the backup data
 */
const decryptBackupData = (encryptedData: string): BackupData => {
  const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
  const decryptedString = bytes.toString(enc.Utf8);
  return JSON.parse(decryptedString);
};

/**
 * Exports all system data to a downloadable file
 */
export const exportData = async (): Promise<boolean> => {
  try {
    const backupData = collectBackupData();
    
    // Check if encryption is enabled
    const encryptionEnabled = localStorage.getItem("backupEncryption") !== "false";
    
    // Prepare data - either encrypted or plain JSON
    const fileContent = encryptionEnabled 
      ? encryptBackupData(backupData)
      : JSON.stringify(backupData, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `maintenance_backup_${date}.${encryptionEnabled ? 'bak' : 'json'}`;
    
    // Create and trigger download
    const a = document.createElement('a');
    a.download = filename;
    a.href = url;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    return true;
  } catch (error) {
    console.error("Error exporting data:", error);
    return false;
  }
};

/**
 * Imports system data from a backup file
 */
export const importData = async (file: File): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const fileContent = e.target?.result as string;
        let backupData: BackupData;
        
        // Try to parse as JSON first (unencrypted backup)
        try {
          backupData = JSON.parse(fileContent);
        } catch (parseError) {
          // If JSON parsing fails, try to decrypt (encrypted backup)
          try {
            backupData = decryptBackupData(fileContent);
          } catch (decryptError) {
            throw new Error("Invalid backup file format");
          }
        }
        
        // Validate backup data structure
        if (!backupData.version || !backupData.timestamp) {
          throw new Error("Invalid backup file structure");
        }
        
        // Restore all data
        if (backupData.users) {
          localStorage.setItem("users", JSON.stringify(backupData.users));
        }
        
        if (backupData.properties) {
          localStorage.setItem("properties", JSON.stringify(backupData.properties));
        }
        
        if (backupData.jobs) {
          localStorage.setItem("reporterJobs", JSON.stringify(backupData.jobs));
        }
        
        // Restore settings
        if (backupData.settings) {
          Object.entries(backupData.settings).forEach(([key, value]) => {
            if (value !== null) {
              localStorage.setItem(key, value);
            }
          });
        }
        
        // Set last restore date
        localStorage.setItem("lastRestoreDate", new Date().toISOString());
        
        resolve(true);
      } catch (error) {
        console.error("Error importing data:", error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Upload backup to cloud storage (placeholder for future implementation)
 */
export const uploadToCloudStorage = async (provider: string): Promise<boolean> => {
  // This would be implemented when actual cloud provider APIs are integrated
  console.log(`Upload to ${provider} would happen here`);
  return true;
};

/**
 * Download backup from cloud storage (placeholder for future implementation)
 */
export const downloadFromCloudStorage = async (provider: string): Promise<boolean> => {
  // This would be implemented when actual cloud provider APIs are integrated
  console.log(`Download from ${provider} would happen here`);
  return true;
};
