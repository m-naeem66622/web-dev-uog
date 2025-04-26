import { useState, useEffect } from "react";
import { UserLocation } from "@/types/user";

export function useUserLocations() {
  const [users, setUsers] = useState<UserLocation[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: "1", name: "John Doe", profession: "Electrician", latitude: 37.7749, longitude: -122.4194 },
        { id: "2", name: "Jane Smith", profession: "Plumber", latitude: 34.0522, longitude: -118.2437 },
      ]);
    }, 500);
  }, []);

  return { users };
}
