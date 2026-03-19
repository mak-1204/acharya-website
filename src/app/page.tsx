
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
  CircleCheckBig, BookOpen, Target, Award, Users, 
  GraduationCap, MapPin, 
  Calendar, Quote, Trophy, ArrowRight, Camera, Loader2, Star as StarIcon, Eye
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const DEFAULT_GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdU7f-A8m7OqD7-r1tI_mO8-z8U-v-placeholder/viewform";

const ICON_MAP: Record<string, any> = {
  Users,
  GraduationCap,
  MapPin,
  Calendar,
  Trophy,
  BookOpen,
};

const getInitials = (name: string) => {
  if (!name) return 'A';
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export default function Home() {
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [heroCurrent, setHeroCurrent] = useState(0);
  const autoplayHero = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const autoplayStars = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // --- Data Fetching State ---
  const [banners, setBanners] = useState<any[]>([]);
  const [bannersLoading, setBannersLoading] = useState(true);

  const [impactStats, setImpactStats] = useState<any[]>([]);
  const [impactStatsLoading, setImpactStatsLoading] = useState(true);

  const [courses, setCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  const [gallery, setGallery] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  const [stars, setStars] = useState<any[]>([]);
  const [starsLoading, setStarsLoading] = useState(true);

  const [enquiryUrl, setEnquiryUrl] = useState(DEFAULT_GOOGLE_FORM_URL);

  // --- Firestore Effects ---
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'hero_banners'), where('isActive', '==', true), orderBy('order', 'asc')));
        setBanners(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setBannersLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'site_settings', 'global'));
        if (snap.exists() && snap.data().enquiryFormUrl) {
          setEnquiryUrl(snap.data().enquiryFormUrl);
        }
      } catch (err) {
        console.error("Error fetching global enquiry URL:", err);
      }
    };
    fetchGlobalSettings();
  }, []);

  useEffect(() => {
    const fetchImpactStats = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'impact_stats'), orderBy('order', 'asc')));
        const allStats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setImpactStats(allStats.filter((s: any) => s.isPublished));
      } catch (err) {
        console.error("Error fetching impact stats:", err);
      } finally {
        setImpactStatsLoading(false);
      }
    };
    fetchImpactStats();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'courses'), where('isPublished', '==', true), orderBy('order', 'asc')));
        setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'testimonials'), where('isPublished', '==', true), orderBy('order', 'asc')));
        setTestimonials(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'gallery'), where('isPublished', '==', true), orderBy('order', 'asc')));
        setGallery(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setGalleryLoading(false);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'stars'), where('isPublished', '==', true), orderBy('order', 'asc')));
        setStars(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("Error fetching stars:", err);
      } finally {
        setStarsLoading(false);
      }
    };
    fetchStars();
  }, []);

  useEffect(() => {
    if (!heroApi) return;
    heroApi.on("select", () => {
      setHeroCurrent(heroApi.selectedScrollSnap());
    });
  }, [heroApi]);

  const renderImpactStatIcon = (iconName: string) => {
    const IconComp = ICON_MAP[iconName] || Users;
    return <IconComp className="w-5 h-5" />;
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative w-full pt-0 overflow-hidden">
        {bannersLoading ? (
          <div className="w-full h-[500px] md:h-[600px] bg-muted animate-pulse flex items-center justify-center">
            <Loader2 className="animate-spin w-10 h-10 text-primary" />
          </div>
        ) : banners && banners.length > 0 ? (
          <Carousel 
            setApi={setHeroApi} 
            opts={{ loop: true }} 
            plugins={[autoplayHero.current]}
            className="w-full relative group"
          >
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <div className={cn("relative w-full min-h-[500px] md:h-[600px] flex items-center overflow-hidden py-12 md:py-0 bg-secondary")}>
                    <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-left">
                      <div className="text-white space-y-4 md:space-y-6">
                        <Badge className="bg-white/20 text-white border-none px-4 py-1.5 uppercase tracking-wider text-[10px] md:text-xs">
                          Promoted
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                          {banner.title}
                        </h1>
                        <p className="text-base md:text-xl text-white/80">
                          {banner.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                          <Button asChild size="lg" className="w-full sm:w-auto bg-white text-secondary hover:bg-white/90 font-bold rounded-full px-12 h-12 md:h-14 text-lg">
                            <Link href={banner.ctaLink || enquiryUrl}>{banner.ctaText || 'Enroll Now'}</Link>
                          </Button>
                          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10 font-bold rounded-full px-12 h-12 md:h-14 text-lg">
                            <a href="tel:9865440099">Call Counselor</a>
                          </Button>
                        </div>
                      </div>
                      <div className="hidden lg:block relative h-[400px] w-full max-w-xl ml-auto">
                        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/10 group">
                          {banner.imageUrl && (
                            <Image 
                              src={banner.imageUrl} 
                              alt={banner.title} 
                              fill 
                              className="object-cover transition-transform duration-700 group-hover:scale-105" 
                              priority
                              unoptimized={banner.imageUrl.includes('drive.google.com') || banner.imageUrl.includes('ibb.co')}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex left-4 lg:left-8 bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12 lg:h-14 lg:w-14 shadow-2xl transition-opacity opacity-0 group-hover:opacity-100 z-30" />
            <CarouselNext className="hidden md:flex right-4 lg:right-8 bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12 lg:h-14 lg:w-14 shadow-2xl transition-opacity opacity-0 group-hover:opacity-100 z-30" />

            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {banners.map((_, i) => (
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
        ) : null}
      </section>

      {/* 2. STATS STRIP */}
      <section id="stats" className="bg-white py-8 md:py-12 border-b relative z-30 -mt-6 md:-mt-12 mx-4 md:mx-12 lg:mx-auto max-w-7xl rounded-2xl md:rounded-3xl shadow-xl border">
        <div className="container mx-auto px-4">
          {impactStatsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
              {impactStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3 md:mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {renderImpactStatIcon(stat.iconName)}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-4xl font-bold text-secondary">{stat.value}</div>
                  <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
              {impactStats.length === 0 && (
                <div className="col-span-full py-2 text-muted-foreground italic text-sm">Empowering students in Madurai since 2007.</div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. SIMPLIFIED ABOUT SECTION */}
      <section id="about" className="py-20 bg-[#F5F5F5] scroll-mt-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-16 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-4">About Us</span>
                <h2 className="text-3xl md:text-5xl font-bold text-secondary leading-tight">
                  Madurai's Most Trusted Coaching Since 2007
                </h2>
              </div>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At Acharya Education, we understand the value of nurturing ambitious dreams from an early age. Since 2007, we have provided a unique and distinct learning experience. Unlike others who merely teach, we actively explore knowledge and foster practical understanding.
                </p>
                <p>
                  What sets us apart is our unwavering commitment to quality and academic standards. Our exceptional study materials, experienced teaching faculty, and well-structured programs make us Madurai's most trusted coaching institute.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Expert Faculty with 15+ Years Experience",
                  "Limited Batch Size of 15 Students",
                  "Personalized Attention & Doubt Clearing",
                  "Proven Results Since 2007"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CircleCheckBig className="text-primary w-5 h-5 shrink-0" />
                    <span className="font-bold text-secondary text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 font-bold shadow-lg group">
                <Link href="/about">
                  Know More About Us <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            {/* Stats Grid Right Side */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {[
                { val: '50,000+', label: 'Students Trained', color: 'text-primary' },
                { val: '300+', label: 'Teachers Benefited', color: 'text-primary' },
                { val: '7+', label: 'Centres', color: 'text-primary' },
                { val: '17+', label: 'Years of Excellence', color: 'text-primary' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col items-center text-center justify-center hover:shadow-md transition-shadow">
                  <div className={cn("text-2xl md:text-4xl font-bold mb-2", s.color)}>{s.val}</div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. COURSES SECTION */}
      <section id="courses" className="py-16 md:py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-4">Our Impulse</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto italic text-sm md:text-base">Guiding Madurai's brightest minds towards excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coursesLoading ? (
               Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-3xl" />)
            ) : courses?.map((course) => (
              <Card key={course.id} className="group hover:shadow-2xl transition-all duration-500 border rounded-2xl md:rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-secondary">{course.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] md:text-xs">{course.category}</Badge>
                  </div>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-10 md:h-12 text-sm">
                    <Link href={`/courses#${course.slug}`}>Explore Program <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUCCESS ROADMAP */}
      <section id="journey" className="py-20 bg-white scroll-mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-4">Success Roadmap</span>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary leading-tight">Your Path to Excellence</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Counseling', desc: 'Personalized guidance to pick the right academic path.', icon: <Users className="w-8 h-8" />, step: '01' },
              { title: 'Admission', desc: 'Smooth enrollment into Madurai’s most elite batches.', icon: <CircleCheckBig className="w-8 h-8" />, step: '02' },
              { title: 'Learning', desc: 'Rigorous training with PhD/Expert faculty members.', icon: <BookOpen className="w-8 h-8" />, step: '03' },
              { title: 'Success', desc: 'Regular testing and mentoring leading to top ranks.', icon: <Trophy className="w-8 h-8" />, step: '04' },
            ].map((s, i) => (
              <div key={i} className="relative group text-center md:text-left flex flex-col items-center md:items-start">
                <div className="absolute -top-10 -left-4 md:-left-8 text-7xl md:text-9xl font-black text-muted opacity-30 group-hover:opacity-50 transition-opacity z-0 pointer-events-none">
                  {s.step}
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-secondary">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MEET OUR STARS SECTION */}
      {(starsLoading || (stars && stars.length > 0)) && (
        <section id="stars" className="py-16 md:py-24 bg-white scroll-mt-16 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-8 md:mb-12 font-headline">
                Meet Our Stars <span className="text-[#FFC107]">✦</span>
              </h2>

              <div className="relative group px-1 md:px-12">
                {starsLoading ? (
                  <div className="flex gap-4 md:gap-6 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Skeleton key={i} className="w-[140px] sm:w-[160px] md:w-[180px] h-[220px] md:h-[280px] rounded-xl md:rounded-2xl shrink-0" />
                    ))}
                  </div>
                ) : (
                  <Carousel
                    opts={{
                      align: "start",
                      loop: stars.length > 4,
                    }}
                    plugins={[autoplayStars.current]}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {stars.map((star) => (
                        <CarouselItem key={star.id} className="pl-4 basis-[140px] sm:basis-[160px] md:basis-[200px] lg:basis-[220px]">
                          <div className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer border border-border h-full flex flex-col">
                            <div className="h-32 sm:h-36 md:h-44 bg-gradient-to-br from-[#1A237E] to-[#D32F2F] flex items-center justify-center relative shrink-0">
                              {star.photo ? (
                                <Image 
                                  src={star.photo} 
                                  alt={star.name} 
                                  fill 
                                  className="object-cover" 
                                  unoptimized={star.photo.includes('drive.google.com') || star.photo.includes('ibb.co')}
                                />
                              ) : (
                                <span className="text-white text-2xl md:text-4xl font-bold">{getInitials(star.name)}</span>
                              )}
                              <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 px-2 text-center">
                                <span className="text-white text-[8px] md:text-[10px] font-bold uppercase tracking-wider">
                                  {star.exam}
                                </span>
                              </div>
                            </div>
                            <div className="p-3 md:p-4 text-left flex-1 flex flex-col justify-between">
                              <div>
                                <p className="font-bold text-[#1C1C1C] text-xs md:text-sm truncate">{star.name}</p>
                                <p className="text-muted-foreground text-[8px] md:text-[10px] mt-0.5 line-clamp-1">{star.courseName}</p>
                              </div>
                              <p className="text-[#D32F2F] font-bold text-base md:text-lg mt-2 md:mt-3">{star.score}</p>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-4 bg-white border shadow-md hover:bg-muted" />
                    <CarouselNext className="hidden md:flex -right-4 bg-white border shadow-md hover:bg-muted" />
                  </Carousel>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. GALLERY SECTION */}
      {(galleryLoading || (gallery && gallery.length > 0)) && (
        <section id="gallery" className="py-16 md:py-24 bg-muted/30 scroll-mt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <Badge className="bg-primary/10 text-primary border-none mb-4">Inside Acharya</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary">Glimpses of Success</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryLoading ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)
              ) : gallery?.map((img, i) => (
                <div key={i} className={cn(
                  "relative overflow-hidden rounded-2xl shadow-lg group",
                  i === 0 && "col-span-2 row-span-2 h-[300px] md:h-[500px]",
                  i !== 0 && "h-[140px] md:h-[240px]"
                )}>
                  {img.imageUrl && (
                    <Image 
                      src={img.imageUrl} 
                      alt={img.caption || 'Gallery'} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      unoptimized={img.imageUrl.includes('drive.google.com') || img.imageUrl.includes('ibb.co')}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. TESTIMONIALS SECTION */}
      {(testimonialsLoading || (testimonials && testimonials.length > 0)) && (
        <section id="testimonials" className="py-16 md:py-24 bg-white scroll-mt-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-12 md:mb-16 text-center">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonialsLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-3xl" />)
              ) : testimonials?.map((t, i) => (
                <Card key={i} className="border-none shadow-xl rounded-2xl md:rounded-3xl p-6 md:p-10 bg-muted/30">
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary mb-4 md:mb-6 opacity-20 mx-auto" />
                  <p className="text-base md:text-lg italic text-secondary mb-6 md:mb-8 text-center">"{t.review}"</p>
                  <div className="text-center">
                    <h4 className="font-bold text-secondary text-sm md:text-base">{t.studentName}</h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase mt-1 tracking-widest">{t.course} | {t.result}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. ENQUIRE SECTION */}
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
