
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block bg-white p-2 rounded-lg">
              <Image 
                src="/logo.png" 
                alt="Acharya Education" 
                width={180} 
                height={50} 
                className="h-auto w-44 object-contain"
              />
            </Link>
            <p className="text-white/70 leading-relaxed">
              Guiding Students to IIT, NEET & Beyond Since 2007. Madurai's most trusted partner in academic excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-primary">
              Quick Links
            </h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Acharya</Link></li>
              <li><Link href="/results" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Our Gallery</Link></li>
              <li><Link href="/scholarship" className="hover:text-white transition-colors">AEST Scholarship</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-primary">
              Our Courses
            </h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="/courses" className="hover:text-white transition-colors">JEE Main & Advanced</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">NEET Medical</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">CUET Foundation</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">CLAT (Law)</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Integrated School Program</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-primary">
              Contact Us
            </h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>No. 207, 8th St, Muthuramalingapuram, Karpaga Nagar, K. Pudur, Madurai - 625007</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>9865440099</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>Acharyaeducation.madurai@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>© 2025 Acharya Education. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
