"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { UserLocation } from "@/types/user";
import { UserCard } from "../molecules/UserMapCard";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapSectionProps {
  users: UserLocation[];
}

// Fix for default marker icons
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export function MapSection({ users }: MapSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] relative">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {users.map((user) => (
          <Marker
            key={user.id}
            position={[user.latitude, user.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <UserCard user={user} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
