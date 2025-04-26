import { Card, CardContent } from "@/components/ui/card";
import { UserLocation } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, ExternalLink } from "lucide-react";

interface UserCardProps {
  user: UserLocation;
}

export function UserCard({ user }: UserCardProps) {
  // Generate initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="w-64 overflow-hidden border border-border hover:shadow-md transition-all duration-300">
      <div className="bg-gradient-to-r from-primary/80 to-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-background text-primary flex items-center justify-center text-lg font-bold border-2 border-background">
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-background">{user.name}</h3>
            <p className="text-xs text-background/80">
              {user?.location || "Location unavailable"}
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{user.profession}</span>
        </div>

        {user.skills && (
          <div className="flex flex-wrap gap-1.5">
            {user.skills.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {user.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{user.skills.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1 text-xs h-8"
          >
            <Mail className="h-3 w-3" />
            Contact
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-1 text-xs h-8"
          >
            <ExternalLink className="h-3 w-3" />
            Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
