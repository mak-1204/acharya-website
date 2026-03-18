"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EnquiryForm } from '@/components/EnquiryForm';
import { 
  Target, CircleCheckBig, Monitor, GraduationCap, Zap, 
  BookOpen, Scale, Layers, Laptop, Building2, Calculator, 
  ExternalLink, LayoutGrid, Phone, Loader2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdU7f-A8m7OqD7-r1tI_mO8-z8U-v-placeholder/viewform";

const ICON_MAP: Record<string, React.ReactNode> = {
  neet: <Zap className="w-6 h-6" />,
  jee: <Laptop className="w-6 h-6" />,
  foundation: <BookOpen className="w-6 h-6" />,
  cuet: <GraduationCap className="w-6 h-6" />,
  clat: <Scale className="w-6 h-6" />,
  integrated: <Building2 className="w-6 h-6" />,
  tuition: <Calculator className="w-6 h-6" />,
  repeaters: <Layers className="w-6 h-6" />,
};

export default function CoursesPage() {
  const [activeCourse, setActiveCourse] = useState('all');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'courses'), where('isPublished', '==', true), orderBy('order', 'asc')));
        setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleFilterChange = (id: string) => {
    setActiveCourse(id);
    if (window.innerWidth < 1024) {
      window.scrollTo({
        top: 200,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveCourse(hash);
    }
  }, [courses]);

  const displayCourses = activeCourse === 'all' 
    ? courses 
    : courses.filter(c => c.slug === activeCourse || c.category === activeCourse);

  const getCourseIcon = (course: any) => {
    return ICON_MAP[course.slug] || ICON_MAP[course.category] || <BookOpen className="w-6 h-6" />;
  };

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
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit z-20">
             <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-border">
                <h4 className="hidden lg:block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 px-2">Filter Programs</h4>
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 no-scrollbar scroll-smooth">
                  <button
                    onClick={() => handleFilterChange('all')}
                    className={cn(
                      "text-left px-4 py-2.5 rounded-xl transition-all font-bold text-xs md:text-sm flex items-center gap-3 whitespace-nowrap lg:whitespace-normal text-left",
                      activeCourse === 'all' 
                        ? "bg-primary text-white shadow-lg lg:translate-x-1" 
                        : "text-secondary hover:bg-muted"
                    )}
                  >
                    <LayoutGrid className={cn("shrink-0 w-6 h-6", activeCourse === 'all' ? "text-white" : "text-primary")} />
                    <span>All Programs</span>
                  </button>
                  
                  {courses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleFilterChange(c.slug)}
                      className={cn(
                        "text-left px-4 py-2.5 rounded-xl transition-all font-bold text-xs md:text-sm flex items-center gap-3 whitespace-nowrap lg:whitespace-normal",
                        activeCourse === c.slug 
                          ? "bg-primary text-white shadow-lg lg:translate-x-1" 
                          : "text-secondary hover:bg-muted"
                      )}
                    >
                      <span className={cn("shrink-0", activeCourse === c.slug ? "text-white" : "text-primary")}>{getCourseIcon(c)}</span>
                      <span className="truncate">{c.title}</span>
                    </button>
                  ))}
                </div>
             </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:w-3/4 space-y-8 md:space-y-12">
             {loading ? (
               <div className="flex justify-center py-20"><Loader2 className="animate-spin w-12 h-12 text-primary" /></div>
             ) : displayCourses.length > 0 ? (
               displayCourses.map((course) => (
                 <section key={course.id} id={course.slug} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-border group hover:shadow-2xl transition-all duration-500 overflow-hidden relative text-left">
                      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-muted/20 rounded-bl-[60px] md:rounded-bl-[100px] flex items-center justify-center -translate-y-4 translate-x-4">
                         <span className="text-primary/20">{getCourseIcon(course)}</span>
                      </div>

                      <div className="flex flex-col justify-between gap-4 mb-8 relative z-10">
                        <div>
                          <Badge className="bg-secondary mb-3 px-3 py-1 text-[10px] md:text-xs">
                            {course.isFeatured ? 'Featured Program' : (course.category || 'Professional Course')}
                          </Badge>
                          <h2 className="text-2xl md:text-4xl font-bold text-secondary mb-3 leading-tight">{course.title}</h2>
                          <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            {course.audience && (
                              <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                                <GraduationCap className="w-4 h-4 text-primary" /> {course.audience}
                              </span>
                            )}
                            {course.duration && (
                              <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                                <Target className="w-4 h-4 text-primary" /> {course.duration}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
                              <Monitor className="w-4 h-4 text-primary" /> Live/Offline
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
                         <div className="space-y-6">
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              {course.description}
                            </p>
                            <div className="flex flex-col gap-3 pt-2">
                               <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 h-12 px-8 rounded-full font-bold shadow-lg">
                                 <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">Enroll via Google Forms <ExternalLink className="ml-2 w-4 h-4" /></a>
                               </Button>
                               <Button asChild variant="outline" className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary/10 h-12 px-8 rounded-full font-bold shadow-md">
                                 <a href="tel:9865440099">Call to Enroll <Phone className="ml-2 w-4 h-4" /></a>
                               </Button>
                            </div>
                         </div>
                         
                         {course.highlights && Array.isArray(course.highlights) && course.highlights.length > 0 && (
                           <div className="space-y-3">
                              <h4 className="text-[10px] md:text-sm font-bold text-secondary uppercase tracking-widest mb-4">Program Highlights</h4>
                              <div className="grid grid-cols-1 gap-3">
                                {course.highlights.map((h: string, i: number) => (
                                  <div key={i} className="flex items-center gap-3 bg-muted/30 p-3 md:p-4 rounded-xl md:rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white transition-all">
                                    <CircleCheckBig className="text-primary w-4 h-4 md:w-5 md:h-5 shrink-0" />
                                    <span className="font-bold text-secondary text-xs md:text-sm">{h}</span>
                                  </div>
                                ))}
                              </div>
                           </div>
                         )}
                      </div>
                   </div>
                 </section>
               ))
             ) : (
               <div className="text-center py-20 bg-muted/20 rounded-3xl">
                 <p className="text-muted-foreground">No courses found matching this criteria.</p>
               </div>
             )}

             <div id="admission-enquiry" className="pt-16 md:pt-24 pb-12">
                <EnquiryForm source="courses_page" title="Apply for Admission" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
