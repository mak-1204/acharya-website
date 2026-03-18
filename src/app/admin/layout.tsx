'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2, LayoutDashboard, LayoutTemplate, ImageIcon, MessageSquare, Star, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip guard for login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-[100]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Verifying Session...</p>
        </div>
      </div>
    );
  }

  // If on login page, just render children without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated and not on login page (safety check)
  if (!user && pathname !== '/admin/login') return null;

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Courses & Banners', href: '/admin/courses-banners', icon: LayoutTemplate },
    { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Our Stars', href: '/admin/stars', icon: Star },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white hidden md:flex flex-col fixed inset-y-0 border-r border-white/10">
        <div className="p-8 font-bold text-2xl tracking-tighter border-b border-white/5 text-center">
          ACHARYA <span className="text-primary">ADMIN</span>
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group",
                  isActive 
                    ? "bg-primary text-white shadow-lg" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <link.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-white/40 group-hover:text-white")} />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/5 space-y-2">
          <Link 
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white transition-colors text-xs font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            View Live Site
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-bold"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        <div className="max-w-7xl mx-auto p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
