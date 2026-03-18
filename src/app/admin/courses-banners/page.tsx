'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2, LayoutTemplate, BookOpen, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CoursesBannersPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  // Banner states
  const [bTitle, setBTitle] = useState('');
  const [bSubtitle, setBSubtitle] = useState('');
  const [bImageUrl, setBImageUrl] = useState('');
  const [bCtaText, setBCtaText] = useState('Enroll Now');
  const [bCtaLink, setBCtaLink] = useState('');
  const [bIsActive, setBIsActive] = useState(true);
  const [bOrder, setBOrder] = useState('0');

  // Course states
  const [cTitle, setCTitle] = useState('');
  const [cSlug, setCSlug] = useState('');
  const [cDesc, setCDesc] = useState('');
  const [cBannerImage, setCBannerImage] = useState('');
  const [cPrice, setCPrice] = useState('0');
  const [cDiscountedPrice, setCDiscountedPrice] = useState('0');
  const [cCategory, setCCategory] = useState('');
  const [cIsFeatured, setCIsFeatured] = useState(false);
  const [cIsPublished, setCIsPublished] = useState(true);
  const [cOrder, setCOrder] = useState('0');
  const [cAudience, setCAudience] = useState('');
  const [cDuration, setCDuration] = useState('');
  const [cHighlights, setCHighlights] = useState('');
  const [cGoogleFormUrl, setCGoogleFormUrl] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const bSnap = await getDocs(query(collection(db, 'hero_banners'), orderBy('order', 'asc')));
      const cSnap = await getDocs(query(collection(db, 'courses'), orderBy('order', 'asc')));
      setBanners(bSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setCourses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const resetBannerForm = () => {
    setBTitle(''); setBSubtitle(''); setBImageUrl(''); setBCtaText('Enroll Now'); setBCtaLink(''); setBIsActive(true); setBOrder('0'); setEditingBanner(null);
  };

  const resetCourseForm = () => {
    setCTitle(''); setCSlug(''); setCDesc(''); setCBannerImage(''); setCPrice('0'); setCDiscountedPrice('0'); setCCategory(''); setCIsFeatured(false); setCIsPublished(true); setCOrder('0'); setCAudience(''); setCDuration(''); setCHighlights(''); setCGoogleFormUrl(''); setEditingCourse(null);
  };

  const handleBannerSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const data = { title: bTitle, subtitle: bSubtitle, imageUrl: bImageUrl, ctaText: bCtaText, ctaLink: bCtaLink, isActive: bIsActive, order: Number(bOrder), updatedAt: serverTimestamp() };
    try {
      if (editingBanner) await updateDoc(doc(db, 'hero_banners', editingBanner.id), data);
      else await addDoc(collection(db, 'hero_banners'), { ...data, createdAt: serverTimestamp() });
      setBannerDialogOpen(false); resetBannerForm(); fetchData(); toast({ title: 'Banner saved' });
    } catch (err: any) { toast({ variant: 'destructive', title: 'Error', description: err.message }); } finally { setSubmitting(false); }
  };

  const handleCourseSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const data = { 
      title: cTitle, 
      slug: cSlug, 
      description: cDesc, 
      bannerImage: cBannerImage, 
      price: Number(cPrice), 
      discountedPrice: Number(cDiscountedPrice), 
      category: cCategory, 
      isFeatured: cIsFeatured, 
      isPublished: cIsPublished, 
      order: Number(cOrder),
      audience: cAudience,
      duration: cDuration,
      highlights: cHighlights.split('\n').filter(h => h.trim() !== ''),
      googleFormUrl: cGoogleFormUrl,
      updatedAt: serverTimestamp() 
    };
    try {
      if (editingCourse) await updateDoc(doc(db, 'courses', editingCourse.id), data);
      else await addDoc(collection(db, 'courses'), { ...data, createdAt: serverTimestamp() });
      setCourseDialogOpen(false); resetCourseForm(); fetchData(); toast({ title: 'Course saved' });
    } catch (err: any) { toast({ variant: 'destructive', title: 'Error', description: err.message }); } finally { setSubmitting(false); }
  };

  const handleDelete = async (col: string, id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await deleteDoc(doc(db, col, id));
      fetchData();
      toast({ title: 'Deleted' });
    } catch (err: any) { toast({ variant: 'destructive', title: 'Error', description: err.message }); }
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-secondary">Promotions & Catalog</h1>
        <p className="text-muted-foreground italic">Manage homepage banners and your educational offerings.</p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-secondary flex items-center gap-2"><LayoutTemplate className="text-primary" /> Hero Banners</h2>
          <Dialog open={bannerDialogOpen} onOpenChange={setBannerDialogOpen}>
            <DialogTrigger asChild><Button className="rounded-xl gap-2"><Plus className="w-4 h-4" /> Add Banner</Button></DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editingBanner ? 'Edit Banner' : 'New Banner'}</DialogTitle></DialogHeader>
              <form onSubmit={handleBannerSave} className="space-y-4 pt-4">
                <div className="space-y-2"><Label>Title</Label><Input value={bTitle} onChange={e => setBTitle(e.target.value)} required /></div>
                <div className="space-y-2"><Label>Subtitle</Label><Input value={bSubtitle} onChange={e => setBSubtitle(e.target.value)} /></div>
                <div className="space-y-2"><Label>Image URL</Label><Input value={bImageUrl} onChange={e => setBImageUrl(e.target.value)} required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>CTA Text</Label><Input value={bCtaText} onChange={e => setBCtaText(e.target.value)} /></div>
                  <div className="space-y-2"><Label>CTA Link</Label><Input value={bCtaLink} onChange={e => setBCtaLink(e.target.value)} /></div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2"><Switch checked={bIsActive} onCheckedChange={setBIsActive} /><Label>Active</Label></div>
                  <div className="space-y-1 flex items-center gap-2"><Label>Order</Label><Input type="number" value={bOrder} onChange={e => setBOrder(e.target.value)} className="w-20" /></div>
                </div>
                <Button type="submit" className="w-full h-12" disabled={submitting}>{submitting ? <Loader2 className="animate-spin" /> : null} Save Banner</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map(b => (
            <Card key={b.id} className="overflow-hidden border-none shadow-sm relative group">
              <div className="h-32 bg-muted"><img src={b.imageUrl} className="w-full h-full object-cover" /></div>
              <CardContent className="p-4 flex justify-between items-center">
                <div className="truncate"><p className="font-bold truncate text-secondary">{b.title}</p><p className="text-[10px] text-muted-foreground uppercase">Order: {b.order}</p></div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditingBanner(b); setBTitle(b.title); setBSubtitle(b.subtitle || ''); setBImageUrl(b.imageUrl); setBCtaText(b.ctaText); setBCtaLink(b.ctaLink || ''); setBIsActive(b.isActive); setBOrder(String(b.order)); setBannerDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete('hero_banners', b.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-secondary flex items-center gap-2"><BookOpen className="text-primary" /> Course Catalog</h2>
          <Dialog open={courseDialogOpen} onOpenChange={setCourseDialogOpen}>
            <DialogTrigger asChild><Button className="rounded-xl gap-2 bg-secondary"><Plus className="w-4 h-4" /> Add Course</Button></DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editingCourse ? 'Edit Course' : 'New Course'}</DialogTitle></DialogHeader>
              <form onSubmit={handleCourseSave} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Title</Label><Input value={cTitle} onChange={e => setCTitle(e.target.value)} required /></div>
                  <div className="space-y-2"><Label>Slug (lowercase, no spaces)</Label><Input value={cSlug} onChange={e => setCSlug(e.target.value)} required /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Target Audience</Label><Input value={cAudience} onChange={e => setCAudience(e.target.value)} placeholder="e.g. Class 11, 12 & Repeaters" /></div>
                  <div className="space-y-2"><Label>Duration</Label><Input value={cDuration} onChange={e => setCDuration(e.target.value)} placeholder="e.g. 1 to 2 Years" /></div>
                </div>
                <div className="space-y-2"><Label>Description</Label><Textarea value={cDesc} onChange={e => setCDesc(e.target.value)} /></div>
                <div className="space-y-2"><Label>Program Highlights (One per line)</Label><Textarea value={cHighlights} onChange={e => setCHighlights(e.target.value)} placeholder="NCERT Intensive Program&#10;Daily Practice Papers" className="h-24" /></div>
                <div className="space-y-2"><Label>Google Form Link (Enrollment URL)</Label><Input value={cGoogleFormUrl} onChange={e => setCGoogleFormUrl(e.target.value)} placeholder="https://docs.google.com/forms/..." /></div>
                <div className="space-y-2"><Label>Banner Image URL</Label><Input value={cBannerImage} onChange={e => setCBannerImage(e.target.value)} /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2"><Label>Price</Label><Input type="number" value={cPrice} onChange={e => setCPrice(e.target.value)} /></div>
                  <div className="space-y-2"><Label>Offer Price</Label><Input type="number" value={cDiscountedPrice} onChange={e => setCDiscountedPrice(e.target.value)} /></div>
                  <div className="space-y-2"><Label>Category</Label><Input value={cCategory} onChange={e => setCCategory(e.target.value)} placeholder="e.g. neet, jee, cuet" /></div>
                </div>
                <div className="flex flex-wrap gap-8 items-center border-t pt-4">
                  <div className="flex items-center gap-2"><Switch checked={cIsPublished} onCheckedChange={setCIsPublished} /><Label>Published</Label></div>
                  <div className="flex items-center gap-2"><Switch checked={cIsFeatured} onCheckedChange={setCIsFeatured} /><Label>Featured</Label></div>
                  <div className="flex items-center gap-2 ml-auto"><Label>Order</Label><Input type="number" value={cOrder} onChange={e => setCOrder(e.target.value)} className="w-20" /></div>
                </div>
                <Button type="submit" className="w-full h-12 bg-secondary" disabled={submitting}>{submitting ? <Loader2 className="animate-spin" /> : null} Save Course</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-4">
          {courses.map(c => (
            <Card key={c.id} className="border-none shadow-sm group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><Layers className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-secondary">{c.title}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] uppercase">{c.category}</Badge>
                      {c.isFeatured && <Badge className="bg-orange-500 text-[10px]">Featured</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { 
                    setEditingCourse(c); 
                    setCTitle(c.title); 
                    setCSlug(c.slug); 
                    setCDesc(c.description || ''); 
                    setCBannerImage(c.bannerImage || ''); 
                    setCPrice(String(c.price)); 
                    setCDiscountedPrice(String(c.discountedPrice)); 
                    setCCategory(c.category || ''); 
                    setCIsFeatured(c.isFeatured); 
                    setCIsPublished(c.isPublished); 
                    setCOrder(String(c.order));
                    setCAudience(c.audience || '');
                    setCDuration(c.duration || '');
                    setCHighlights(Array.isArray(c.highlights) ? c.highlights.join('\n') : '');
                    setCGoogleFormUrl(c.googleFormUrl || '');
                    setCourseDialogOpen(true); 
                  }}>Edit</Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete('courses', c.id)}><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
