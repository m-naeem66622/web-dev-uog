import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface WorkerCardProps {
  name: string;
  profession: string;
  rating: number;
  location: string;
  imageUrl: string;
}

export const WorkerCard = ({
  name,
  profession,
  rating,
  location,
  imageUrl,
}: WorkerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-card rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-24 w-full bg-gradient-to-r from-primary/20 to-primary/10"></div>
      <div className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-background -mt-20 shadow-md transition-transform duration-300 group-hover:scale-105">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-primary font-medium">{profession}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <p className="text-sm text-muted-foreground">{location}</p>
          <Button
            className={cn(
              "w-full transition-all duration-300",
              isHovered ? "bg-primary hover:bg-primary/90" : ""
            )}
          >
            Hire Now
          </Button>
        </div>
      </div>
    </div>
  );
};
