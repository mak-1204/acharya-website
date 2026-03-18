
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { EnquiryForm } from '@/components/EnquiryForm';
import Autoplay from 'embla-carousel-autoplay';
import { 
  CheckCircle2, BookOpen, Target, Award, Users, 
  ShieldCheck, Zap, GraduationCap, MapPin, 
  Calendar, Quote, Trophy, ArrowRight
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdU7f-A8m7OqD7-r1tI_mO8-z8U-v-placeholder/viewform";

const STARS_DATA = [
  {
    name: "Anish Kumar",
    exam: "JEE MAINS '26",
    score: "99.8 Percentile",
    category: "JEE",
    initials: "AK"
  },
  {
    name: "Ayesha Mariam",
    exam: "NEET-UG '26",
    score: "685 / 720",
    category: "NEET",
    initials: "AM"
  },
  {
    name: "Raghav Ganesh",
    exam: "JEE ADV. '26",
    score: "AIR 1204",
    category: "JEE",
    initials: "RG"
  },
  {
    name: "Shruthika",
    exam: "NEET-UG '26",
    score: "672 / 720",
    category: "NEET",
    initials: "S"
  },
  {
    name: "Josalin Mattews",
    exam: "CLASSES 6-10",
    score: "Top Rank",
    category: "CLASSES 6-10",
    initials: "JM"
  }
];

const HERO_BANNERS = [
  {
    title: "JEE Mains 2026 Crash Course",
    subtitle: "Madurai's Most Intensive Revision Program. 45 Days to Success.",
    image: "/Engineer.jpg",
    cta: "Enroll Now",
    link: GOOGLE_FORM_URL,
    badge: "Limited Seats",
    color: "bg-[#1A237E]"
  },
  {
    title: "NEET Victory Batch",
    subtitle: "Complete NCERT Coverage with Daily Doubt Solving Sessions.",
    image: "/doctor.jpg",
    cta: "Join Now",
    link: GOOGLE_FORM_URL,
    badge: "Admissions Open",
    color: "bg-[#D32F2F]"
  },
  {
    title: "CUET(ICAR) Program",
    subtitle: "Your Gateway to Top Agricultural Universities in India.",
    image: "/portrait-of-a-smiling-university-student-holding-a-book-and-a-sac-standing-at-the-entrance-of.jpg",
    cta: "Start Prep",
    link: GOOGLE_FORM_URL,
    badge: "New Program",
    color: "bg-[#2E7D32]"
  },
  {
    title: "CLAT Legal Edge",
    subtitle: "Join Madurai's #1 Dedicated Batch for Law Aspirants.",
    image: "/lawyer.jpg",
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

const TESTIMONIALS = [
  { name: 'Karthick R.', text: 'The 15-student batch size made a huge difference. Every doubt was cleared instantly.', role: 'JEE Aspirant' },
  { name: 'Meera S.', text: 'The NCERT intensive program for NEET is precisely what I needed to clear 650+.', role: 'Medical Student' },
  { name: 'Sanjay P.', text: 'Acharya simplified complex physics concepts for me. Highly recommended!', role: 'Class 12 Student' },
];

export default function Home() {
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [heroCurrent, setHeroCurrent] = useState(0);
  const [isStarsPaused, setIsStarsPaused] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  useEffect(() => {
    if (!heroApi) return;
    heroApi.on("select", () => {
      setHeroCurrent(heroApi.selectedScrollSnap());
    });
  }, [heroApi]);

  const loopedStars = [...STARS_DATA, ...STARS_DATA, ...STARS_DATA, ...STARS_DATA];
  const starsDuration = "30s";

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative w-full pt-0 overflow-hidden">
        <Carousel 
          setApi={setHeroApi} 
          opts={{ loop: true }} 
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {HERO_BANNERS.map((banner, index) => (
              <CarouselItem key={index}>
                <div className={cn("relative w-full min-h-[500px] md:h-[600px] flex items-center overflow-hidden py-12 md:py-0", banner.color)}>
                  <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-left">
                    <div className="text-white space-y-4 md:space-y-6">
                      <Badge className="bg-white/20 text-white border-none px-4 py-1.5 uppercase tracking-wider text-[10px] md:text-xs">
                        {banner.badge}
                      </Badge>
                      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                        {banner.title}
                      </h1>
                      <p className="text-base md:text-xl text-white/80 max-lg:mx-auto">
                        {banner.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                        <Button asChild size="lg" className="w-full sm:w-auto bg-white text-secondary hover:bg-white/90 font-bold rounded-full px-12 h-12 md:h-14 text-lg">
                          <a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.cta}</a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 font-bold rounded-full px-12 h-12 md:h-14 text-lg">
                          <a href="tel:9865440099">Call Counselor</a>
                        </Button>
                      </div>
                    </div>
                    <div className="hidden lg:block relative h-[450px] w-full max-w-xl ml-auto">
                      <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
                        <Image 
                          src={banner.image} 
                          alt={banner.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          priority
                          data-ai-hint="education banner"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {HERO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => heroApi?.scrollTo(i)}
                className={cn(
                  "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all",
                  heroCurrent === i ? "bg-white w-8 md:w-12" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </Carousel>
      </section>

      {/* 2. STATS STRIP */}
      <section id="stats" className="bg-white py-8 md:py-12 border-b relative z-30 -mt-6 md:-mt-12 mx-4 md:mx-12 lg:mx-auto max-w-7xl rounded-2xl md:rounded-3xl shadow-xl border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
            {IMPULSE_STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-secondary">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section id="courses" className="py-16 md:py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4">Our Impulse</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto italic text-sm md:text-base">Guiding Madurai's brightest minds towards excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {COURSES.map((course) => (
              <Card key={course.id} className="group hover:shadow-2xl transition-all duration-500 border rounded-2xl md:rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {course.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-secondary">{course.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-4">{course.target}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] md:text-xs">{course.mode}</Badge>
                  </div>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-10 md:h-12 text-sm">
                    <Link href={`/courses#${course.id}`}>Explore Program <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEET OUR STARS SECTION */}
      <section id="stars" className="py-16 md:py-24 bg-white scroll-mt-16 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-8 md:mb-12 font-headline">
              Meet Our Stars <span className="text-[#FFC107]">✦</span>
            </h2>

            <div 
              className="relative overflow-hidden group py-4"
              onMouseEnter={() => setIsStarsPaused(true)}
              onMouseLeave={() => setIsStarsPaused(false)}
            >
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div 
                className="flex w-max will-change-transform"
                style={{
                  animation: `marquee ${starsDuration} linear infinite`,
                  animationPlayState: isStarsPaused ? 'paused' : 'running'
                }}
              >
                {loopedStars.map((star, idx) => (
                  <div 
                    key={idx} 
                    className="pr-4 md:pr-6 flex-shrink-0"
                  >
                    <div className="w-[140px] sm:w-[160px] md:w-[180px] bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer border border-border">
                      <div className="h-32 sm:h-36 md:h-44 bg-gradient-to-br from-[#1A237E] to-[#D32F2F] flex items-center justify-center relative">
                        <span className="text-white text-2xl md:text-4xl font-bold">{star.initials}</span>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 px-2 text-center">
                          <span className="text-white text-[8px] md:text-[10px] font-bold uppercase tracking-wider">
                            {star.exam}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 md:p-4 text-left">
                        <p className="font-bold text-[#1C1C1C] text-xs md:text-sm truncate">{star.name}</p>
                        <p className="text-muted-foreground text-[8px] md:text-[10px] mt-0.5">Classroom Course</p>
                        <p className="text-[#D32F2F] font-bold text-base md:text-lg mt-2 md:mt-3">{star.score}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY ACHARYA */}
      <section id="why" className="py-16 md:py-24 bg-secondary text-white scroll-mt-16">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 md:mb-16">Why Madurai Trusts Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {WHY_ACHARYA.map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl hover:bg-white/10 transition-all text-left">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white flex items-center justify-center mb-4 md:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm md:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. JOURNEY STEPPER */}
      <section id="journey" className="py-20 md:py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <Badge className="bg-primary/10 text-primary border-none mb-4">Success Roadmap</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-tight">Your Path to Excellence</h2>
          </div>
          
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 relative">
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-muted -translate-y-1/2 z-0"></div>
            {JOURNEY_STEPS.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white text-primary flex items-center justify-center mb-6 shadow-xl border-4 border-white ring-8 ring-primary/5 group-hover:scale-110 group-hover:ring-primary/10 transition-all duration-500">
                  <div className="w-8 h-8 md:w-10 md:h-10">{step.icon}</div>
                </div>
                <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-8 h-8 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-lg">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] px-4 md:px-0">{step.desc}</p>
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="lg:hidden absolute -bottom-12 flex justify-center w-full">
                    <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex sm:hidden flex-col gap-16 relative">
            <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-muted -translate-x-1/2 z-0"></div>
            {JOURNEY_STEPS.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center mb-4 shadow-xl border-4 border-white ring-8 ring-primary/5">
                  <div className="w-6 h-6">{step.icon}</div>
                </div>
                <div className="absolute top-0 right-1/2 translate-x-10 -translate-y-2 w-7 h-7 rounded-full bg-secondary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-[12px] leading-relaxed px-10">{step.desc}</p>
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="mt-6 animate-bounce">
                    <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MODE SECTION */}
      <section id="mode" className="py-16 md:py-24 bg-primary text-white scroll-mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Learn the Way You Want</h2>
              <p className="text-lg md:text-xl text-white/80">We offer flexible learning models to suit every student's lifestyle and academic needs.</p>
              <div className="space-y-3 md:space-y-4 pt-2 md:pt-4 text-left">
                {[
                  "Offline Classes: Immersive classroom experience in Madurai.",
                  "Online Classes: Live interactive sessions from anywhere.",
                  "Hybrid Model: Best of both worlds for maximum flexibility."
                ].map((txt, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4">
                    <CheckCircle2 className="text-white fill-white/20 shrink-0" />
                    <span className="font-semibold text-base md:text-lg">{txt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl backdrop-blur-sm border border-white/20 text-center">
               <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Which mode suits you?</h4>
               <p className="mb-6 md:mb-8 opacity-80 text-sm md:text-base">Connect with our counselors to understand the best methodology for your success.</p>
               <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full w-full h-12 md:h-14">
                 <a href="tel:9865440099">Call our expert</a>
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ABOUT SECTION */}
      <section id="about" className="py-16 md:py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative h-[250px] sm:h-[350px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image src="https://picsum.photos/seed/about/800/1000" alt="Campus" fill className="object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="bg-primary mb-4 text-[10px] md:text-xs">Established 2007</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4 md:mb-6 leading-tight">Madurai's Legacy of Academic Excellence</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                Acharya Education has been empowering students for nearly two decades. Our philosophy is simple: limited batch size, expert faculty, and personalized care for every student.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:mb-10">
                 {[
                   "PhD/Expert Faculty",
                   "Batch size of 15",
                   "Customized Planners",
                   "Doubt Clearance Desk"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                     <span className="font-bold text-secondary text-sm md:text-base">{item}</span>
                   </div>
                 ))}
              </div>
              <Button asChild size="lg" className="w-full sm:w-auto rounded-full bg-secondary h-12 md:h-14">
                <Link href="#enquire">Visit Our Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-16 md:py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-12 md:mb-16 text-center">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className={cn("border-none shadow-xl rounded-2xl md:rounded-3xl p-6 md:p-10 bg-muted/30", i === 2 && "md:hidden lg:block")}>
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary mb-4 md:mb-6 opacity-20 mx-auto" />
                <p className="text-base md:text-lg italic text-secondary mb-6 md:mb-8 text-center">"{t.text}"</p>
                <div className="text-center">
                  <h4 className="font-bold text-secondary text-sm md:text-base">{t.name}</h4>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase mt-1 tracking-widest">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ENQUIRE SECTION */}
      <section id="enquire" className="py-16 md:py-24 bg-primary relative overflow-hidden scroll-mt-16">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-7xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-12 text-white">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">Start Your Journey</h2>
              <p className="text-lg md:text-xl opacity-80">Click below to fill out our official admission enquiry form.</p>
            </div>
            <EnquiryForm source="home_enquire_section" title="Quick Admission Enquiry" />
          </div>
        </div>
      </section>
    </div>
  );
}
