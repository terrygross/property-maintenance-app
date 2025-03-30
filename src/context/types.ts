
import { Property } from '@/types/property';
import { User } from '@/types/user';

// Define the shape of our application state
export interface AppState {
  properties: Property[];
  users: User[];
  reporterStations: number;
  additionalStations: number;
  currentUser: User | null;  // Add currentUser property
  updateProperty: (property: Property) => void;
  addProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  updateUser: (user: User) => void;
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
  updateAdditionalStations: (count: number) => void;
}
