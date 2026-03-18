
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LayoutTemplate, BookOpen, ImageIcon, MessageSquare, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const STATS = [
    { label: 'Hero Banners', icon: LayoutTemplate, href: '/admin/courses-banners', color: 'bg-blue-500' },
    { label: 'Courses', icon: BookOpen, href: '/admin/courses-banners', color: 'bg-green-500' },
    { label: 'Gallery', icon: ImageIcon, href: '/admin/gallery', color: 'bg-primary' },
    { label: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials', color: 'bg-orange-500' },
    { label: 'Our Stars', icon: Star, href: '/admin/stars', color: 'bg-secondary' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-secondary mb-2 tracking-tight">Content Management</h1>
        <p className="text-muted-foreground text-lg">Select a section below to update your website content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATS.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-2xl text-white shadow-lg ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xl font-bold text-secondary mt-1">Manage Section</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="w-5 h-5" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>Live updates from your content collections.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground italic border-2 border-dashed rounded-3xl">
              Content activity logs will appear here as you make changes.
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-secondary text-white">
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
            <CardDescription className="text-white/60">How to manage your site effectively.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-white/10">
              <p className="font-bold">Image URLs</p>
              <p className="text-xs text-white/60 mt-1">Use high-quality Unsplash or hosted image URLs for the best visual experience.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10">
              <p className="font-bold">Display Order</p>
              <p className="text-xs text-white/60 mt-1">Lower numbers appear first in lists and carousels.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10">
              <p className="font-bold">Publish Toggles</p>
              <p className="text-xs text-white/60 mt-1">Unpublish items to hide them from the public site without deleting them.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
