import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  onIntersect: () => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onIntersect();
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [onIntersect, options]);

  return ref;
}