import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
  delay?: number;
  variant?: "card" | "minimal" | "bordered";
}

export const AnimatedTestimonial = ({
  quote,
  author,
  role,
  image,
  delay = 0,
  variant = "card",
}: TestimonialProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

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

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const renderTestimonial = () => {
    switch (variant) {
      case "minimal":
        return (
          <div className="relative">
            <Quote className="absolute -top-6 -left-6 h-12 w-12 text-primary/20" />
            <p className="text-lg italic mb-6">{quote}</p>
            <div className="flex items-center">
              <img
                src={image}
                alt={author}
                className={cn(
                  "w-12 h-12 rounded-full object-cover mr-4 border-2",
                  isVisible ? "border-primary" : "border-transparent",
                  "transition-all duration-700 delay-500"
                )}
              />
              <div>
                <p className="font-semibold">{author}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
              </div>
            </div>
          </div>
        );

      case "bordered":
        return (
          <div
            className={cn(
              "relative border rounded-lg overflow-hidden",
              "transition-colors duration-700",
              isVisible ? "border-primary/30" : "border-border"
            )}
          >
            <div
              className={cn(
                "absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 transition-all duration-1000",
                isVisible ? "w-full" : "w-0"
              )}
            ></div>
            <div className="p-8 relative">
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mb-6 flex items-center justify-center">
                <Quote className="h-8 w-8 text-primary" />
              </div>
              <p className="text-lg mb-6">{quote}</p>
              <div className="flex items-center">
                <img
                  src={image}
                  alt={author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{author}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "card":
      default:
        return (
          <div
            className={cn(
              "bg-card p-8 rounded-lg shadow-lg relative overflow-hidden group",
              "transition-all duration-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            )}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/5 rounded-full -translate-x-24 translate-y-24 group-hover:bg-primary/10 transition-colors duration-700"></div>

            <div className="relative z-10">
              <div
                className={cn(
                  "flex items-start space-x-4",
                  "transition-all duration-500",
                  isVisible ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: `${100 + delay}ms` }}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "absolute -inset-0.5 bg-gradient-to-tr from-primary to-primary/50 rounded-full blur-sm opacity-0",
                      "transition-opacity duration-700 delay-500",
                      isVisible && "opacity-70"
                    )}
                  ></div>
                  <img
                    src={image}
                    alt={author}
                    className="w-16 h-16 rounded-full object-cover relative"
                  />
                </div>
                <div>
                  <div
                    className={cn(
                      "bg-primary/10 rounded-lg p-2 px-4 inline-block mb-2",
                      "transition-all duration-700 delay-300",
                      isVisible ? "opacity-100" : "opacity-0 -translate-y-4"
                    )}
                  >
                    <p className="font-semibold">{author}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                  <p
                    className={cn(
                      "text-lg text-muted-foreground",
                      "transition-all duration-700 delay-500",
                      isVisible ? "opacity-100" : "opacity-0"
                    )}
                  >
                    "{quote}"
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "absolute bottom-4 right-4 text-primary/20 transition-all duration-700",
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                )}
              >
                <Quote size={40} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={testimonialRef}
      className="h-full"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {renderTestimonial()}
    </div>
  );
};
