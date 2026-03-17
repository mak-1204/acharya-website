
"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ChevronRight, Laptop, Award, BookOpen, Layers, Users } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';

const JEE_COURSES = [
  {
    title: "JEE Main & Advanced (2 Year)",
    target: "Class 11 Students",
    desc: "Rigorous training for India's toughest engineering entrance. Phase-wise syllabus completion.",
    features: ["Advanced Problem Solving", "All India Test Series", "Personal Mentors"],
    badge: "Elite Batch"
  },
  {
    title: "JEE Power Revision (1 Year)",
    target: "Class 12 Students",
    desc: "Synchronized coaching with board exams to ensure excellence in both fields.",
    features: ["Formula Workshops", "PyQ Analysis", "Mock CBTs"],
    badge: "High Yield"
  },
  {
    title: "JEE Repeaters (Droppers)",
    target: "12th Passed",
    desc: "Intensive focus on improving AIR with advanced rank-boosting techniques.",
    features: ["Strict Discipline", "Weekly Analysis", "Full Syllabus"],
    badge: "Rank Boost"
  },
  {
    title: "JEE Foundation (6-10)",
    target: "Junior School",
    desc: "Building mathematical aptitude and logical reasoning from the ground up.",
    features: ["Maths Olympiads", "Mental Ability", "Future Ready"],
    badge: "Early Start"
  }
];

export default function JeePage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-bold">JEE</span>
        </div>
      </div>

      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            Crack JEE Main & Advanced with <span className="text-primary">Acharya Expert Mentors</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Our engineering entrance program is designed to build a solid foundation in Physics, Chemistry, and Mathematics. From conceptual clarity to high-speed problem solving, we provide the tools and strategy required to secure a seat in the IITs, NITs, and other premier engineering institutes.
          </p>
          <div className="flex flex-wrap gap-4">
             <Button className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-full font-bold">
               Find My Batch
             </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
              <Laptop className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">JEE Coaching Programs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {JEE_COURSES.map((course, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden group">
                <CardContent className="p-0">
                  <div className="h-40 bg-primary/10 relative flex items-center justify-center text-primary overflow-hidden">
                     <Layers className="w-16 h-16 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                     <Badge className="absolute top-4 right-4 bg-secondary">{course.badge}</Badge>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-xl font-bold text-secondary leading-tight">{course.title}</h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      <Users className="w-4 h-4" /> {course.target}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.desc}</p>
                    <div className="space-y-2 pt-2">
                      {course.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs font-bold text-secondary">
                          <Award className="text-primary w-4 h-4" /> {f}
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 mt-4">
                      <Link href="#enquiry">Book Counseling</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="py-20">
        <div className="container mx-auto px-4">
           <EnquiryForm source="jee_page" title="Start Your JEE Journey" />
        </div>
      </section>
    </div>
  );
}
