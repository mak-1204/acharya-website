
"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ChevronRight, Building2, Timer, Zap, CheckCircle2 } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';

export default function IntegratedPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-bold">Integrated Programs</span>
        </div>
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-secondary mb-4">School Tie-ups</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                Zero Travel Time. <br/><span className="text-primary">Maximum Productivity.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our Integrated School Program brings the expertise of Acharya Education directly into your school campus. We synchronize the school curriculum with competitive exam preparation, saving students 4+ hours of travel daily.
              </p>
              <div className="space-y-4 mb-10">
                 {[
                   "Synchronized Syllabus Coverage",
                   "Coaching during school hours",
                   "Unified testing platform for boards and entrance",
                   "Reduced stress for students and parents"
                 ].map((p, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <Zap className="text-primary w-5 h-5 fill-current" />
                      <span className="font-semibold text-secondary">{p}</span>
                   </div>
                 ))}
              </div>
              <Button size="lg" className="rounded-full bg-primary font-bold px-10 shadow-lg">
                 Talk to a Counselor
              </Button>
            </div>
            <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-muted border border-border flex items-center justify-center">
               <Building2 className="w-32 h-32 text-secondary/10" />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <h4 className="text-2xl font-bold text-secondary">Is your school integrated?</h4>
                  <p className="text-muted-foreground text-sm max-w-xs">We partner with leading schools in Madurai to provide on-campus JEE/NEET coaching.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
           <EnquiryForm source="integrated_page" title="School Partnership Enquiry" />
        </div>
      </section>
    </div>
  );
}
