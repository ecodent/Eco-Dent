"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroSliderProps {
  images: string[];
}

export default function HeroSlider({ images }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

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
          priority={i === 0}
          sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 35vw, 100vw"
          quality={85}
          style={{
            opacity: current === i ? 1 : 0,
            transition: i === 0 ? "none" : "opacity 1s ease-in-out",
          }}
        />
      ))}
    </>
  );
}
