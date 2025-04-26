import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface AnimatedFAQProps {
  items: FAQItem[];
  className?: string;
}

export const AnimatedFAQ = ({ items, className }: AnimatedFAQProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const faqRef = useRef<HTMLDivElement>(null);

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

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleAccordionChange = (value: string) => {
    setActiveItem(value === activeItem ? null : value);
  };

  return (
    <div ref={faqRef} className={cn("max-w-3xl mx-auto relative", className)}>
      {/* Decorative background elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-70 z-0"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl opacity-70 z-0"></div>

      <Accordion
        type="single"
        collapsible
        className="w-full relative z-10"
        value={activeItem || undefined}
        onValueChange={handleAccordionChange}
      >
        {items.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={cn(
              "overflow-hidden transition-all duration-700 border-b",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10",
              activeItem === `item-${index}`
                ? "bg-primary/5 rounded-lg my-2"
                : ""
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <AccordionTrigger
              className={cn(
                "hover:text-primary transition-all py-6 text-lg px-4",
                activeItem === `item-${index}` ? "font-medium text-primary" : ""
              )}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <div className="pt-2 pb-6 px-4">{faq.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Decorative elements */}
      <div
        className={cn(
          "h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-8",
          "transition-all duration-1000 delay-500",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      ></div>

      {/* Animated dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "w-3 h-3 rounded-full bg-primary/30 transition-all",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{
              transitionDelay: `${i * 200 + 800}ms`,
              animation: isVisible
                ? `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
                : "none",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
