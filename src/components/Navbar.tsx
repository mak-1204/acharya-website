"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isHomePage) {
        const sections = NAV_LINKS.filter(l => !l.isExternal).map(l => l.href.substring(1));
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element && window.scrollY >= element.offsetTop - 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal) return;
    
    if (isHomePage) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        window.scrollTo({
          top: elem.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b bg-white/95 backdrop-blur-sm',
        isScrolled ? 'shadow-md py-2' : 'py-3'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          href={isHomePage ? "#hero" : "/"} 
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex flex-col shrink-0"
        >
          <span className="text-xl md:text-2xl font-bold tracking-tighter leading-none">
            <span className="text-primary uppercase">Acharya</span>{' '}
            <span className="text-secondary uppercase">Education</span>
          </span>
          <span className="text-[9px] md:text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mt-0.5 leading-none">
            Since 2007 • Madurai
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={isHomePage || link.isExternal ? link.href : `/${link.href}`}
              onClick={(e) => handleLinkClick(e, link.href, link.isExternal)}
              className={cn(
                'text-sm font-bold transition-colors hover:text-primary whitespace-nowrap uppercase tracking-wider',
                (isHomePage && activeSection === link.href.substring(1)) || (pathname === link.href)
                  ? 'text-primary' 
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-6 shrink-0">
          <a
            href="tel:9865440099"
            className="flex items-center text-sm font-bold text-secondary hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            9865440099
          </a>
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-full font-bold px-8 h-10 shadow-lg shadow-primary/20">
            <Link href="#enquire" onClick={(e) => handleLinkClick(e, "#enquire")}>Enquire Now</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center gap-4">
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
              <div className="flex flex-col space-y-4 mt-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={isHomePage || link.isExternal ? link.href : `/${link.href}`}
                    onClick={(e) => {
                      handleLinkClick(e, link.href, link.isExternal);
                    }}
                    className="text-lg font-bold flex items-center justify-between border-b pb-2"
                  >
                    {link.name}
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                ))}
                <div className="pt-6 flex flex-col space-y-4">
                   <Button asChild className="w-full bg-primary rounded-xl h-12 shadow-lg">
                     <Link href="#enquire">Enquire Now</Link>
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
