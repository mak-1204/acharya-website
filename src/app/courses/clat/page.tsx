
"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ChevronRight, Scale, Gavel, CheckCircle2, ShieldCheck } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';
import Image from 'next/image';

export default function ClatPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-bold">CLAT</span>
        </div>
      </div>

      <section className="bg-secondary text-white py-12 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="bg-primary border-none mb-6">Legal Edge @ Madurai</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Start Your Legal Career with the Best CLAT Coaching
              </h1>
              <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-10">
                CLAT, AILET, and other law entrances require sharp logical reasoning and specialized legal awareness. At Acharya, we provide the most comprehensive law entrance program in Madurai.
              </p>
              <div className="flex gap-4">
                 <Button asChild className="bg-primary hover:bg-primary/90 h-14 px-10 rounded-full font-bold text-lg transition-transform hover:scale-105">
                   <Link href="#enquiry">Join Batch</Link>
                 </Button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] lg:aspect-square w-full max-w-2xl mx-auto group">
                <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] md:rounded-[3.5rem] blur-2xl group-hover:bg-primary/30 transition-colors"></div>
                <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-white/10 overflow-hidden">
                  <Image 
                    src={`/lawyer.jpg?v=${Date.now()}`}
                    alt="CLAT Aspirant"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative SVG */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
           <Scale className="w-[500px] h-[500px]" />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Legal Reasoning", icon: <Gavel className="w-6 h-6" />, desc: "Expert guidance on torts, contracts, and constitutional law concepts." },
                { title: "Logical Aptitude", icon: <ShieldCheck className="w-6 h-6" />, desc: "Mastering critical reasoning and analytical logic puzzles." },
                { title: "Current Affairs", icon: <Scale className="w-6 h-6" />, desc: "Daily dose of global and legal news curated for law aspirants." }
              ].map((box, i) => (
                <div key={i} className="p-8 rounded-3xl border border-border hover:shadow-xl transition-all group bg-muted/10">
                   <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      {box.icon}
                   </div>
                   <h4 className="text-xl font-bold text-secondary mb-3">{box.title}</h4>
                   <p className="text-muted-foreground text-sm leading-relaxed">{box.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section id="enquiry" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
           <EnquiryForm source="clat_page" title="Enquire for CLAT Batch" />
        </div>
      </section>
    </div>
  );
}
