"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroSliderProps {
  images: string[];
}

export default function HeroSlider({ images }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
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
          sizes="55vw"
          style={{
            opacity: current === i ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </>
  );
}
