
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnquiryForm } from '@/components/EnquiryForm';
import { CheckCircle2, Star, BookOpen, Target, Award, Users, ShieldCheck, Zap, ChevronRight, GraduationCap, MapPin, Calendar } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

const HERO_BANNERS = [
  {
    title: "JEE Mains 2025 Crash Course",
    subtitle: "Madurai's Most Intensive Revision Program. 45 Days to Success.",
    image: "https://picsum.photos/seed/hero1/1200/450",
    cta: "Enroll Now",
    link: "/courses",
    badge: "Limited Seats",
    color: "bg-[#1A237E]"
  },
  {
    title: "NEET Victory Batch",
    subtitle: "Complete NCERT Coverage with Daily Doubt Solving Sessions.",
    image: "https://picsum.photos/seed/hero2/1200/450",
    cta: "Join Now",
    link: "/courses",
    badge: "Admissions Open",
    color: "bg-[#D32F2F]"
  },
  {
    title: "CLAT Legal Edge",
    subtitle: "Join Madurai's #1 Dedicated Batch for Law Aspirants.",
    image: "https://picsum.photos/seed/hero3/1200/450",
    cta: "Explore More",
    link: "/courses",
    badge: "New Batch",
    color: "bg-[#1A237E]"
  }
];

const COURSES = [
  { id: 'jee', title: 'JEE Main & Advanced', target: 'Class 11, 12 & Repeaters', mode: 'Online + Offline', icon: <Target className="w-6 h-6" /> },
  { id: 'neet', title: 'NEET Medical', target: 'Class 11, 12 & Repeaters', mode: 'Online + Offline', icon: <Zap className="w-6 h-6" /> },
  { id: 'foundation', title: 'Foundation Program', target: 'Class 6 - 10', mode: 'Offline Only', icon: <BookOpen className="w-6 h-6" /> },
  { id: 'clat', title: 'CLAT (Law Entrance)', target: 'Class 11 & 12', mode: 'Online + Offline', icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 'cuet', title: 'CUET Preparation', target: 'Class 12 Passed', mode: 'Online + Offline', icon: <Award className="w-6 h-6" /> },
  { id: 'tuition', title: 'State Board Tuitions', target: 'Class 9 - 12', mode: 'Offline Only', icon: <Users className="w-6 h-6" /> },
];

const STARS = [
  { name: 'Anish Kumar', exam: 'JEE Mains', result: '99.8 Percentile', batch: '2024', image: 'https://picsum.photos/seed/s1/300/300' },
  { name: 'Ayesha Mariam', exam: 'NEET', result: '685/720', batch: '2024', image: 'https://picsum.photos/seed/s2/300/300' },
  { name: 'Raghav Ganesh', exam: 'JEE Advanced', result: 'AIR 1204', batch: '2023', image: 'https://picsum.photos/seed/s3/300/300' },
  { name: 'Shruthika', exam: 'NEET', result: '672/720', batch: '2024', image: 'https://picsum.photos/seed/s4/300/300' },
  { name: 'Josalin Mattews', exam: 'CUET', result: '99.5 %ile', batch: '2023', image: 'https://picsum.photos/seed/s5/300/300' },
];

const WHY_ACHARYA = [
  { title: 'Experienced Faculty', desc: 'Expert mentors with 15+ years of success stories.', icon: <Award className="text-primary" /> },
  { title: 'Small Batches', desc: 'Strict limit of 15 students per batch for personalized focus.', icon: <Users className="text-secondary" /> },
  { title: 'Study Material', desc: 'Research-backed modules tailored for competitive exams.', icon: <BookOpen className="text-primary" /> },
  { title: 'Regular Assessment', desc: 'Weekly tests and detailed performance analysis.', icon: <Target className="text-secondary" /> },
  { title: 'Personalized Care', desc: 'Regular PTMs and individualized doubt-clearing sessions.', icon: <CheckCircle2 className="text-primary" /> },
  { title: 'Proven Results', desc: 'Legacy of top rankers in Madurai since 2007.', icon: <Zap className="text-secondary" /> },
];

