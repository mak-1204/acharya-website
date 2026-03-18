
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutTemplate, ImageIcon, MessageSquare, Star, ArrowRight, TrendingUp, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const SECTIONS = [
    { label: 'Hero Banners & Courses', icon: LayoutTemplate, href: '/admin/courses-banners', color: 'bg-blue-500', desc: 'Manage your home carousel and course listings.' },
    { label: 'Impact Stats', icon: BarChart3, href: '/admin/stats', color: 'bg-green-600', desc: 'Update the numbers (Students, Teachers, Centres) shown on landing page.' },
    { label: 'Campus Gallery', icon: ImageIcon, href: '/admin/gallery', color: 'bg-primary', desc: 'Update the visual tour of your institute.' },
    { label: 'Student Testimonials', icon: MessageSquare, href: '/admin/testimonials', color: 'bg-orange-500', desc: 'Edit reviews and success feedback.' },
    { label: 'Our Star Performers', icon: Star, href: '/admin/stars', color: 'bg-secondary', desc: 'Celebrate your top achieving students.' },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-secondary">Dashboard Overview</h1>
        <p className="text-muted-foreground text-lg italic">Welcome back! Manage your website content from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECTIONS.map((section) => (
          <Link key={section.label} href={section.href}>
            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl text-white shadow-lg ${section.color} group-hover:scale-110 transition-transform`}>
                    <section.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{section.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage Content <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-2 text-secondary">
            <TrendingUp className="w-5 h-5" />
            <CardTitle>Quick Management Guide</CardTitle>
          </div>
          <CardDescription>Tips for maintaining a great website presence.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="font-bold text-secondary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" /> Image Hosting
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use direct image URLs from hosted platforms. Ensure images are high resolution (at least 800px width).
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-secondary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" /> Sort Order
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The "Order" field determines display sequence. Lower numbers (like 1 or 2) appear first in lists.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-secondary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" /> Visibility
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the "Published" toggle to hide content without deleting it. Great for draft courses or past results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
