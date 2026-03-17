"use client";

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Target, CheckCircle2, Monitor, GraduationCap, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const COURSES_DATA = [
  {
    id: 'foundation',
    title: 'JEE-NEET Foundation',
    audience: 'Class 6 - 10',
    duration: '1 to 5 Years',
    badge: 'Building Blocks',
    desc: 'Our foundation program focuses on strengthening core concepts in Physics, Chemistry, Biology, and Mathematics. We aim to develop logical reasoning and analytical thinking from an early age.',
    highlights: ['Focus on NTSE/Olympiads', 'Mental Ability Training', 'School Syllabus Coverage', 'Conceptual Clarity', 'Early Competitive Edge']
  },
  {
    id: 'jee-2year',
    title: 'JEE 2 Year Program',
    audience: 'Class 11 Students',
    duration: '2 Years',
    badge: 'Most Comprehensive',
    desc: 'Exhaustive coaching for Class 11 and 12 targeting JEE Mains & Advanced. Includes regular test series and detailed rank analysis.',
    highlights: ['Phase-wise Completion', 'All India Test Series', 'Daily Practice Papers', 'Detailed Solution Sets', 'Individual Mentoring']
  },
  {
    id: 'neet-1year',
    title: 'NEET 1 Year Program',
    audience: 'Class 12 Students',
    duration: '1 Year',
    badge: 'Targeted Prep',
    desc: 'Accelerated program for Class 12 students focusing on NEET medical entrance. Intensive biology coverage along with high-yield physics and chemistry topics.',
    highlights: ['NCERT Based Training', 'Weekly Full Length Tests', 'Error Analysis Sessions', 'Bio-Visual Aids', 'Olympiad Support']
  },
  {
    id: 'cuet',
    title: 'CUET 1 Year Program',
    audience: 'Class 12 Students',
    duration: '1 Year',
    badge: 'New & Trending',
    desc: 'Comprehensive training for Central University Entrance Test. Covers both Domain subjects and General Test sections.',
    highlights: ['Pattern-wise Mock Tests', 'Language Skill Labs', 'Logical Reasoning Mastery', 'Quantitative Aptitude', 'Domain Specific Focus']
  },
  {
    id: 'clat',
    title: 'CLAT 1 Year Program',
    audience: 'Class 11 & 12',
    duration: '1 Year',
    badge: 'Legal Edge',
    desc: 'Expert legal reasoning and logical aptitude training for CLAT aspirants. Madurai\'s first dedicated CLAT batch with premium resources.',
    highlights: ['Legal Awareness Sessions', 'Current Affairs Hub', 'Daily Vocab Exercises', 'Speed Reading Techniques', 'Legal Reasoning Drills']
  },
  {
    id: 'integrated',
    title: 'Integrated School Programs',
    audience: 'Class 11 & 12',
    duration: 'School Tie-up',
    badge: 'Efficiency First',
    desc: 'A synchronized approach where coaching happens during school hours. Zero travel time and integrated syllabus coverage.',
    highlights: ['Synergized Learning', 'Time Management Edge', 'Dual Focus Approach', 'In-School Mentors', 'Reduced Stress Levels']
  },
  {
    id: 'repeaters',
    title: 'JEE/NEET Repeaters Batch',
    audience: '12th Passed',
    duration: '1 Year',
    badge: 'Full Focus',
    desc: 'Dedicated program for drop-year students. Focuses on bridging gaps, increasing speed, and mastering high-difficulty concepts.',
    highlights: ['Concept Reinforcement', 'Rank Improvement Focus', 'Doubt Counter Facility', 'Psychological Support', 'Rigorous Test Cycle']
  },
  {
    id: 'crash',
    title: 'JEE/NEET Crash Course',
    audience: 'Class 12 Appearing',
    duration: '45 - 60 Days',
    badge: 'Last Minute Revision',
    desc: 'Intensive revision program just before the main exams. Focuses on weightage-based topics and formula mastery.',
    highlights: ['Quick Revision Nodes', 'Time-Saving Shortcuts', 'High-Yield Topics', 'Daily Full Mock Tests', 'Performance Tuning']
  },
];

export default function CoursesPage() {
  const [activeCourse, setActiveCourse] = useState(COURSES_DATA[0].id);

  const scrollToSection = (id: string) => {
    setActiveCourse(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Coaching Programs</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Structured, result-oriented coaching for every competitive exam hurdle.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Nav */}
          <aside className="lg:w-1/4 lg:sticky lg:top-32 h-fit space-y-2">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-border">
                <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 px-4">Available Courses</h4>
                <div className="flex flex-col">
                  {COURSES_DATA.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => scrollToSection(c.id)}
                      className={cn(
                        "text-left px-4 py-3 rounded-xl transition-all font-semibold text-sm",
                        activeCourse === c.id 
                          ? "bg-primary text-white shadow-lg" 
                          : "text-secondary hover:bg-muted"
                      )}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
             </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-16">
             {COURSES_DATA.map((course) => (
               <section key={course.id} id={course.id} className="scroll-mt-32">
                 <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border group hover:shadow-xl transition-all duration-500">
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                      <div>
                        <Badge className="bg-secondary mb-4">{course.badge}</Badge>
                        <h2 className="text-3xl font-bold text-secondary mb-2">{course.title}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> {course.audience}</span>
                          <span className="flex items-center gap-1"><Target className="w-4 h-4" /> {course.duration}</span>
                          <span className="flex items-center gap-1"><Monitor className="w-4 h-4" /> Online/Offline</span>
                        </div>
                      </div>
                      <Button asChild className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-full">
                         <a href="#enquiry-form">Enquire Now</a>
                      </Button>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {course.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {course.highlights.map((h, i) => (
                         <div key={i} className="flex items-center gap-3 bg-muted/30 p-4 rounded-xl">
                           <CheckCircle2 className="text-primary w-5 h-5" />
                           <span className="font-semibold text-secondary">{h}</span>
                         </div>
                       ))}
                    </div>
                 </div>
               </section>
             ))}

             {/* Full Enquiry Form */}
             <div id="enquiry-form" className="pt-20">
                <EnquiryForm source="courses_page" title="Apply for Admission" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
