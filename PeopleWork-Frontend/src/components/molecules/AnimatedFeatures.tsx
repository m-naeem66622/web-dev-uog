import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AnimatedFeatureProps {
  icon: LucideIcon;
  title: string;
  text: string;
  delay?: number;
  variant?: "left" | "right" | "up" | "zoom";
}

export const AnimatedFeature = ({
  icon: Icon,
  title,
  text,
  delay = 0,
  variant = "up",
}: AnimatedFeatureProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getInitialTransform = () => {
    switch (variant) {
      case "left":
        return "translate-x-20 opacity-0";
      case "right":
        return "-translate-x-20 opacity-0";
      case "zoom":
        return "scale-50 opacity-0";
      case "up":
      default:
        return "translate-y-20 opacity-0";
    }
  };

  return (
    <div
      ref={featureRef}
      className={cn(
        "text-center transition-all duration-1000",
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : getInitialTransform()
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="rounded-full bg-gradient-to-br from-primary/80 to-primary/30 p-5 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
        <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shine_1.5s_ease-in-out]"></div>
        <Icon className="w-10 h-10 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform duration-300" />
      </div>

      <h3 className="text-xl font-bold mb-3 relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </h3>

      <p className="text-muted-foreground">{text}</p>
    </div>
  );
};