const IMPULSE_STATS = [
  { label: 'Students Trained', value: '50k+', icon: <Users className="w-5 h-5" /> },
  { label: 'Teachers Benefited', value: '300+', icon: <GraduationCap className="w-5 h-5" /> },
  { label: 'Centres', value: '7+', icon: <MapPin className="w-5 h-5" /> },
  { label: 'Years of Excellence', value: '17+', icon: <Calendar className="w-5 h-5" /> },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Carousel Section */}
      <section className="relative w-full">
        <Carousel 
          setApi={setApi}
          opts={{ loop: true }} 
          className="w-full"
        >
          <CarouselContent>
            {HERO_BANNERS.map((banner, index) => (
              <CarouselItem key={index}>
                <div className={cn("relative w-full h-[350px] md:h-[500px] flex items-center overflow-hidden", banner.color)}>
                  <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                    <div className="text-white space-y-4 md:space-y-6 animate-in slide-in-from-left-10 duration-700">
                      <Badge className="bg-white/20 text-white border-none px-4 py-1.5 uppercase tracking-wider">
                        {banner.badge}
                      </Badge>
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                        {banner.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 max-w-lg">
                        {banner.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-4">
                        <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-bold rounded-full px-8 h-12">
                          <Link href={banner.link}>{banner.cta}</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold rounded-full px-8 h-12">
                          <a href="tel:9865440099">Talk to Expert</a>
                        </Button>
                      </div>
                    </div>
                    <div className="hidden lg:block relative h-full">
                      <Image 
                        src={banner.image} 
                        alt={banner.title} 
                        fill 
                        className="object-contain" 
                        priority
                        data-ai-hint="educational poster"
                      />
                    </div>
                  </div>
                  {/* Decorative Background Pattern */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  current === i ? "bg-white w-8" : "bg-white/40"
                )}
              />
            ))}
          </div>
          <CarouselPrevious className="hidden md:flex left-4 bg-black/20 border-none text-white hover:bg-black/40" />
          <CarouselNext className="hidden md:flex right-4 bg-black/20 border-none text-white hover:bg-black/40" />
        </Carousel>
      </section>

      {/* Our Impulse Stats Strip */}
      <section className="bg-white border-b py-6 md:py-8 shadow-sm relative z-30 -mt-0 md:-mt-8 md:rounded-t-3xl md:mx-4 lg:mx-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 shrink-0">
               <div className="bg-primary p-2 rounded-lg text-white">
                  <Zap className="w-6 h-6 fill-current" />
               </div>
               <div>
                 <h2 className="text-xl font-bold text-secondary leading-none">Our Impulse</h2>
                 <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">Acharya Education</p>
               </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl">
              {IMPULSE_STATS.map((stat, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-secondary leading-none">{stat.value}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Segmentation */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Find Your Course</h2>
            <p className="text-muted-foreground">Expertly crafted programs for every stage of your academic journey.</p>
          </div>

          <Tabs defaultValue="all" className="w-full flex flex-col items-center">
            <TabsList className="bg-white p-1 rounded-full mb-10 h-auto flex flex-wrap justify-center border shadow-sm">
              {['all', 'jee', 'neet', 'clat', 'foundation'].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab} 
                  className="rounded-full px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-semibold uppercase text-xs"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {COURSES.map((course) => (
                <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 border-none bg-white rounded-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                      {course.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-secondary">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{course.target}</p>
                    <div className="flex items-center gap-2 mb-6">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{course.mode}</Badge>
                    </div>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl">
                      <Link href={`/courses#${course.id}`}>Know More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Tabs>
        </div>
      </section>

      {/* Results / Stars Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 flex items-center gap-3">
                Meet Our Stars <Star className="text-yellow-400 fill-yellow-400" />
              </h2>
              <p className="text-muted-foreground">The success of Acharya Education is written in our students' results.</p>
            </div>
            <Button variant="link" className="text-primary font-bold p-0 h-auto" asChild>
              <Link href="/results">View All Results ➔</Link>
            </Button>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {STARS.map((star, i) => (
                <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4 pl-4">
                  <div className="bg-muted/30 rounded-2xl overflow-hidden border group hover:border-primary transition-all duration-300">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={star.image}
                        alt={star.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint="student portrait"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-80" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-lg font-bold">{star.name}</p>
                        <p className="text-xs font-semibold opacity-80 uppercase tracking-widest">{star.exam} - Batch {star.batch}</p>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-primary font-bold text-lg">{star.result}</div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-white" />
              <CarouselNext className="-right-12 bg-white" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Why Acharya */}
      <section className="py-24 bg-secondary text-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Madurai Trusts Us?</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">17+ years of building careers and character.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_ACHARYA.map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-24 bg-muted/50 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 leading-tight">Start Your Journey Today</h2>
              <p className="text-lg text-muted-foreground mb-8">Fill in the details below and our academic counsellor will reach out to you within 24 hours.</p>

              <div className="space-y-6">
                {[
                  "Free Demo Classes for All Subjects",
                  "1-on-1 Personalized Career Counselling",
                  "Latest Study Material & Practice Papers",
                  "Small Batches for Maximum Interaction"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-secondary">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <EnquiryForm source="home_form" title="Quick Enquiry" />
          </div>
        </div>
      </section>
    </div>
  );
}
