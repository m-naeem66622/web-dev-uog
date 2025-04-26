type UserRole = "admin" | "customer" | "seller";
export type User = {
  id: number;
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
