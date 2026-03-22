"use client";

import { useState } from "react";

type ParallaxLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function ParallaxLink({
  href,
  children,
  className,
  style,
}: ParallaxLinkProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) * 0.3;
    const y = (e.clientY - centerY) * 0.3;

    setPosition({ x, y });
  };

  return (
    <a
      href={href}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <span
        className="inline-block transition-transform duration-100 ease-out"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {children}
      </span>
    </a>
  );
}
