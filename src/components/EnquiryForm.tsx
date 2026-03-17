"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, ClipboardCheck } from 'lucide-react';

// Replace this with your actual Google Form URL
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdU7f-A8m7OqD7-r1tI_mO8-z8U-v-placeholder/viewform";

interface EnquiryFormProps {
  source: string;
  title?: string;
  isMinimal?: boolean;
}

export const EnquiryForm = ({ source, title, isMinimal = false }: EnquiryFormProps) => {
  return (
    <div className={isMinimal ? "" : "bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-border text-center"}>
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
        <ClipboardCheck className="w-8 h-8" />
      </div>
      
      {title && <h3 className="text-2xl md:text-3xl font-bold mb-4 text-secondary leading-tight">{title}</h3>}
      
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Please fill out our official admission enquiry form on Google Forms. Our academic counselors will get back to you within 24 hours.
      </p>

      <Button 
        asChild
        className="w-full md:w-auto px-10 h-14 bg-primary hover:bg-primary/90 text-lg font-bold rounded-2xl shadow-lg"
      >
        <a href={`${GOOGLE_FORM_URL}?usp=pp_url&entry.source=${source}`} target="_blank" rel="noopener noreferrer">
          Open Enquiry Form <ExternalLink className="ml-2 w-5 h-5" />
        </a>
      </Button>
      
      <p className="mt-6 text-sm text-muted-foreground">
        Or call us directly at <a href="tel:9865440099" className="font-bold text-secondary">9865440099</a>
      </p>
    </div>
  );
};
