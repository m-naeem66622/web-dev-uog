import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const ServiceCard = ({
  title,
  description,
  icon: Icon,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg",
        isHovered ? "bg-primary/5 border-primary/20" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={cn(
            "rounded-full p-3 transition-all duration-300",
            isHovered ? "bg-primary text-white" : "bg-primary/10"
          )}
        >
          <Icon
            className={cn(
              "h-8 w-8 transition-all",
              isHovered ? "text-white" : "text-primary"
            )}
          />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>

        <div
          className={cn(
            "mt-2 w-0 h-1 bg-primary transition-all duration-300 rounded-full",
            isHovered ? "w-1/3" : ""
          )}
        ></div>
      </div>
    </div>
  );
};
