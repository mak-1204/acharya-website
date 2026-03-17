
"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ChevronRight, BookOpen, Calculator, Atom, Microscope, Trophy } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';

const TUITION_MODULES = [
  { title: "Mathematics", icon: <Calculator />, color: "bg-blue-500", desc: "Calculus, Algebra, and Geometry mastery for Board Exams." },
  { title: "Physics", icon: <Atom />, color: "bg-red-500", desc: "Conceptual understanding of Mechanics and Electromagnetism." },
  { title: "Chemistry", icon: <Microscope />, color: "bg-green-500", desc: "Organic, Inorganic, and Physical Chemistry simplified." },
  { title: "Biology", icon: <Trophy />, color: "bg-orange-500", desc: "Comprehensive NCERT coverage for Class 11 & 12." }
];

export default function TuitionPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-bold">Intensive Tuitions</span>
        </div>
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge className="bg-primary mb-4">Classes 10, 11 & 12</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            Intensive Tuition Programmes <br/>for <span className="text-primary">Subject Mastery</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            Targeted academic support for State Board and CBSE students. Our intensive tuition program focuses on deep understanding of core subjects to ensure 95%+ scores in board examinations.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {TUITION_MODULES.map((mod, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl group">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 ${mod.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {mod.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary">{mod.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{mod.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
           <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-border">
              <h2 className="text-3xl font-bold text-secondary mb-8 text-center">Enquire for Tuition</h2>
              <EnquiryForm source="tuition_page" isMinimal />
           </div>
        </div>
      </section>
    </div>
  );
}
