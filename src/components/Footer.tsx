
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';

const MAPS_URL = "https://www.google.com/maps/place/207,+7,+8th+St,+Muthuramalingapuram,+Karpaga+Nagar,+K.Pudur,+Madurai,+Tamil+Nadu+625007,+India/@9.9496341,78.1479403,20.63z/data=!4m5!3m4!1s0x3b00c5d0ff406d7f:0x94de6a503a7fe!8m2!3d9.9496002!4d78.1477893?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D";
const INSTAGRAM_URL = "https://www.instagram.com/acharyaeducation_madurai?igsh=MTduemJtM2s4aDIyYw==";
const LINKEDIN_URL = "https://www.linkedin.com/in/acharya-education-b17a35275/";

export const Footer = () => {
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-secondary text-white py-8 md:py-12 w-full overflow-x-hidden border-t-4 border-primary">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 mb-8 text-center sm:text-left">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-4 flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-block bg-white p-2 rounded-lg">
              <Logo className="h-8 md:h-10" />
            </Link>
            <p className="text-white/70 text-xs md:text-[13px] leading-relaxed max-w-xs">
              IIT, NEET & Beyond Since 2007. Madurai's trusted partner in academic excellence.
            </p>
            <div className="flex space-x-3">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a 
                href={LINKEDIN_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm md:text-base font-bold text-primary uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-white/60 text-xs md:text-[13px]">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Acharya</Link></li>
              <li><Link href="/results" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/scholarship" className="hover:text-primary transition-colors">Scholarship</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm md:text-base font-bold text-primary uppercase tracking-wider">
              Courses
            </h4>
            <ul className="space-y-2 text-white/60 text-xs md:text-[13px]">
              <li><Link href="/courses#jee" className="hover:text-primary transition-colors">JEE Main & Advanced</Link></li>
              <li><Link href="/courses#neet" className="hover:text-primary transition-colors">NEET Medical</Link></li>
              <li><Link href="/courses#cuet" className="hover:text-primary transition-colors">CUET Prep</Link></li>
              <li><Link href="/courses#clat" className="hover:text-primary transition-colors">CLAT (Law)</Link></li>
              <li><Link href="/courses#integrated" className="hover:text-primary transition-colors">Integrated Program</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm md:text-base font-bold text-primary uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3 text-white/80 text-xs md:text-[13px] flex flex-col items-center sm:items-start">
              <li className="flex gap-2 justify-center sm:justify-start">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-snug">No. 207, 8th St, K. Pudur, Madurai - 07</span>
              </li>
              <li className="flex gap-2 justify-center sm:justify-start">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="font-bold">9865440099</span>
              </li>
              <li className="flex gap-2 justify-center sm:justify-start">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="break-all opacity-70">Acharyaeducation.madurai@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Compact Map on the Right */}
          <div className="lg:col-span-3 space-y-4 flex flex-col items-center sm:items-start">
            <h4 className="text-sm md:text-base font-bold text-primary uppercase tracking-wider">
              Our Location
            </h4>
            <a 
              href={MAPS_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full h-32 rounded-xl overflow-hidden border border-white/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 block group relative"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.8354673857326!2d78.1477893!3d9.9496002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5d0ff406d7f%3A0x94de6a503a7fe!2s207%2C%207%2C%208th%20St%2C%20Muthuramalingapuram%2C%20Karpaga%20Nagar%2C%20K.Pudur%2C%20Madurai%2C%20Tamil%20Nadu%20625007!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 pointer-events-none" 
                loading="lazy"
                title="Acharya Education Location"
              ></iframe>
              <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] md:text-xs text-white/40 text-center md:text-left uppercase tracking-tighter font-semibold">
          <p>© {year} Acharya Education. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
