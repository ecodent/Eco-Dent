"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroSliderProps {
  images: string[];
}

export default function HeroSlider({ images }: HeroSliderProps) {
  // Start at -1 (nothing visible) — static first image from server is shown instead.
  // After first interval, switch to image index 1, then cycle.
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="ECODENT Dental Clinic"
          fill
          className="object-cover"
          loading="lazy"
          sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 35vw, 100vw"
          quality={85}
          style={{
            opacity: current === i ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </>
  );
}
