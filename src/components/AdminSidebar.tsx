'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  LayoutTemplate, 
  Image as ImageIcon, 
  MessageSquare, 
  Star,
  ChevronRight,
  LogOut,
  ExternalLink
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
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <>
      <aside className="hidden lg:flex w-64 h-screen bg-secondary text-white flex-col fixed left-0 top-0 z-40 border-r border-white/10">
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

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link 
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white rounded-xl transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Website</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-xl transition-colors font-bold"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t border-white/10 z-50 p-2 flex justify-around">
        {ADMIN_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "p-3 rounded-xl transition-all",
                isActive ? "bg-primary text-white" : "text-white/60"
              )}
            >
              <link.icon className="w-6 h-6" />
            </Link>
          );
        })}
        <button 
          onClick={handleLogout}
          className="p-3 text-red-400"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};
