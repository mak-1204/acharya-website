
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  LayoutTemplate, 
  Image as ImageIcon, 
  MessageSquare, 
  Star,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Logo } from './Logo';

const ADMIN_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Courses & Banners', href: '/admin/courses-banners', icon: LayoutTemplate },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Our Stars', href: '/admin/stars', icon: Star },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-secondary text-white flex flex-col fixed left-0 top-0 z-40 border-r border-white/10">
      <div className="p-6 border-b border-white/10 flex justify-center">
        <Link href="/admin">
          <div className="bg-white p-2 rounded-xl">
            <Logo className="h-8" />
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 mt-4">
        {ADMIN_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group",
                isActive 
                  ? "bg-primary text-white shadow-lg" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white/50 group-hover:text-white")} />
              <span>{link.name}</span>
              {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Exit Admin</span>
        </Link>
      </div>
    </aside>
  );
};
