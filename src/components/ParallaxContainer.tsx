
import React, { useState, useEffect, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  className = "",
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const transformValue = isMobile ? 0 : scrollPosition * speed;

  return (
    <div
      className={`parallax-content ${className} ${isMobile ? "parallax-disabled" : ""}`}
      style={{
        transform: `translateY(${transformValue}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;
