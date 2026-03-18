
import React from 'react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-primary text-white py-2 overflow-hidden relative z-[60]">
      <div className="announcement-ticker text-sm font-semibold tracking-wide">
        <div className="flex items-center space-x-12">
          <span>🎉 New Batches Starting June 2025 | CLAT & CUET Weekend Programme | Call 9865440099 / 8870440099</span>
          <span>🚀 Admissions Open for JEE & NEET 2026 Integrated Programs | Visit our Madurai Center</span>
          <span>🏆 Acharya Excellence Scholarship Test (AEST) Registration Now Open | Up to 100% Scholarship</span>
          <span>📚 Quality Study Material & Test Series for 2025-26 Academic Year | Inquire Today</span>
        </div>
      </div>
    </div>
  );
};
