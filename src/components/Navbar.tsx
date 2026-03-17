"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Results', href: '/results' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Scholarship', href: '/scholarship' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-2xl font-bold tracking-tighter">
            <span className="text-primary">ACHARYA</span>{' '}
            <span className="text-secondary">EDUCATION</span>
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Since 2007 • Madurai
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-semibold transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="tel:9865440099"
            className="flex items-center text-sm font-bold text-secondary hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            9865440099
          </a>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/contact">Enquire Now</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center space-x-4">
           <a href="tel:9865440099" className="text-secondary">
             <Phone className="w-5 h-5" />
           </a>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-6 mt-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'text-lg font-semibold flex items-center justify-between',
                      pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                ))}
                <div className="pt-6 border-t flex flex-col space-y-4">
                   <Button asChild className="w-full bg-primary">
                     <Link href="/contact">Enquire Now</Link>
                   </Button>
                   <Button asChild variant="outline" className="w-full border-secondary text-secondary">
                     <a href="tel:9865440099">Call Support</a>
                   </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
