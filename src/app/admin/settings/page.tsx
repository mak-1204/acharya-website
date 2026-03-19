
'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Settings, Save, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SiteSettingsPage() {
  const [enquiryFormUrl, setEnquiryFormUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'site_settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEnquiryFormUrl(docSnap.data().enquiryFormUrl || '');
        }
      } catch (err: any) {
        toast({ title: 'Error fetching settings', description: err.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await setDoc(doc(db, 'site_settings', 'global'), {
        enquiryFormUrl,
        updatedAt: serverTimestamp()
      }, { merge: true });
      toast({ title: 'Settings Saved', description: 'Global enquiry link updated successfully.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error saving', description: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-secondary flex items-center gap-2">
          <Settings className="text-primary w-8 h-8" />
          Site Settings
        </h1>
        <p className="text-muted-foreground italic">Configure global links and site-wide options.</p>
      </div>

      <Card className="max-w-2xl border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-secondary/5 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            General Links
          </CardTitle>
          <CardDescription>
            Update the primary Google Form link used for all "Enquire Now" buttons.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="enquiryFormUrl">Global Enquiry Form (Google Form URL)</Label>
              <Input
                id="enquiryFormUrl"
                value={enquiryFormUrl}
                onChange={(e) => setEnquiryFormUrl(e.target.value)}
                placeholder="https://docs.google.com/forms/d/..."
                className="h-12 rounded-xl"
                required
              />
              <p className="text-[10px] text-muted-foreground">
                This URL will be used in the Navbar, Footer, and general enquiry sections across the site.
              </p>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-bold gap-2" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
              Save Configuration
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
