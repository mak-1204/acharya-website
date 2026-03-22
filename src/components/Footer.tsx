'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MAPS_URL = "https://maps.app.goo.gl/TZzPBCmpdXqS4KDC6";
const INSTAGRAM_URL = "https://www.instagram.com/acharyaeducation_madurai?igsh=MTduemJtM2s4aDIyYw==";
const LINKEDIN_URL = "https://www.linkedin.com/in/acharya-education-b17a35275/";

export const Footer = () => {
  const [year, setYear] = useState("2025");
  const logoImage = PlaceHolderImages.find(img => img.id === 'footer-logo');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-secondary text-white pt-16 pb-8 w-full overflow-x-hidden border-t-4 border-primary">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-start gap-6">
              {/* White Square Logo Container */}
              <div className="bg-white p-2 rounded-xl w-24 h-24 flex items-center justify-center shrink-0 shadow-lg">
                {logoImage && (
                  <Image 
                    src={logoImage.imageUrl} 
                    alt={logoImage.description} 
                    width={80}
                    height={80}
                    className="object-contain"
                    data-ai-hint={logoImage.imageHint}
                  />
                )}
              </div>
              
              {/* Vertical Separator */}
              <div className="w-px h-20 bg-white/20 self-center hidden sm:block"></div>
              
              {/* Brand Text */}
              <div className="space-y-1">
                <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
                  IIT, NEET & Beyond
                </h3>
                <p className="text-primary font-bold text-lg">
                  Since 2007.
                </p>
                <p className="text-white/60 text-sm italic leading-relaxed max-w-[180px]">
                  Madurai's trusted partner in academic excellence.
                </p>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pl-2">
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a 
                href={LINKEDIN_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Acharya</Link></li>
              <li><Link href="/results" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Courses Section */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest">
              COURSES
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><Link href="/courses#jee" className="hover:text-white transition-colors">JEE Main & Advanced</Link></li>
              <li><Link href="/courses#neet" className="hover:text-white transition-colors">NEET Medical</Link></li>
              <li><Link href="/courses#cuet" className="hover:text-white transition-colors">CUET Prep</Link></li>
              <li><Link href="/courses#clat" className="hover:text-white transition-colors">CLAT (Law)</Link></li>
              <li><Link href="/courses#integrated" className="hover:text-white transition-colors">Integrated Program</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest">
              CONTACT US
            </h4>
            <ul className="space-y-5 text-white/80 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-snug opacity-70">No. 9, 8th St, Karpaga Nagar, K. Pudur, Madurai - 625007</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="font-bold">98654 40099 / 88704 40099</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="break-all opacity-70">Acharyaeducation.madurai@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Location Section */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest">
              OUR LOCATION
            </h4>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.8354673857326!2d78.1477893!3d9.9496002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c5d0ff406d7f%3A0x94de6a503a7fe!2s207%2C%207%2C%208th%20St%2C%20Muthuramalingapuram%2C%20Karpaga%20Nagar%2C%20K.Pudur%2C%20Madurai%2C%20Tamil%20Nadu%20625007!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                loading="lazy"
                title="Acharya Education Location"
              ></iframe>
              <a 
                href={MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-3 left-3 bg-white/90 text-secondary text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg backdrop-blur-sm hover:bg-white transition-colors"
              >
                Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-xs text-white/40 uppercase tracking-widest font-bold">
          <p>© {year} ACHARYA EDUCATION. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};