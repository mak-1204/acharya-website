
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Results', href: '/results' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Scholarship', href: '/scholarship' },
  { name: 'Contact', href: '/contact' },
];

const COURSE_LINKS = [
  { name: 'NEET', href: '/courses/neet' },
  { name: 'JEE', href: '/courses/jee' },
  { name: 'CUET', href: '/courses/cuet' },
  { name: 'CLAT', href: '/courses/clat' },
  { name: 'Integrated School', href: '/courses/integrated' },
  { name: 'Intensive Tuition', href: '/courses/tuition' },
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
          <Link
            href="/"
            className={cn(
              'text-sm font-semibold transition-colors hover:text-primary',
              pathname === '/' ? 'text-primary' : 'text-foreground'
            )}
          >
            Home
          </Link>

          {/* Courses Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold transition-colors hover:text-primary outline-none">
              All Courses <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl p-2 w-56">
              {COURSE_LINKS.map((link) => (
                <DropdownMenuItem key={link.href} asChild className="rounded-lg cursor-pointer py-3">
                  <Link href={link.href} className="font-semibold text-secondary">{link.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-3 border-t">
                <Link href="/courses" className="font-bold text-primary">View All Categories</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {NAV_LINKS.filter(l => l.name !== 'Home').map((link) => (
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
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-full font-bold">
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
                <Link href="/" className="text-lg font-semibold flex items-center justify-between">Home <ChevronRight className="w-4 h-4 opacity-50" /></Link>
                
                <div className="space-y-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Courses</p>
                  <div className="grid grid-cols-1 gap-3">
                    {COURSE_LINKS.map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm font-bold text-secondary bg-muted/50 p-3 rounded-xl flex justify-between items-center">
                        {link.name} <ChevronRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                </div>

                {NAV_LINKS.filter(l => l.name !== 'Home').map((link) => (
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
                   <Button asChild className="w-full bg-primary rounded-xl h-12">
                     <Link href="/contact">Enquire Now</Link>
                   </Button>
                   <Button asChild variant="outline" className="w-full border-secondary text-secondary rounded-xl h-12">
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
