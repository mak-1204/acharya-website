
'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export const Logo = ({ className = "h-10 md:h-14", light = false }: LogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 240 70"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ACH */}
        <text
          x="5"
          y="40"
          className="font-bold fill-[#1A237E]"
          style={{ fontSize: '38px', fontFamily: 'Arial, sans-serif' }}
        >
          ACH
        </text>
        
        {/* Red Triangle/Delta */}
        <path
          d="M98 40L112 12L126 40H98Z"
          className="fill-[#D32F2F]"
        />
        <path
          d="M106 40L112 28L118 40H106Z"
          className="fill-white"
        />

        {/* ARYA */}
        <text
          x="130"
          y="40"
          className="font-bold fill-[#1A237E]"
          style={{ fontSize: '38px', fontFamily: 'Arial, sans-serif' }}
        >
          ARYA
        </text>

        {/* EDUCATION */}
        <text
          x="5"
          y="65"
          className="font-bold fill-[#1A237E]"
          style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif', letterSpacing: '4px' }}
        >
          EDUCATION
        </text>
      </svg>
    </div>
  );
};
