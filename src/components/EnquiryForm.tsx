"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addDoc, collection } from 'firebase/firestore';
import { db, serverTimestamp } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Optional email').optional().or(z.literal('')),
  classLevel: z.string().min(1, 'Please select your class'),
  courseInterest: z.string().min(1, 'Please select a course'),
  mode: z.string().min(1, 'Please select a preference'),
  message: z.string().optional(),
});

interface EnquiryFormProps {
  source: string;
  title?: string;
  isMinimal?: boolean;
}

export const EnquiryForm = ({ source, title, isMinimal = false }: EnquiryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      classLevel: '',
      courseInterest: '',
      mode: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...values,
        source,
        timestamp: serverTimestamp(),
      });
      toast({
        title: "Successfully Submitted!",
        description: "Thank you! We'll call you back within 24 hours. 📞",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Something went wrong. Please try calling us at 9865440099.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={isMinimal ? "" : "bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-border"}>
      {title && <h3 className="text-2xl font-bold mb-6 text-secondary">{title}</h3>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="classLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Dropper/Repeater"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["JEE", "NEET", "CUET", "CLAT", "Foundation", "Crash Course", "Integrated Program"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Mode</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!isMinimal && (
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any specific requirements?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your goals..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
            {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
            Book Free Counseling
          </Button>
        </form>
      </Form>
    </div>
  );
};
