
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const [year, setYear] = useState("2025");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-secondary text-white pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white p-2 rounded-lg">
              <Image 
                src="/logo.png" 
                alt="Acharya Education" 
                width={180} 
                height={50} 
                className="h-auto w-36 md:w-44 object-contain"
              />
            </Link>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-sm">
              Guiding Students to IIT, NEET & Beyond Since 2007. Madurai's most trusted partner in academic excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:pl-4">
            <h4 className="text-base md:text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-primary">
              Quick Links
            </h4>
            <ul className="space-y-3 md:space-y-4 text-white/70 text-sm md:text-base">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Acharya</Link></li>
              <li><Link href="/results" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Our Gallery</Link></li>
              <li><Link href="/scholarship" className="hover:text-white transition-colors">AEST Scholarship</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="sm:pl-4">
            <h4 className="text-base md:text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-primary">
              Our Courses
            </h4>
            <ul className="space-y-3 md:space-y-4 text-white/70 text-sm md:text-base">
              <li><Link href="/courses#jee" className="hover:text-white transition-colors">JEE Main & Advanced</Link></li>
              <li><Link href="/courses#neet" className="hover:text-white transition-colors">NEET Medical</Link></li>
              <li><Link href="/courses#cuet" className="hover:text-white transition-colors">CUET Foundation</Link></li>
              <li><Link href="/courses#clat" className="hover:text-white transition-colors">CLAT (Law)</Link></li>
              <li><Link href="/courses#integrated" className="hover:text-white transition-colors">Integrated School Program</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:pl-4">
            <h4 className="text-base md:text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-primary">
              Contact Us
            </h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="leading-snug">No. 207, 8th St, Muthuramalingapuram, Karpaga Nagar, K. Pudur, Madurai - 625007</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>9865440099</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="break-all">Acharyaeducation.madurai@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-white/50 text-center md:text-left">
          <p>© {year} Acharya Education. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
