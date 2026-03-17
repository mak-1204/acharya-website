"use client";

import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, MapPin, Calendar } from 'lucide-react';

const STATS = [
  { label: 'Students Trained', value: 50000, suffix: '+', icon: <Users className="w-8 h-8" /> },
  { label: 'Teachers Benefited', value: 300, suffix: '+', icon: <GraduationCap className="w-8 h-8" /> },
  { label: 'Academic Centres', value: 7, suffix: '+', icon: <MapPin className="w-8 h-8" /> },
  { label: 'Years of Excellence', value: 17, suffix: '+', icon: <Calendar className="w-8 h-8" /> },
];

export const ImpactCounter = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 shadow-sm border border-border">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-secondary flex items-center justify-center">
                {stat.value.toLocaleString()}{stat.suffix}
              </h3>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
