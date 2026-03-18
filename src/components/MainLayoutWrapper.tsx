'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Conditionally renders the public site layout (Navbar, Footer, Call Button)
 * based on whether the current route is part of the admin portal.
 */
export function MainLayoutWrapper({ children }: MainLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
      {/* Floating Call Button - Only for Public Site */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <a
          href="tel:9865440099"
          className="flex items-center gap-1 bg-secondary text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-2xl hover:bg-secondary/90 hover:scale-110 transition-all font-bold text-xs md:text-lg border-2 border-white/20"
        >
          <span className="bg-white/20 p-1 rounded-full flex items-center justify-center">📞</span>
          Call Now
        </a>
      </div>
    </>
  );
}
