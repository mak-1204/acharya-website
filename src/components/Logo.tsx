'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  light?: boolean;
}

/**
 * Renders the Acharya Education logo using the static PNG asset.
 * The height is controlled by the passed className (e.g., h-12).
 */
export const Logo = ({ className = "h-10 md:h-14", light = false }: LogoProps) => {
  return (
    <div className={`relative flex items-center ${className} aspect-[240/70]`}>
      <Image 
        src="/logo.png" 
        alt="Acharya Education Logo - Best Coaching Institute Madurai" 
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};
