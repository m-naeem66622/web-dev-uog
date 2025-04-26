import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  className,
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

  return (
    <div ref={titleRef} className={cn("text-center mb-12", className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold relative inline-block transition-all duration-700",
          isVisible ? "opacity-100" : "opacity-0 translate-y-4"
        )}
      >
        {title}
        <div
          className={cn(
            "h-1 bg-primary mt-2 transition-all duration-700 delay-300",
            isVisible ? "w-1/2 opacity-100" : "w-0 opacity-0"
          )}
        ></div>
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground mt-4 max-w-2xl mx-auto transition-all duration-700 delay-200",
            isVisible ? "opacity-100" : "opacity-0 translate-y-4"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
