import React from 'react';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Get in touch with Madurai's leading coaching experts.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-secondary mb-4">Send us a Message</h2>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              <EnquiryForm source="contact_page" isMinimal />
            </div>

            {/* Info Section */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-8">Direct Contact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-secondary mb-1">Call Us</h4>
                    <p className="text-sm text-muted-foreground mb-2">Mon-Sat, 9AM-7PM</p>
                    <a href="tel:9865440099" className="text-lg font-bold text-primary hover:underline">9865440099</a>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-border">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-secondary mb-1">Email Us</h4>
                    <p className="text-sm text-muted-foreground mb-2">For admission enquiries</p>
                    <a href="mailto:Acharyaeducation.madurai@gmail.com" className="text-sm font-bold text-primary break-all hover:underline">Acharyaeducation.madurai@gmail.com</a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                   <MapPin className="text-primary w-5 h-5" /> Visit Our Campus
                </h3>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border mb-6">
                   <p className="text-muted-foreground leading-relaxed">
                     No. 207, 8th St, Muthuramalingapuram, Karpaga Nagar, K. Pudur, Madurai - 625007
                   </p>
                </div>
                {/* Mock Map Placeholder */}
                <div className="w-full h-80 bg-muted rounded-3xl overflow-hidden relative shadow-inner border">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 flex-col gap-2">
                    <MapPin className="w-12 h-12" />
                    <span className="font-bold">Interactive Map Placeholder</span>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.982548485292!2d78.1481132!3d9.935406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTYnMDEuNSJOIDc4wrAwOCU1My4yIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    className="w-full h-full grayscale opacity-70"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              <div className="bg-secondary p-8 rounded-3xl text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <h4 className="text-xl font-bold">Office Hours</h4>
                </div>
                <ul className="space-y-2 opacity-80">
                   <li className="flex justify-between"><span>Monday - Friday</span> <span>09:00 AM - 07:00 PM</span></li>
                   <li className="flex justify-between"><span>Saturday</span> <span>09:00 AM - 06:00 PM</span></li>
                   <li className="flex justify-between"><span>Sunday</span> <span>Closed</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
