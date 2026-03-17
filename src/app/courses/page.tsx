
"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Target, CheckCircle2, Monitor, GraduationCap, Zap, BookOpen, Scale, Layers, Laptop, Building2, Calculator, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdU7f-A8m7OqD7-r1tI_mO8-z8U-v-placeholder/viewform";

const COURSES_DATA = [
  {
    id: 'neet',
    title: 'NEET Medical',
    audience: 'Class 11, 12 & Repeaters',
    duration: '1 to 2 Years',
    badge: 'Success Focused',
    icon: <Zap className="w-6 h-6" />,
    desc: 'Comprehensive NEET coaching focusing on NCERT mastery, bio-visual aids, and rigorous test series. Specialized batches for droppers and Class 11/12 students.',
    highlights: ['NCERT Intensive Program', 'Daily Practice Papers (DPPs)', 'Weekly All-India Level Tests', '24/7 Doubt Desk Support', 'Personalized Performance Reports']
  },
  {
    id: 'jee',
    title: 'JEE Main & Advanced',
    audience: 'Class 11, 12 & Repeaters',
    duration: '1 to 2 Years',
    badge: 'Elite Training',
    icon: <Laptop className="w-6 h-6" />,
    desc: 'Advanced problem-solving techniques for JEE. Our phase-wise completion ensures students are ready for both Mains and Advanced levels with high speed and accuracy.',
    highlights: ['Phase-wise Syllabus Completion', 'Advanced Problem Solving Sessions', 'Mock CBT (Computer Based Tests)', 'Formula & Concept Workshops', 'Individual Rank Analysis']
  },
  {
    id: 'foundation',
    title: 'JEE-NEET Foundation',
    audience: 'Class 6 - 10',
    duration: '1 to 5 Years',
    badge: 'Building Blocks',
    icon: <BookOpen className="w-6 h-6" />,
    desc: 'Strengthening core concepts in Science and Maths from an early age. We develop logical reasoning and analytical thinking to prepare students for future hurdles.',
    highlights: ['Focus on NTSE/Olympiads', 'Mental Ability Training', 'School Syllabus Synchronization', 'Early Competitive Exposure', 'Strong Conceptual Clarity']
  },
  {
    id: 'cuet',
    title: 'CUET Program',
    audience: 'Class 12 Passed',
    duration: '1 Year',
    badge: 'Central University Prep',
    icon: <GraduationCap className="w-6 h-6" />,
    desc: 'Gateway to top central universities like DU, BHU, and JNU. Focus on Domain Subjects, General Test (GT), and Language Sections.',
    highlights: ['Pattern-based Mock Tests', 'General Test Mastery', 'Language Lab Sessions', 'Domain Specific In-depth Study', '100th Percentile Focus']
  },
  {
    id: 'clat',
    title: 'CLAT (Law Entrance)',
    audience: 'Class 11 & 12',
    duration: '1 Year',
    badge: 'Legal Edge',
    icon: <Scale className="w-6 h-6" />,
    desc: 'Expert training for Law entrances including CLAT and AILET. Specialized modules for Legal Reasoning and Logical Aptitude.',
    highlights: ['Legal Awareness Sessions', 'Current Affairs Hub', 'Daily Vocab & Speed Reading', 'Legal Reasoning Drills', 'Law Topper Mentorship']
  },
  {
    id: 'integrated',
    title: 'Integrated School Programs',
    audience: 'Class 11 & 12',
    duration: 'School Hours',
    badge: 'Efficiency First',
    icon: <Building2 className="w-6 h-6" />,
    desc: 'Synchronized coaching directly within your school campus. We save 4+ hours of travel daily by providing JEE/NEET training during school hours.',
    highlights: ['Zero Travel Time', 'Synchronized Board & Entrance Prep', 'In-School Mentors', 'Unified Testing Platform', 'Reduced Academic Stress']
  },
  {
    id: 'tuition',
    title: 'Intensive Tuition (10, 11, 12)',
    audience: 'Board Aspirants',
    duration: 'Academic Year',
    badge: 'Subject Mastery',
    icon: <Calculator className="w-6 h-6" />,
    desc: 'Targeted academic support for Board Exams in Maths, Physics, Chemistry, and Biology. Focus on deep subject understanding for 95%+ scores.',
    highlights: ['Maths: Calculus & Algebra', 'Physics: Mechanics & EM', 'Chemistry: Organic & Physical', 'Biology: NCERT Coverage', 'Previous Year Paper Mastery']
  },
  {
    id: 'repeaters',
    title: 'JEE/NEET Repeaters Batch',
    audience: '12th Passed',
    duration: '1 Year',
    badge: 'Rank Boost',
    icon: <Layers className="w-6 h-6" />,
    desc: 'Dedicated program for drop-year students. Intensive focus on bridging gaps and mastering high-difficulty concepts to secure top ranks.',
    highlights: ['Concept Reinforcement', 'Strict Discipline & Routine', 'Frequent Full-Length Tests', 'Psychological Motivation', 'Fast-Track Error Correction']
  },
];

