import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
}

/**
 * A custom hook to handle responsive behavior
 * @param breakpoint - The breakpoint in pixels where mobile view starts (default: 768)
 * @returns An object containing responsive state (isMobile)
 */
const useResponsive = (breakpoint: number = 768): ResponsiveState => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return { isMobile };
};

export default useResponsive;
