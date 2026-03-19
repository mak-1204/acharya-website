
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Trophy, Users, GraduationCap, Target, Eye, BookOpen, CircleCheckBig
} from 'lucide-react';

const WHY_ACHARYA_FEATURES = [
  { title: 'Experienced Faculty', desc: 'Expert mentors with 15+ years of proven success stories', icon: <GraduationCap className="text-primary" /> },
  { title: 'Limited Batch Size', desc: 'Strict limit of 15 students per batch for personalized focus', icon: <Users className="text-secondary" /> },
  { title: 'Comprehensive Study Material', desc: 'Research-backed modules tailored for competitive exams', icon: <BookOpen className="text-primary" /> },
  { title: 'Regular Assessments', desc: 'Weekly tests and detailed performance analysis', icon: <Target className="text-secondary" /> },
  { title: 'Personalized Attention', desc: 'Regular PTMs and individualized doubt-clearing sessions', icon: <CircleCheckBig className="text-primary" /> },
  { title: 'Proven Results', desc: 'Legacy of top rankers in Madurai since 2007', icon: <Trophy className="text-secondary" /> },
];

const TIMELINE_DATA = [
  { year: '2007', text: 'Founded in Madurai with a vision to provide quality coaching' },
  { year: '2010', text: 'Expanded to 3 centres across Madurai' },
  { year: '2015', text: 'Crossed 10,000 students trained milestone' },
  { year: '2018', text: 'Launched CLAT and CUET programs' },
  { year: '2020', text: 'Introduced Online + Hybrid learning modes' },
  { year: '2024', text: '50,000+ students trained across 7+ centres' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Part 1 - Banner */}
      <section className="bg-[#1A237E] text-white py-16 md:py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            About Acharya Education
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-12 font-medium">
            Madurai's Most Trusted Coaching Since 2007
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-8 border-t border-white/10 max-w-5xl mx-auto">
            {[
              { label: 'Students Trained', val: '50,000+' },
              { label: 'Teachers Benefited', val: '300+' },
              { label: 'Centres', val: '7+' },
              { label: 'Years of Excellence', val: '17+' }
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div className="text-2xl md:text-4xl font-bold text-primary">{s.val}</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* Part 2 - Introduction */}
      <section className="bg-white py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-bold text-sm tracking-widest uppercase">
                Who We Are
              </div>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At Acharya Education, we understand the value of nurturing ambitious dreams from an early age. Since 2007, we have provided a unique and distinct learning experience. Unlike others who merely teach, we actively explore knowledge and foster practical understanding.
                </p>
                <p>
                  What sets us apart is our unwavering commitment to quality and academic standards. We distance ourselves from the crowd to ensure the utmost excellence. Our promises are not empty; they culminate in a remarkable journey towards IIT-JEE/NEET.
                </p>
                <p>
                  While there may be numerous trainers out there, Acharya stands out due to our exceptional study materials, experienced teaching faculty, and well-structured programs.
                </p>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-muted">
              <Image 
                src="https://i.postimg.cc/SNbPKy8N/Whats-App-Image-2026-03-18-at-1-59-41-PM.jpg" 
                alt="Acharya Education Campus" 
                fill 
                className="object-cover"
                data-ai-hint="educational classroom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Part 3 - Why Acharya? */}
      <section className="bg-[#F5F5F5] py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-16 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-8">Why Acharya?</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Acharya Education is dedicated to catering to the educational needs of young minds hungry for knowledge. Our primary focus is on providing intensive care and unparalleled classroom training. We aim to empower students who aspire to pursue courses in the country's top professional institutes such as IITs, NITs, NEET, AIIMS, JIPMER, and more.
              </p>
              <p className="text-sm">
                Students from Tamil Nadu can seek admission to IITs, NITs, IIITs & GTFIs, Deemed Universities, and Central Universities by taking the Joint Entrance Examination (JEE). Similarly, marks obtained in NEET are used to fill seats in medical colleges nationwide.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_ACHARYA_FEATURES.map((f, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] p-4 group">
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Part 4 - Our Vision & Mission */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {/* Vision */}
            <div className="space-y-6">
              <div className="w-14 h-14 bg-secondary text-white rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-secondary">Our Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Acharya Education, we believe that a guru is the light that guides and nurtures. Our vision is to be that guiding light, helping students pave their path to a successful and fulfilling future. We aim to create a holistic learning environment that prepares students not just for exams, but for the challenges of a rapidly evolving world.
              </p>
            </div>
            {/* Mission */}
            <div className="space-y-6">
              <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-secondary">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to provide a holistic approach to education that combines rigorous academic training with practical understanding and real-world applications. We are dedicated to fostering a futuristic mindset in our students, equipping them with the knowledge, skills, and values needed to excel in their chosen fields and contribute positively to society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 5 - Our Journey Timeline */}
      <section className="bg-[#F5F5F5] py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16 max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-20 text-center">
            Our Journey <span className="text-primary">Since 2007</span>
          </h2>
          
          {/* Timeline Desktop */}
          <div className="hidden lg:block relative py-12">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2"></div>
            <div className="grid grid-cols-6 gap-4 relative z-10">
              {TIMELINE_DATA.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="mb-8 p-3 bg-white rounded-xl shadow-md font-bold text-primary group-hover:scale-110 transition-transform">
                    {item.year}
                  </div>
                  <div className="w-5 h-5 rounded-full bg-secondary border-4 border-white ring-4 ring-secondary/10 mb-8"></div>
                  <p className="text-xs font-semibold text-muted-foreground max-w-[140px] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Mobile */}
          <div className="lg:hidden space-y-12 relative pl-8 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-muted">
            {TIMELINE_DATA.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[36px] top-0 w-4 h-4 rounded-full bg-secondary border-2 border-white"></div>
                <div className="text-xl font-bold text-primary mb-2">{item.year}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part 6 - CTA Bar */}
      <section className="bg-[#D32F2F] py-16 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-white/80 mb-10 font-medium">Join 50,000+ students who chose Acharya Education</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-12 h-14 text-lg shadow-xl">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 font-bold rounded-full px-12 h-14 text-lg">
              <a href="tel:9865440099">Call Us Now</a>
            </Button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </section>
    </div>
  );
}
