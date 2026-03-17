"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { addDoc, collection } from 'firebase/firestore';
import { db, serverTimestamp } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Gift, Zap, GraduationCap, CheckCircle2, Loader2 } from 'lucide-react';

export default function ScholarshipPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await addDoc(collection(db, 'scholarship_leads'), {
        name: formData.get('name'),
        phone: formData.get('phone'),
        class: formData.get('class'),
        timestamp: serverTimestamp(),
      });
      toast({
        title: "Early Interest Registered!",
        description: "We'll notify you once AEST 2025 registrations open! 🏆",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
       toast({
         variant: 'destructive',
         title: "Error",
         description: "Failed to register. Please try again later."
       });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-white/20 mb-6 py-1 px-4 border-none text-white">Acharya Excellence Scholarship Test</Badge>
          <h1 className="text-4xl md:text-7xl font-bold mb-6">Win Up to 100% Scholarship</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">The AEST 2025 is your chance to secure premium coaching at minimal costs. Registration starts soon!</p>
          
          <div className="flex justify-center items-center gap-8 text-center bg-black/10 p-8 rounded-3xl backdrop-blur-md max-w-md mx-auto border border-white/10">
             <div>
               <div className="text-4xl font-bold">15</div>
               <div className="text-xs uppercase opacity-60">Days Left</div>
             </div>
             <div className="text-2xl opacity-40">:</div>
             <div>
               <div className="text-4xl font-bold">10</div>
               <div className="text-xs uppercase opacity-60">Hours Left</div>
             </div>
             <div className="text-2xl opacity-40">:</div>
             <div>
               <div className="text-4xl font-bold">45</div>
               <div className="text-xs uppercase opacity-60">Mins Left</div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Form */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl border border-border">
              <h2 className="text-3xl font-bold text-secondary mb-6">Register for Notification</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter student's name" required className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="Enter mobile number" required className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Current Class</Label>
                  <select name="class" id="class" className="w-full h-12 rounded-xl border border-input px-3 bg-white" required>
                    <option value="">Select Class</option>
                    {[6,7,8,9,10,11,12].map(c => <option key={c} value={`Class ${c}`}>Class {c}</option>)}
                  </select>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 h-14 text-lg rounded-xl">
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Get Notified"}
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-10">
               <div>
                 <h2 className="text-3xl font-bold text-secondary mb-6">Why appear for AEST?</h2>
                 <div className="space-y-6">
                   {[
                     { title: "Scholarship Rewards", desc: "Up to 100% waiver on tuition fees for top rankers.", icon: <Trophy className="text-primary" /> },
                     { title: "Skill Analysis", desc: "Know your standing against aspirants from all over Madurai.", icon: <Zap className="text-secondary" /> },
                     { title: "Special Admission", desc: "Get priority admission into our elite 'Diamond Batch'.", icon: <Gift className="text-primary" /> }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6">
                        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center shrink-0">{item.icon}</div>
                        <div>
                          <h4 className="text-xl font-bold text-secondary mb-2">{item.title}</h4>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-secondary p-8 rounded-3xl text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <GraduationCap className="w-10 h-10 text-primary" />
                    <h3 className="text-2xl font-bold">Eligibility</h3>
                  </div>
                  <ul className="space-y-3 opacity-80">
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> All students from Class 6 to 12</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> CBSE, ICSE & State Board aspirants</li>
                     <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Medical (NEET) & Engineering (JEE) focused</li>
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
