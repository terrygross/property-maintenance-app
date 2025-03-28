
export interface CallOut {
  id: string;
  userId: string;
  date: Date;
}

// Mock call-out schedule data
export const mockCallOutData: CallOut[] = [
  { id: "1", userId: "1", date: new Date(2023, 11, 20) },
  { id: "2", userId: "3", date: new Date(2023, 11, 21) },
  { id: "3", userId: "2", date: new Date(2023, 11, 22) },
  { id: "4", userId: "5", date: new Date(2023, 11, 23) },
];
