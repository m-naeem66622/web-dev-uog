type UserRole = "admin" | "customer" | "seller";
export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  isVerified: boolean;
  role: UserRole;
};

export interface UserLocation {
  id: string;
  name: string;
  profession: string;
  latitude: number;
  longitude: number;
}

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  date: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  service: string;
  notes?: string;
}

export interface Review {
  id: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
}
