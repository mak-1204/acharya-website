
"use client";

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ChevronRight, Target, Zap, BookOpen, Clock, Users } from 'lucide-react';
import { EnquiryForm } from '@/components/EnquiryForm';

const NEET_COURSES = [
  {
    title: "NEET 2-Year Lakshya Batch",
    target: "Class 11 Students",
    desc: "Comprehensive coverage of Class 11 & 12 Biology, Physics, and Chemistry for NEET 2026.",
    features: ["Daily Practice Papers", "NCERT Intensive", "Weekly Mock Tests"],
    badge: "Most Popular"
  },
  {
    title: "NEET 1-Year Arjuna Batch",
    target: "Class 12 Students",
    desc: "Focused revision and finishing school for Class 12 students aiming for top medical ranks.",
    features: ["Crash Revision", "Test Series", "Doubt Support"],
    badge: "Fast Track"
  },
  {
    title: "NEET Repeaters Batch",
    target: "12th Passed Students",
    desc: "Dedicated program for drop-year students to bridge conceptual gaps and improve speed.",
    features: ["Rank Improvement", "Full Syllabus", "Personal Mentoring"],
    badge: "Success Focused"
  },
  {
    title: "NEET Foundation",
    target: "Class 8-10",
    desc: "Early start for medical aspirants focusing on Biology and logical reasoning.",
    features: ["Conceptual Clarity", "School Support", "Olympiads"],
    badge: "Foundation"
  }
];

export default function NeetPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-bold">NEET</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
            NEET Preparation with <span className="text-primary">Acharya Education</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Acharya Education brings together dedicated courses for every stage, thousands of practice questions and mock tests, and flexible learning through live and recorded classes for NEET aspirants. With focused academic support and exam-oriented preparation, students get everything needed to strengthen concepts, track progress, and aim for top medical colleges.
          </p>
          <div className="flex flex-wrap gap-4">
             <Button className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-full font-bold">
               Explore Batches
             </Button>
             <Button variant="outline" className="border-secondary text-secondary h-12 px-8 rounded-full font-bold">
               Download Brochure
             </Button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">Active NEET Batches</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEET_COURSES.map((course, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden group">
                <CardContent className="p-0">
                  <div className="h-40 bg-secondary relative flex items-center justify-center text-white overflow-hidden">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                     <Target className="w-16 h-16 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                     <Badge className="absolute top-4 right-4 bg-primary">{course.badge}</Badge>
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
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> {f}
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-12 mt-4">
                      <Link href="#enquiry">Enroll Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section id="enquiry" className="py-20">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-secondary mb-6">Take a Free Demo Class</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Experience our teaching methodology and personalized attention before you commit. Our experts are here to guide your medical journey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="p-4 bg-white rounded-2xl border shadow-sm flex items-center gap-3">
                      <BookOpen className="text-primary w-5 h-5" />
                      <span className="font-bold text-secondary text-sm">NCERT Modules</span>
                   </div>
                   <div className="p-4 bg-white rounded-2xl border shadow-sm flex items-center gap-3">
                      <Clock className="text-primary w-5 h-5" />
                      <span className="font-bold text-secondary text-sm">24/7 Doubt Desk</span>
                   </div>
                </div>
              </div>
              <EnquiryForm source="neet_page" title="Get NEET Counseling" />
           </div>
        </div>
      </section>
    </div>
  );
}
