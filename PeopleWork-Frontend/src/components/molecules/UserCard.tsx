"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { UserLocation } from "@/types/user";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "./Rating";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

interface UserCardProps {
  user: UserLocation;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="w-full bg-card text-card-foreground shadow hover:shadow-md transition-all duration-200 rounded-lg overflow-hidden border-muted/60 hover:border-primary/20">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar
          src={`/avatars/${user.id}.jpg`}
          fallback={<span>{user.name.substring(0, 2).toUpperCase()}</span>}
          alt={user.name}
          className="w-14 h-14 ring-2 ring-offset-2 ring-primary/10"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold leading-none">{user.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{user.profession}</p>
        </div>
      </CardHeader>

      <CardContent className="pt-2 pb-3 space-y-3">
        <div className="text-sm text-muted-foreground flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span>{user.latitude.toFixed(3)}, {user.longitude.toFixed(3)}</span>
        </div>

        {/* Rating with improved styling */}
        <div className="flex items-center space-x-2">
          <Rating value={4} /> {/* Example rating */}
          <span className="text-sm font-medium text-amber-600">
            4.5
          </span>
          <span className="text-xs text-muted-foreground">
            (20 reviews)
          </span>
        </div>

        {/* Description with better styling */}
        <p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 italic">
          Expert in residential wiring and emergency repairs. Available for
          quick consultations.
        </p>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-1 pb-3 px-4 border-t border-border/40">
        <span className="text-sm flex items-center gap-1.5 text-emerald-600">
          <Clock className="h-3.5 w-3.5" />
          <span className="font-medium">Available</span>
        </span>
        <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
