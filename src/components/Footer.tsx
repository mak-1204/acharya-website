
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-secondary text-white pt-12 md:pt-20 pb-8 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-12 text-center sm:text-left">
          {/* Brand */}
          <div className="space-y-6 flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-block bg-white p-3 rounded-xl">
              <Logo className="h-10 md:h-12" />
            </Link>
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-sm">
              Guiding Students to IIT, NEET & Beyond Since 2007. Madurai's most trusted partner in academic excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg md:text-xl font-bold relative pb-3 inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:w-12 after:h-1 after:bg-primary">
              Quick Links
            </h4>
            <ul className="space-y-3 text-white/70 text-sm md:text-base">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Acharya</Link></li>
              <li><Link href="/results" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Our Gallery</Link></li>
              <li><Link href="/scholarship" className="hover:text-primary transition-colors">AEST Scholarship</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-6">
            <h4 className="text-lg md:text-xl font-bold relative pb-3 inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:w-12 after:h-1 after:bg-primary">
              Our Courses
            </h4>
            <ul className="space-y-3 text-white/70 text-sm md:text-base">
              <li><Link href="/courses#jee" className="hover:text-primary transition-colors">JEE Main & Advanced</Link></li>
              <li><Link href="/courses#neet" className="hover:text-primary transition-colors">NEET Medical</Link></li>
              <li><Link href="/courses#cuet" className="hover:text-primary transition-colors">CUET Prep</Link></li>
              <li><Link href="/courses#clat" className="hover:text-primary transition-colors">CLAT (Law)</Link></li>
              <li><Link href="/courses#integrated" className="hover:text-primary transition-colors">Integrated School Program</Link></li>
            </ul>
          </div>

          {/* Contact & Map Integration */}
          <div className="space-y-6">
            <h4 className="text-lg md:text-xl font-bold relative pb-3 inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:w-12 after:h-1 after:bg-primary">
              Contact Us
            </h4>
            <ul className="space-y-4 text-white/80 text-xs md:text-sm flex flex-col items-center sm:items-start">
              <li className="flex gap-3 justify-center sm:justify-start group">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="leading-relaxed">No. 207, 8th St, Muthuramalingapuram, Karpaga Nagar, K. Pudur, Madurai - 625007</span>
              </li>
              <li className="flex gap-3 justify-center sm:justify-start group">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="font-bold">9865440099</span>
              </li>
              <li className="flex gap-3 justify-center sm:justify-start group">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="break-all">Acharyaeducation.madurai@gmail.com</span>
              </li>
              <li className="flex gap-3 justify-center sm:justify-start group">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Integrated Map */}
        <div className="w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8 border border-white/10 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.982548485292!2d78.1481132!3d9.935406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTYnMDEuNSJOIDc4wrAwOCU1My4yIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
            className="w-full h-full border-0" 
            loading="lazy"
          ></iframe>
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
