"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'All Courses', href: '/courses', isExternal: true },
  { name: 'About', href: '#about' },
  { name: 'Results', href: '#results' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Scholarship', href: '#scholarship' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Active link detection based on intersection observer
  useEffect(() => {
    if (!isHomePage) return;

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['hero', 'courses', 'stars', 'why', 'journey', 'mode', 'about', 'results', 'gallery', 'scholarship', 'testimonials', 'enquire', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal && pathname !== '/courses') return;
    
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      setIsMenuOpen(false);
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        window.scrollTo({
          top: elem.offsetTop - 64, // 64px is h-16
          behavior: 'smooth'
        });
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  const Logo = () => (
    <Link 
      href={isHomePage ? "#hero" : "/"} 
      onClick={(e) => handleLinkClick(e, "#hero")}
      className="flex flex-col shrink-0"
    >
      <div className="flex items-center text-lg md:text-2xl font-bold tracking-tighter leading-none font-headline">
        <span className="text-[#D32F2F] uppercase">ACHARYA</span>
        <span className="text-[#1A237E] uppercase ml-1">EDUCATION</span>
      </div>
      <span className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mt-0.5 leading-none">
        SINCE 2007 • MADURAI
      </span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-t-4 border-[#D32F2F]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav Links (lg and above) */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center px-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={isHomePage || link.isExternal ? link.href : `/${link.href}`}
              onClick={(e) => handleLinkClick(e, link.href, link.isExternal)}
              className={cn(
                'text-sm font-bold transition-colors hover:text-[#D32F2F] whitespace-nowrap uppercase tracking-wider',
                (isHomePage && activeSection === link.href.substring(1)) || (pathname === link.href)
                  ? 'text-[#D32F2F]' 
                  : 'text-foreground/80'
              )}
            >
              {link.name} {link.isExternal && <span className="text-[10px] lowercase align-middle">▾</span>}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side (lg and above) */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <a
            href="tel:9865440099"
            className="flex items-center text-sm font-bold text-[#1A237E] hover:text-[#D32F2F] transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            9865440099
          </a>
          <Button asChild className="bg-[#D32F2F] hover:bg-[#D32F2F]/90 rounded-full font-bold px-6 h-10 text-white shadow-lg">
            <Link href={isHomePage ? "#enquire" : "/#enquire"} onClick={(e) => handleLinkClick(e, "#enquire")}>Enquire Now</Link>
          </Button>
        </div>

        {/* Tablet & Mobile Right Side */}
        <div className="flex lg:hidden items-center gap-3">
          <Button asChild className="bg-[#D32F2F] hover:bg-[#D32F2F]/90 rounded-full font-bold px-4 h-9 text-xs shadow-md">
            <Link href={isHomePage ? "#enquire" : "/#enquire"} onClick={(e) => handleLinkClick(e, "#enquire")}>Enquire</Link>
          </Button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Drawer */}
      <div 
        className={cn(
          "absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-[#D32F2F] lg:hidden",
          isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-6 gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={isHomePage || link.isExternal ? link.href : `/${link.href}`}
              onClick={(e) => handleLinkClick(e, link.href, link.isExternal)}
              className={cn(
                'text-base font-bold flex items-center justify-between border-b pb-2 uppercase tracking-wide',
                (isHomePage && activeSection === link.href.substring(1)) || (pathname === link.href)
                  ? 'text-[#D32F2F] border-[#D32F2F]' 
                  : 'text-foreground/80 border-border'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <a
              href="tel:9865440099"
              className="flex items-center justify-center gap-2 text-lg font-bold text-[#1A237E] py-2 bg-muted rounded-xl"
            >
              <Phone className="w-5 h-5" />
              9865440099
            </a>
            <Button asChild className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/90 rounded-xl h-12 text-lg font-bold shadow-lg">
              <Link href={isHomePage ? "#enquire" : "/#enquire"} onClick={(e) => handleLinkClick(e, "#enquire")}>Enquire Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};