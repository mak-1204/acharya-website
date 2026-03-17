"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ImpactCounter } from '@/components/ImpactCounter';
import { EnquiryForm } from '@/components/EnquiryForm';
import { CheckCircle2, Star, BookOpen, Target, Award, Users, ShieldCheck, Zap } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

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

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative hero-gradient text-white pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <Badge className="bg-white/20 text-white border-none mb-6 text-sm py-1 px-4 hover:bg-white/30">
            Admissions Open for 2025-26
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl">
            Your Gateway to <span className="text-white underline decoration-white/30 underline-offset-8">IIT, NEET</span> & Beyond
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
            Madurai's Most Trusted Coaching Since 2007. Join 50,000+ students on the path to excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-bold px-10 h-14 rounded-full text-lg shadow-xl shadow-black/10">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-10 h-14 rounded-full text-lg">
              <a href="tel:9865440099">Book Free Counseling</a>
            </Button>
          </div>

          <div className="flex items-center gap-4 bg-black/10 p-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <button className="bg-white text-secondary px-6 py-2 rounded-full text-sm font-bold shadow-sm transition-all">🏫 Offline Classes</button>
            <button className="text-white hover:bg-white/10 px-6 py-2 rounded-full text-sm font-bold transition-all">💻 Online Classes</button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent opacity-50" />
      </section>

      {/* Impact Counter */}
      <ImpactCounter />

      {/* Course Segmentation */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Find Your Course</h2>
            <p className="text-muted-foreground">Expertly crafted programs for every stage of your academic journey.</p>
          </div>

          <Tabs defaultValue="all" className="w-full flex flex-col items-center">
            <TabsList className="bg-white p-1 rounded-full mb-10 h-auto flex flex-wrap justify-center border shadow-sm">
              <TabsTrigger value="all" className="rounded-full px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-semibold">ALL</TabsTrigger>
              <TabsTrigger value="jee" className="rounded-full px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-semibold">JEE</TabsTrigger>
              <TabsTrigger value="neet" className="rounded-full px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-semibold">NEET</TabsTrigger>
              <TabsTrigger value="clat" className="rounded-full px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-semibold">CLAT</TabsTrigger>
              <TabsTrigger value="foundation" className="rounded-full px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-semibold">FOUNDATION</TabsTrigger>
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

      {/* Student Journey */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">Your Journey To Success</h2>
           <div className="relative">
              {/* Connector Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-muted-foreground/20 -translate-y-1/2 z-0" />

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
                {[
                  { step: 1, title: 'Enquire', desc: 'Call or visit us for batch details.', icon: '💬' },
                  { step: 2, title: 'Counselling', desc: 'Free guidance from experts.', icon: '🤝' },
                  { step: 3, title: 'Enroll', desc: 'Secure your seat in a small batch.', icon: '📝' },
                  { step: 4, title: 'Learn', desc: 'Interactive sessions & materials.', icon: '🎓' },
                  { step: 5, title: 'Succeed', desc: 'Reach your dream college.', icon: '🏆' },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center text-center group">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-muted flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:border-primary transition-all duration-300 z-10">
                      {item.icon}
                    </div>
                    <div className="bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-4 shadow-md">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-bold text-secondary mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-24 bg-muted/50 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6 leading-tight">Start Your Journey with Acharya Today</h2>
              <p className="text-lg text-muted-foreground mb-8">Fill in the details below and our academic counsellor will reach out to you within 24 hours to guide you through the best courses for your career goals.</p>

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
