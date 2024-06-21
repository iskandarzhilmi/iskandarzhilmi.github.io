import { useEffect, useRef, useState } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [React.RefObject<any>, boolean] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (options.triggerOnce && entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible];
}

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animationClass: string;
}

function AnimatedElement({
  children,
  className,
  style,
  animationClass,
}: AnimatedElementProps) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={`${className || ""} ${
        isVisible ? animationClass : "opacity-0"
      }`}
      style={{
        ...style,
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      {children}
    </div>
  );
}
