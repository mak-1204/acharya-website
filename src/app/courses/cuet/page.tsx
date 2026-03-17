
"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ChevronRight, GraduationCap, Globe, CheckCircle2 } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';

export default function CuetPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-bold">CUET</span>
        </div>
      </div>

      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
              CUET 2025: Target Top <span className="text-primary">Central Universities</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The Common University Entrance Test is your gateway to prestigious institutions like DU, BHU, JNU, and more. Our CUET program focuses on Domain Subjects, General Test (GT), and Language Sections to ensure a 100th percentile performance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
               {[
                 "In-depth Domain Subject Coverage",
                 "General Test Mastery (Quants & LR)",
                 "Language Lab for Verbal Proficiency",
                 "Latest Pattern Mock Test Series"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    <span className="font-bold text-secondary">{item}</span>
                 </div>
               ))}
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 h-12 font-bold shadow-lg">
               Enrol Now
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="rounded-3xl border-none shadow-xl overflow-hidden">
               <CardContent className="p-8 md:p-12 bg-white">
                  <div className="flex flex-col md:flex-row gap-8">
                     <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Globe className="text-primary w-10 h-10" />
                     </div>
                     <div className="space-y-4">
                        <Badge className="bg-primary">1 Year Program</Badge>
                        <h3 className="text-2xl font-bold text-secondary">CUET Ultimate 2025 Batch</h3>
                        <p className="text-muted-foreground leading-relaxed">
                           Designed specifically for Class 12 appearing and passed students. We provide a balanced approach that covers board exam concepts while mastering the CUET entrance pattern.
                        </p>
                        <div className="pt-4 flex gap-4">
                           <Button asChild className="bg-secondary rounded-xl">
                              <Link href="#enquiry">Get Details</Link>
                           </Button>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="enquiry" className="py-20">
        <div className="container mx-auto px-4">
           <EnquiryForm source="cuet_page" title="CUET Admission Enquiry" />
        </div>
      </section>
    </div>
  );
}