export default function CoursesPage() {
  const [activeCourse, setActiveCourse] = useState(COURSES_DATA[0].id);

  const scrollToSection = (id: string) => {
    setActiveCourse(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => scrollToSection(hash), 500);
    }
  }, []);

  return (
    <div className="bg-background min-h-screen pb-20">
      <section className="bg-secondary text-white py-12 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-primary/20 text-white mb-4 border-none px-4 py-1 uppercase tracking-widest text-[10px] md:text-xs">Admissions Open 2025-26</Badge>
          <h1 className="text-3xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">Detailed Programs</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
            From Foundation to Professional Entrances, we provide a structured path to success with expert mentorship.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Mobile Navigation List (Horizontal Scroll) */}
          <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit z-20">
             <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-border">
                <h4 className="hidden lg:block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 px-2">Navigate Programs</h4>
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar scroll-smooth">
                  {COURSES_DATA.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => scrollToSection(c.id)}
                      className={cn(
                        "text-left px-4 py-2.5 rounded-xl transition-all font-bold text-xs md:text-sm flex items-center gap-3 whitespace-nowrap lg:whitespace-normal",
                        activeCourse === c.id 
                          ? "bg-primary text-white shadow-lg lg:translate-x-1" 
                          : "text-secondary hover:bg-muted"
                      )}
                    >
                      <span className={cn("shrink-0", activeCourse === c.id ? "text-white" : "text-primary")}>{c.icon}</span>
                      <span className="truncate">{c.title}</span>
                    </button>
                  ))}
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:w-3/4 space-y-8 md:space-y-12">
             {COURSES_DATA.map((course) => (
               <section key={course.id} id={course.id} className="scroll-mt-24">
                 <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-border group hover:shadow-2xl transition-all duration-500 overflow-hidden relative text-left">
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-muted/20 rounded-bl-[60px] md:rounded-bl-[100px] flex items-center justify-center -translate-y-4 translate-x-4">
                       <span className="text-primary/20">{course.icon}</span>
                    </div>

                    <div className="flex flex-col justify-between gap-4 mb-8 relative z-10">
                      <div>
                        <Badge className="bg-secondary mb-3 px-3 py-1 text-[10px] md:text-xs">{course.badge}</Badge>
                        <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3 leading-tight">{course.title}</h2>
                        <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                          <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full"><GraduationCap className="w-4 h-4 text-primary" /> {course.audience}</span>
                          <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full"><Target className="w-4 h-4 text-primary" /> {course.duration}</span>
                          <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full"><Monitor className="w-4 h-4 text-primary" /> Live/Offline</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
                       <div className="space-y-6">
                          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            {course.desc}
                          </p>
                          <div className="flex pt-2">
                             <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 h-12 px-8 rounded-full font-bold shadow-lg">
                               <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">Enroll via Google Forms <ExternalLink className="ml-2 w-4 h-4" /></a>
                             </Button>
                          </div>
                       </div>
                       
                       <div className="space-y-3">
                          <h4 className="text-[10px] md:text-sm font-bold text-secondary uppercase tracking-widest mb-4">Program Highlights</h4>
                          <div className="grid grid-cols-1 gap-3">
                            {course.highlights.map((h, i) => (
                              <div key={i} className="flex items-center gap-3 bg-muted/30 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white transition-all">
                                <CheckCircle2 className="text-primary w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                <span className="font-bold text-secondary text-xs md:text-sm">{h}</span>
                              </div>
                            ))}
                          </div>
                       </div>
                    </div>
                 </div>
               </section>
             ))}

             <div id="admission-enquiry" className="pt-16 md:pt-24 pb-12">
                <EnquiryForm source="courses_page" title="Apply for Admission" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
