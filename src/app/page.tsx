"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnquiryForm } from '@/components/EnquiryForm';
import { 
  CheckCircle2, Star, BookOpen, Target, Award, Users, 
  ShieldCheck, Zap, ChevronRight, GraduationCap, MapPin, 
  Calendar, Quote, Camera, Trophy, Gift, ArrowRight, Phone, ExternalLink
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdU7f-A8m7OqD7-r1tI_mO8-z8U-v-placeholder/viewform";

const HERO_BANNERS = [
  {
    title: "JEE Mains 2025 Crash Course",
    subtitle: "Madurai's Most Intensive Revision Program. 45 Days to Success.",
    image: "https://picsum.photos/seed/hero1/1200/450",
    cta: "Enroll Now",
    link: GOOGLE_FORM_URL,
    badge: "Limited Seats",
    color: "bg-[#1A237E]"
  },
  {
    title: "NEET Victory Batch",
    subtitle: "Complete NCERT Coverage with Daily Doubt Solving Sessions.",
    image: "https://picsum.photos/seed/hero2/1200/450",
    cta: "Join Now",
    link: GOOGLE_FORM_URL,
    badge: "Admissions Open",
    color: "bg-[#D32F2F]"
  },
  {
    title: "CLAT Legal Edge",
    subtitle: "Join Madurai's #1 Dedicated Batch for Law Aspirants.",
    image: "https://picsum.photos/seed/hero3/1200/450",
    cta: "Apply Now",
    link: GOOGLE_FORM_URL,
    badge: "New Batch",
    color: "bg-[#1A237E]"
  }
];

const COURSES = [
  { id: 'jee', title: 'JEE Main & Advanced', target: 'Class 11, 12 & Repeaters', mode: 'Hybrid', icon: <Target className="w-6 h-6" />, category: 'jee' },
  { id: 'neet', title: 'NEET Medical', target: 'Class 11, 12 & Repeaters', mode: 'Hybrid', icon: <Zap className="w-6 h-6" />, category: 'neet' },
  { id: 'foundation', title: 'Foundation Program', target: 'Class 6 - 10', mode: 'Offline', icon: <BookOpen className="w-6 h-6" />, category: 'foundation' },
  { id: 'clat', title: 'CLAT (Law Entrance)', target: 'Class 11 & 12', mode: 'Hybrid', icon: <ShieldCheck className="w-6 h-6" />, category: 'clat' },
  { id: 'cuet', title: 'CUET Preparation', target: 'Class 12 Passed', mode: 'Hybrid', icon: <Award className="w-6 h-6" />, category: 'cuet' },
  { id: 'tuition', title: 'State Board Tuitions', target: 'Class 9 - 12', mode: 'Offline', icon: <Users className="w-6 h-6" />, category: 'tuition' },
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

const JOURNEY_STEPS = [
  { title: 'Counseling', desc: 'Personalized guidance to pick the right academic path.', icon: <Users className="w-8 h-8" /> },
  { title: 'Admission', desc: 'Smooth enrollment into Madurai’s most elite batches.', icon: <CheckCircle2 className="w-8 h-8" /> },
  { title: 'Learning', desc: 'Rigorous training with PhD/Expert faculty members.', icon: <BookOpen className="w-8 h-8" /> },
  { title: 'Success', desc: 'Regular testing and mentoring leading to top ranks.', icon: <Trophy className="w-8 h-8" /> },
];

const GALLERY_IMAGES = [
  { url: 'https://picsum.photos/seed/g1/600/400', title: 'Interactive Sessions' },
  { url: 'https://picsum.photos/seed/g2/600/400', title: 'Annual Celebration' },
  { url: 'https://picsum.photos/seed/g3/600/400', title: 'Biology Lab' },
  { url: 'https://picsum.photos/seed/g4/600/400', title: 'Study Hall' },
  { url: 'https://picsum.photos/seed/g5/600/400', title: 'Result Day' },
  { url: 'https://picsum.photos/seed/g6/600/400', title: 'Faculty Training' },
];

const TESTIMONIALS = [
  { name: 'Karthick R.', text: 'The 15-student batch size made a huge difference. Every doubt was cleared instantly.', role: 'JEE Aspirant' },
  { name: 'Meera S.', text: 'The NCERT intensive program for NEET is precisely what I needed to clear 650+.', role: 'Medical Student' },
  { name: 'Sanjay P.', text: 'Acharya simplified complex physics concepts for me. Highly recommended!', role: 'Class 12 Student' },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [courseFilter, setCourseFilter] = useState('all');

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const filteredCourses = courseFilter === 'all' 
    ? COURSES 
    : COURSES.filter(c => c.category === courseFilter);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative w-full pt-0">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {HERO_BANNERS.map((banner, index) => (
              <CarouselItem key={index}>
                <div className={cn("relative w-full h-[450px] md:h-[650px] flex items-center overflow-hidden", banner.color)}>
                  <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                    <div className="text-white space-y-6">
                      <Badge className="bg-white/20 text-white border-none px-4 py-1.5 uppercase tracking-wider">
                        {banner.badge}
                      </Badge>
                      <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">
                        {banner.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 max-w-lg">
                        {banner.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-4">
                        <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-bold rounded-full px-10">
                          <a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.cta}</a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold rounded-full px-10">
                          <a href="tel:9865440099">Call Counselor</a>
                        </Button>
                      </div>
                    </div>
                    <div className="hidden lg:block relative h-[500px]">
                      <Image 
                        src={banner.image} 
                        alt={banner.title} 
                        fill 
                        className="object-contain" 
                        priority
                        data-ai-hint="education banner"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  current === i ? "bg-white w-10" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </Carousel>
      </section>

      {/* 2. STATS STRIP */}
      <section id="stats" className="bg-white py-12 border-b relative z-30 -mt-10 mx-4 md:mx-12 lg:mx-24 rounded-3xl shadow-xl border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {IMPULSE_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">{stat.value}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section id="courses" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Our Impulse</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto italic">Guiding Madurai's brightest minds towards excellence.</p>
          </div>

          <Tabs defaultValue="all" onValueChange={setCourseFilter} className="w-full flex flex-col items-center">
            <TabsList className="bg-muted p-1 rounded-full mb-12 h-auto flex flex-wrap justify-center border">
              {['all', 'jee', 'neet', 'clat', 'foundation'].map((tab) => (
                <TabsTrigger 
                  key={tab} value={tab} 
                  className="rounded-full px-8 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase text-xs"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-2xl transition-all duration-500 border rounded-3xl overflow-hidden bg-white">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      {course.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-secondary">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{course.target}</p>
                    <div className="flex items-center gap-2 mb-6">
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{course.mode}</Badge>
                    </div>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-12">
                      <Link href={`/courses#${course.id}`}>Explore Program <ArrowRight className="w-4 h-4 ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
               <Button asChild variant="link" className="text-primary text-lg font-bold">
                 <Link href="/courses">View All Detailed Courses ➔</Link>
               </Button>
            </div>
          </Tabs>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-4xl opacity-20"></div>

      {/* 4. STARS CAROUSEL */}
      <section id="stars" className="py-24 bg-muted/30 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
              Meet Our Stars <Star className="text-yellow-400 fill-yellow-400" />
            </h2>
            <p className="text-muted-foreground">Top rankers from Madurai who realized their dreams with Acharya.</p>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {STARS.map((star, i) => (
                <CarouselItem key={i} className="md:basis-1/3 lg:basis-1/4 pl-6">
                  <div className="bg-white rounded-3xl overflow-hidden border shadow-sm group hover:border-primary transition-all">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image src={star.image} alt={star.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white text-left">
                        <p className="text-xl font-bold">{star.name}</p>
                        <p className="text-sm opacity-80 uppercase tracking-widest">{star.exam}</p>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <div className="text-primary font-bold text-2xl">{star.result}</div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12 hidden lg:flex" />
            <CarouselNext className="-right-12 hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      {/* 5. WHY ACHARYA */}
      <section id="why" className="py-24 bg-secondary text-white scroll-mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Why Madurai Trusts Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_ACHARYA.map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-all text-left">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. JOURNEY STEPPER */}
      <section id="journey" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-secondary mb-20">Your Path to Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0"></div>
            {JOURNEY_STEPS.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mb-6 shadow-xl border-8 border-white group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MODE SECTION */}
      <section id="mode" className="py-24 bg-primary text-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-left">
              <h2 className="text-4xl md:text-5xl font-bold">Learn the Way You Want</h2>
              <p className="text-xl text-white/80">We offer flexible learning models to suit every student's lifestyle and academic needs.</p>
              <div className="space-y-4 pt-4">
                {[
                  "Offline Classes: Immersive classroom experience in Madurai.",
                  "Online Classes: Live interactive sessions from anywhere.",
                  "Hybrid Model: Best of both worlds for maximum flexibility."
                ].map((txt, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="text-white fill-white/20" />
                    <span className="font-semibold text-lg">{txt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-sm border border-white/20 text-left">
               <h4 className="text-2xl font-bold mb-6">Which mode suits you?</h4>
               <p className="mb-8 opacity-80">Connect with our counselors to understand the best methodology for your success.</p>
               <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full w-full">
                 <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">Consult an Expert</a>
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ABOUT SECTION */}
      <section id="about" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="https://picsum.photos/seed/about/800/1000" alt="Campus" fill className="object-cover" />
            </div>
            <div className="text-left">
              <Badge className="bg-primary mb-4">Established 2007</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">Madurai's Legacy of Academic Excellence</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Acharya Education has been empowering students for nearly two decades. Our philosophy is simple: limited batch size, expert faculty, and personalized care for every student.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                 {[
                   "PhD/Expert Faculty",
                   "Batch size of 15",
                   "Customized Planners",
                   "Doubt Clearance Desk"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <CheckCircle2 className="text-primary w-5 h-5" />
                     <span className="font-bold text-secondary">{item}</span>
                   </div>
                 ))}
              </div>
              <Button asChild size="lg" className="rounded-full bg-secondary">
                <Link href="#contact">Visit Our Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. RESULTS SECTION */}
      <section id="results" className="py-24 bg-muted/30 scroll-mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-16">Outstanding Results 2024</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Anish Kumar", exam: "JEE Mains", res: "99.8 %ile" },
              { name: "Ayesha Mariam", exam: "NEET", res: "685/720" },
              { name: "Shruthika", exam: "NEET", res: "672/720" },
              { name: "Raghav Ganesh", exam: "JEE Adv", res: "AIR 1204" }
            ].map((r, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border shadow-sm flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-secondary/5 flex items-center justify-center text-secondary mb-4">
                  <Trophy className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-secondary">{r.name}</h4>
                <p className="text-sm font-semibold text-muted-foreground uppercase">{r.exam}</p>
                <p className="text-2xl font-bold text-primary mt-2">{r.res}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4 flex items-center justify-center gap-3">
              <Camera className="text-primary" /> Life at Acharya
            </h2>
            <p className="text-muted-foreground">Glimpses of our vibrant learning environment.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-3xl shadow-lg aspect-video">
                <Image src={img.url} alt={img.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <p className="font-bold text-lg">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. SCHOLARSHIP SECTION */}
      <section id="scholarship" className="py-24 bg-primary text-white overflow-hidden relative scroll-mt-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-left">
              <Badge className="bg-white/20 mb-4 border-none text-white py-1 px-4">AEST 2025</Badge>
              <h2 className="text-4xl md:text-7xl font-bold">Win Up to 100% Scholarship</h2>
              <p className="text-xl text-white/80">Secure your premium coaching with the Acharya Excellence Scholarship Test. Registrations open soon for Class 6-12.</p>
              <div className="flex gap-10">
                <div className="text-center">
                   <div className="text-4xl font-bold">50k+</div>
                   <div className="text-xs uppercase opacity-60">Participants</div>
                </div>
                <div className="text-center">
                   <div className="text-4xl font-bold">1Cr+</div>
                   <div className="text-xs uppercase opacity-60">Rewards Given</div>
                </div>
              </div>
            </div>
            <div className="bg-white text-secondary p-12 rounded-[3rem] shadow-2xl relative text-left">
               <Gift className="absolute -top-10 -right-10 w-24 h-24 text-white opacity-20 rotate-12" />
               <h3 className="text-3xl font-bold mb-6">Pre-Register Now</h3>
               <p className="mb-8 text-muted-foreground">Register your interest today and be the first to know when AEST 2025 slots are available.</p>
               <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 h-14 text-xl rounded-2xl">
                 <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">Register Interest</a>
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-16">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="border-none shadow-xl rounded-3xl p-10 bg-muted/30">
                <Quote className="w-10 h-10 text-primary mb-6 opacity-20 mx-auto" />
                <p className="text-lg italic text-secondary mb-8">"{t.text}"</p>
                <h4 className="font-bold text-secondary">{t.name}</h4>
                <p className="text-xs text-muted-foreground uppercase mt-1 tracking-widest">{t.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 13. ENQUIRE FORM SECTION */}
      <section id="enquire" className="py-24 bg-primary relative overflow-hidden scroll-mt-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Start Your Journey</h2>
              <p className="text-xl opacity-80">Click below to fill out our official admission enquiry form.</p>
            </div>
            <EnquiryForm source="home_enquire_section" title="Quick Admission Enquiry" />
          </div>
        </div>
      </section>

      {/* 14. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary">Visit Our Center</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0"><MapPin /></div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Our Location</h4>
                    <p className="text-muted-foreground">No. 207, 8th St, Muthuramalingapuram, Karpaga Nagar, K. Pudur, Madurai - 625007</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0"><Phone /></div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Direct Line</h4>
                    <p className="text-muted-foreground">9865440099</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0"><Calendar /></div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Working Hours</h4>
                    <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border grayscale opacity-80 hover:grayscale-0 transition-all">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.982548485292!2d78.1481132!3d9.935406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTYnMDEuNSJOIDc4wrAwOCU1My4yIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                className="w-full h-full border-0" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
