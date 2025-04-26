import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  variant?: "default" | "centered" | "underline" | "gradient" | "split";
  titleColor?: "default" | "primary" | "gradient";
}

export const SectionTitle = ({
  title,
  subtitle,
  className,
  variant = "default",
  titleColor = "default",
}: SectionTitleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTitleColorClass = () => {
    switch (titleColor) {
      case "primary":
        return "text-primary";
      case "gradient":
        return "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70";
      case "default":
      default:
        return "";
    }
  };

  const renderTitle = () => {
    switch (variant) {
      case "split":
        return (
          <div className="flex flex-col items-center">
            <div className="relative overflow-hidden">
              {title.split(" ").map((word, i) => (
                <span
                  key={i}
                  className={cn(
                    "inline-block mx-1 transition-all duration-700",
                    getTitleColorClass(),
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                  )}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        );

      case "gradient":
        return (
          <h2
            className={cn(
              "text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70",
              "transition-all duration-700",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
          >
            {title}
          </h2>
        );

      case "underline":
        return (
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold relative inline-block",
              getTitleColorClass(),
              "transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            {title}
            <div
              className={cn(
                "h-1 bg-primary mt-2 transition-all duration-700 delay-500",
                isVisible ? "w-full opacity-100" : "w-0 opacity-0"
              )}
            ></div>
          </h2>
        );

      case "centered":
      case "default":
      default:
        return (
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold",
              getTitleColorClass(),
              "transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0 translate-y-4"
            )}
          >
            {title}
          </h2>
        );
    }
  };

  return (
    <div ref={titleRef} className={cn("text-center mb-16", className)}>
      {renderTitle()}

      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground mt-6 max-w-2xl mx-auto transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0 translate-y-4"
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative elements */}
      {variant === "default" && (
        <div className="flex items-center justify-center mt-6">
          <div
            className={cn(
              "h-0.5 w-12 bg-primary/30 transition-all duration-700 delay-400",
              isVisible ? "opacity-100" : "opacity-0 translate-x-4"
            )}
          ></div>
          <div
            className={cn(
              "h-2 w-2 bg-primary mx-2 rounded-full transition-all duration-700 delay-500",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            )}
          ></div>
          <div
            className={cn(
              "h-0.5 w-12 bg-primary/30 transition-all duration-700 delay-400",
              isVisible ? "opacity-100" : "opacity-0 -translate-x-4"
            )}
          ></div>
        </div>
      )}
    </div>
  );
};
