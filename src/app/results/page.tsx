import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Award, Users } from 'lucide-react';
import Link from 'next/link';

export default function ResultsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Results Speak</h1>
          <p className="text-white/80 max-w-2xl mx-auto">Celebrating the hard work and dedication of Acharya students over the years.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Stats Strip */}
      <section className="bg-secondary py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-around gap-8 text-center">
            <div>
               <div className="text-3xl font-bold">50,000+</div>
               <div className="text-xs uppercase tracking-widest opacity-60">Students Trained</div>
            </div>
            <div>
               <div className="text-3xl font-bold">300+</div>
               <div className="text-xs uppercase tracking-widest opacity-60">Rank Holders</div>
            </div>
            <div>
               <div className="text-3xl font-bold">17+</div>
               <div className="text-xs uppercase tracking-widest opacity-60">Years Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Results Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">JEE & NEET Champions 2024</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { name: "Anish Kumar", exam: "JEE Mains", result: "99.8 %ile", image: "https://picsum.photos/seed/res1/400/500" },
               { name: "Ayesha Mariam", exam: "NEET", result: "685/720", image: "https://picsum.photos/seed/res2/400/500" },
               { name: "Shruthika", exam: "NEET", result: "672/720", image: "https://picsum.photos/seed/res3/400/500" },
               { name: "Raghav Ganesh", exam: "JEE Adv", result: "AIR 1204", image: "https://picsum.photos/seed/res4/400/500" },
               { name: "Josalin Mattews", exam: "CUET", result: "99.5 %ile", image: "https://picsum.photos/seed/res5/400/500" },
               { name: "M. Karthik", exam: "NEET", result: "645/720", image: "https://picsum.photos/seed/res6/400/500" }
             ].map((r, i) => (
               <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-border">
                 <div className="relative aspect-[4/5]">
                    <Image src={r.image} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint="student result poster" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                       <Badge className="bg-primary mb-2">{r.exam}</Badge>
                       <h3 className="text-2xl font-bold">{r.name}</h3>
                       <div className="text-yellow-400 font-bold text-xl mt-1">{r.result}</div>
                    </div>
                 </div>
               </div>
             ))}
          </div>

          <div className="mt-20 bg-muted/30 rounded-3xl p-12 text-center border border-dashed border-primary/30">
             <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
             <h3 className="text-3xl font-bold text-secondary mb-4">Be Our Next Star</h3>
             <p className="text-muted-foreground mb-8 max-w-xl mx-auto">The path to competitive success starts with the right foundation. Enroll today and start writing your success story.</p>
             <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-12 h-14 text-lg">
                <Link href="/contact">Enquire Now</Link>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
