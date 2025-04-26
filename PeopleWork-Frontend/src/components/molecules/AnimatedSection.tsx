import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom";
  bgColor?: "default" | "primary" | "gradient" | "pattern";
  id?: string; // Added ID prop
}

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = "fade",
  bgColor = "default",
  id, // Accept the ID prop
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case "slide-up":
          return "translate-y-20 opacity-0";
        case "slide-down":
          return "-translate-y-20 opacity-0";
        case "slide-left":
          return "translate-x-20 opacity-0";
        case "slide-right":
          return "-translate-x-20 opacity-0";
        case "zoom":
          return "scale-95 opacity-0";
        case "fade":
        default:
          return "opacity-0";
      }
    }
    return "translate-y-0 translate-x-0 scale-100 opacity-100";
  };

  const getBgColorClass = () => {
    switch (bgColor) {
      case "primary":
        return "bg-primary/5";
      case "gradient":
        return "bg-gradient-to-b from-background to-primary/5";
      case "pattern":
        return "bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[length:20px_20px]";
      case "default":
      default:
        return "bg-background";
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id} // Apply the ID
      className={cn("py-20 overflow-hidden", getBgColorClass(), className)}
    >
      <div
        className={cn(
          "container px-4 transition-all duration-1000",
          getAnimationClass()
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </section>
  );
};
