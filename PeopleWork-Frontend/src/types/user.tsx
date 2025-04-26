type UserRole = "admin" | "customer" | "seller";
export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  isVerified: boolean;
  role: UserRole;
};
