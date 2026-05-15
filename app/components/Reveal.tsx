"use client";

import {
  useEffect,
  useRef,
  ReactNode,
  CSSProperties,
  ElementType,
} from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  direction?: "up" | "left" | "right";
  delay?: 0 | 1 | 2 | 3 | 4 | 5;
  as?: ElementType;
  threshold?: number;
}

export default function Reveal({
  children,
  className = "",
  style,
  direction = "up",
  delay = 0,
  as: Tag = "div",
  threshold = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-in");
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const dirClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
        ? "reveal-right"
        : "reveal";

  const delayClass = delay > 0 ? `reveal-d${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`${dirClass} ${delayClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
