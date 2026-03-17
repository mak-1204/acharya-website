import React from 'react';
import Image from 'next/image';
import { ImpactCounter } from '@/components/ImpactCounter';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Acharya Education</h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Empowering students in Madurai since 2007 through quality education, 
            dedication, and a personalized approach to learning.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/about/800/1000"
                alt="Acharya Campus"
                fill
                className="object-cover"
                data-ai-hint="college campus"
              />
            </div>
            <div>
              <Badge className="bg-primary mb-4">Established 2007</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Madurai's Legacy of Excellence</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Since its inception in 2007, Acharya Education has provided a unique and distinct learning experience. 
                We believe that every student has the potential to succeed with the right guidance and support.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our approach combines rigorous academic training with a nurturing environment, 
                specializing in a limited batch size of just 15 students per class. This ensures that every 
                aspirant receives the individual attention they deserve.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   "Expert PhD/Post-Graduate Faculty",
                   "Customized Study Planners",
                   "Doubt Clearance by Subject Experts",
                   "Career Oriented Guidance"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <CheckCircle2 className="text-primary w-5 h-5" />
                     <span className="font-semibold text-secondary">{item}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To simplify learning and make quality education accessible. We aim to equip students with 
                problem-solving skills and the confidence required to clear India's toughest exams.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-border">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading coaching institute in South India, recognized for producing not just rankers, 
                but enlightened individuals ready to contribute to society and industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ImpactCounter />

      {/* Faculty */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">Our Expert Faculty</h2>
          <p className="text-muted-foreground mb-16">Meet the mentors who shape future leaders.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="space-y-4">
                 <div className="aspect-[4/5] bg-muted rounded-3xl overflow-hidden relative border group">
                   <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-semibold px-4 text-center">
                     Faculty Photo Coming Soon
                   </div>
                   <Image
                     src={`https://picsum.photos/seed/fac${i}/400/500`}
                     alt="Faculty"
                     fill
                     className="object-cover opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                     data-ai-hint="teacher portrait"
                   />
                 </div>
                 <div>
                   <h4 className="font-bold text-secondary text-lg">Senior Mentor</h4>
                   <p className="text-sm text-muted-foreground uppercase">Dept. of Science/Maths</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
