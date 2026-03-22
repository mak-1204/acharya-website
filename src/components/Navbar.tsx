"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { useFirestore } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const DEFAULT_GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdU7f-A8m7OqD7-r1tI_mO8-z8U-v-placeholder/viewform";

const NAV_LINKS = [
  { name: 'Home', href: '/#hero' },
  { name: 'All Courses', href: '/courses', isExternal: true },
  { name: 'About', href: '/#about' },
  { name: 'Results', href: '/#stars' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Contact', href: '/#contact' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [enquiryUrl, setEnquiryUrl] = useState(DEFAULT_GOOGLE_FORM_URL);
  const db = useFirestore();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(
      doc(db, 'site_settings', 'general'),
      (snap) => {
        if (snap.exists() && snap.data().enquiryFormUrl) {
          setEnquiryUrl(snap.data().enquiryFormUrl);
        }
      },
      (err) => {
        console.error("Error watching global settings:", err);
      }
    );
    return () => unsub();
  }, [db]);

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
    const sections = ['hero', 'courses', 'stars', 'about', 'why', 'journey', 'gallery', 'testimonials', 'enquire', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal && pathname !== '/courses') return;
    
    if (isHomePage && href.startsWith('/#')) {
      e.preventDefault();
      setIsMenuOpen(false);
      const targetId = href.replace('/#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        window.scrollTo({
          top: elem.offsetTop - 64,
          behavior: 'smooth'
        });
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-t-4 border-[#D32F2F]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/#hero" 
          onClick={(e) => handleLinkClick(e, "/#hero")}
          className="flex items-center shrink-0 bg-white p-1 rounded-lg"
        >
          <Logo className="h-8 sm:h-10 md:h-12" />
        </Link>

        {/* Desktop Nav Links (lg+) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center px-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.isExternal)}
              className={cn(
                'text-xs xl:text-sm font-bold transition-colors hover:text-[#D32F2F] whitespace-nowrap uppercase tracking-wider',
                (isHomePage && activeSection === (link.href.startsWith('/#') ? link.href.substring(2) : link.href))
                  ? 'text-[#D32F2F]' 
                  : 'text-foreground/80'
              )}
            >
              {link.name} {link.isExternal && <span className="text-[10px] lowercase align-middle">▾</span>}
            </Link>
          ))}
        </div>

        {/* Desktop Action Buttons (lg+) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
          <div className="flex flex-col items-end">
            <a
              href="tel:9865440099"
              className="flex items-center text-[10px] xl:text-xs font-bold text-[#1A237E] hover:text-[#D32F2F] transition-colors"
            >
              <Phone className="w-3 h-3 mr-1.5" />
              9865440099
            </a>
            <a
              href="tel:8870440099"
              className="flex items-center text-[10px] xl:text-xs font-bold text-[#1A237E] hover:text-[#D32F2F] transition-colors"
            >
              <Phone className="w-3 h-3 mr-1.5" />
              8870440099
            </a>
          </div>
          <Button asChild className="bg-[#D32F2F] hover:bg-[#D32F2F]/90 rounded-full font-bold px-4 xl:px-6 h-9 xl:h-10 text-xs xl:text-sm text-white shadow-lg">
            <a href={enquiryUrl} target="_blank" rel="noopener noreferrer">Enquire Now</a>
          </Button>
        </div>

        {/* Tablet/Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          {/* Tablet Only Enquire (md+) */}
          <Button asChild className="hidden sm:flex lg:hidden bg-[#D32F2F] hover:bg-[#D32F2F]/90 rounded-full font-bold px-4 h-9 text-xs shadow-md text-white">
            <a href={enquiryUrl} target="_blank" rel="noopener noreferrer">Enquire</a>
          </Button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={cn(
          "fixed inset-0 top-16 w-full bg-white z-[60] transition-all duration-300 lg:hidden transform",
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="flex flex-col p-6 h-full overflow-y-auto">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.isExternal)}
                className={cn(
                  'text-sm font-bold flex items-center justify-between py-4 border-b border-muted uppercase tracking-wide',
                  (isHomePage && activeSection === (link.href.startsWith('/#') ? link.href.substring(2) : link.href))
                    ? 'text-[#D32F2F]' 
                    : 'text-foreground/80'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-8 pb-12 space-y-4">
            <div className="p-4 bg-muted rounded-2xl flex flex-col items-center gap-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Support Line</p>
              <div className="flex flex-col items-center gap-1">
                <a
                  href="tel:9865440099"
                  className="flex items-center gap-3 text-xl font-bold text-[#1A237E]"
                >
                  <Phone className="w-5 h-5" />
                  9865440099
                </a>
                <a
                  href="tel:8870440099"
                  className="flex items-center gap-3 text-xl font-bold text-[#1A237E]"
                >
                  <Phone className="w-5 h-5" />
                  8870440099
                </a>
              </div>
            </div>
            <Button asChild className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/90 rounded-xl h-14 text-lg font-bold shadow-lg text-white">
              <a href={enquiryUrl} target="_blank" rel="noopener noreferrer">Admission Enquiry</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
