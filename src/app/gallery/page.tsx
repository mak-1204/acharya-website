"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Search } from 'lucide-react';

const IMAGES = [
  { id: 1, category: 'classroom', title: 'Interactive Learning', url: 'https://picsum.photos/seed/gal1/600/400' },
  { id: 2, category: 'events', title: 'Annual Day', url: 'https://picsum.photos/seed/gal2/400/600' },
  { id: 3, category: 'campus', title: 'Our Front Desk', url: 'https://picsum.photos/seed/gal3/600/600' },
  { id: 4, category: 'classroom', title: 'Biology Lab', url: 'https://picsum.photos/seed/gal4/500/300' },
  { id: 5, category: 'events', title: 'Ranker Celebration', url: 'https://picsum.photos/seed/gal5/400/400' },
  { id: 6, category: 'campus', title: 'Study Hall', url: 'https://picsum.photos/seed/gal6/800/600' },
  { id: 7, category: 'results', title: 'JEE 2024 Toppers', url: 'https://picsum.photos/seed/gal7/600/400' },
  { id: 8, category: 'results', title: 'NEET 2024 Toppers', url: 'https://picsum.photos/seed/gal8/400/500' },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' ? IMAGES : IMAGES.filter(img => img.category === filter);

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Life at Acharya</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Glimpses of our vibrant academic culture and student success.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <Tabs defaultValue="all" onValueChange={setFilter} className="w-auto">
              <TabsList className="bg-white border p-1 rounded-full h-auto">
                 <TabsTrigger value="all" className="rounded-full px-6 py-2">ALL</TabsTrigger>
                 <TabsTrigger value="classroom" className="rounded-full px-6 py-2">CLASSROOM</TabsTrigger>
                 <TabsTrigger value="events" className="rounded-full px-6 py-2">EVENTS</TabsTrigger>
                 <TabsTrigger value="campus" className="rounded-full px-6 py-2">CAMPUS</TabsTrigger>
                 <TabsTrigger value="results" className="rounded-full px-6 py-2">RESULTS</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
             {filteredImages.map((img) => (
               <div key={img.id} className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all break-inside-avoid">
                 <Image
                   src={img.url}
                   alt={img.title}
                   width={600}
                   height={600}
                   className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                   data-ai-hint="gallery photo"
                 />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                    <Search className="w-10 h-10 mb-2" />
                    <p className="font-bold text-lg">{img.title}</p>
                    <p className="text-xs uppercase tracking-widest opacity-80">{img.category}</p>
                 </div>
               </div>
             ))}
          </div>

          <div className="mt-20 text-center bg-white p-12 rounded-3xl border border-dashed">
             <p className="text-xl text-muted-foreground italic mb-2">"Education is the most powerful weapon which you can use to change the world."</p>
             <p className="font-bold text-secondary">— Nelson Mandela</p>
          </div>
        </div>
      </section>
    </div>
  );
}
