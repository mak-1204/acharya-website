'use client';

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { LayoutTemplate, BookOpen, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CoursesBannersPage() {
  const { firestore } = useFirestore();
  const { toast } = useToast();
  
  const bannersRef = useMemoFirebase(() => firestore ? collection(firestore, 'hero_banners') : null, [firestore]);
  const coursesRef = useMemoFirebase(() => firestore ? collection(firestore, 'courses') : null, [firestore]);
  
  const { data: banners, isLoading: bannersLoading } = useCollection(bannersRef);
  const { data: courses, isLoading: coursesLoading } = useCollection(coursesRef);

  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveBanner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bannersRef) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
      imageUrl: formData.get('imageUrl'),
      ctaText: formData.get('ctaText'),
      ctaLink: formData.get('ctaLink'),
      isActive: formData.get('isActive') === 'on',
      order: Number(formData.get('order')),
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingBanner) {
        await updateDoc(doc(bannersRef, editingBanner.id), data);
        toast({ title: "Banner Updated", description: "The hero banner has been updated successfully." });
      } else {
        await addDoc(bannersRef, { ...data, createdAt: serverTimestamp() });
        toast({ title: "Banner Created", description: "A new hero banner has been added." });
      }
      setIsBannerDialogOpen(false);
      setEditingBanner(null);
    } catch (error) {
      console.error("Error saving banner:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not save the banner." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coursesRef) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      bannerImage: formData.get('bannerImage'),
      price: Number(formData.get('price')),
      discountedPrice: Number(formData.get('discountedPrice')),
      category: formData.get('category'),
      isFeatured: formData.get('isFeatured') === 'on',
      isPublished: formData.get('isPublished') === 'on',
      order: Number(formData.get('order')),
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingCourse) {
        await updateDoc(doc(coursesRef, editingCourse.id), data);
        toast({ title: "Course Updated", description: "The course information has been updated successfully." });
      } else {
        await addDoc(coursesRef, { ...data, createdAt: serverTimestamp() });
        toast({ title: "Course Created", description: "A new course has been added to the catalog." });
      }
      setIsCourseDialogOpen(false);
      setEditingCourse(null);
    } catch (error) {
      console.error("Error saving course:", error);
      toast({ variant: "destructive", title: "Error", description: "Could not save the course." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (ref: any, id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteDoc(doc(ref, id));
        toast({ title: "Deleted", description: "The item has been removed.", variant: "destructive" });
      } catch (error) {
        console.error("Error deleting document:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to delete the item." });
      }
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Courses & Banners</h1>
          <p className="text-muted-foreground">Manage your homepage banners and course catalog.</p>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-secondary">Hero Banners</h2>
          </div>
          <Dialog open={isBannerDialogOpen} onOpenChange={(open) => { setIsBannerDialogOpen(open); if(!open) setEditingBanner(null); }}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2"><Plus className="w-4 h-4" /> Add Banner</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveBanner} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" defaultValue={editingBanner?.title} required disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input id="subtitle" name="subtitle" defaultValue={editingBanner?.subtitle} disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Banner Media URL (Image/Video)</Label>
                  <Input id="imageUrl" name="imageUrl" defaultValue={editingBanner?.imageUrl} required placeholder="https://..." disabled={isSubmitting} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ctaText">CTA Text</Label>
                    <Input id="ctaText" name="ctaText" defaultValue={editingBanner?.ctaText || 'Enroll Now'} disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctaLink">CTA Link</Label>
                    <Input id="ctaLink" name="ctaLink" defaultValue={editingBanner?.ctaLink} disabled={isSubmitting} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input id="order" name="order" type="number" defaultValue={editingBanner?.order || 0} required disabled={isSubmitting} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch id="isActive" name="isActive" defaultChecked={editingBanner?.isActive ?? true} disabled={isSubmitting} />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                    Save Banner
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {bannersLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners?.map((banner) => (
              <Card key={banner.id} className="overflow-hidden border-none shadow-sm group">
                <div className="h-32 bg-muted relative">
                  <img src={banner.imageUrl} alt="" className="w-full h-full object-cover opacity-50" />
                  <Badge className="absolute top-2 right-2" variant={banner.isActive ? "default" : "secondary"}>
                    {banner.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-secondary truncate">{banner.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Order: {banner.order}</p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditingBanner(banner); setIsBannerDialogOpen(true); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(bannersRef, banner.id, banner.title)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-secondary">Course Catalog</h2>
          </div>
          <Dialog open={isCourseDialogOpen} onOpenChange={(open) => { setIsCourseDialogOpen(open); if(!open) setEditingCourse(null); }}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 bg-secondary hover:bg-secondary/90"><Plus className="w-4 h-4" /> Add Course</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveCourse} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-title">Title</Label>
                    <Input id="course-title" name="title" defaultValue={editingCourse?.title} required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL friendly)</Label>
                    <Input id="slug" name="slug" defaultValue={editingCourse?.slug} required placeholder="jee-main" disabled={isSubmitting} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" defaultValue={editingCourse?.description} disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bannerImage">Course Banner URL</Label>
                  <Input id="bannerImage" name="bannerImage" defaultValue={editingCourse?.bannerImage} placeholder="https://..." disabled={isSubmitting} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Original Price</Label>
                    <Input id="price" name="price" type="number" defaultValue={editingCourse?.price || 0} disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountedPrice">Offer Price</Label>
                    <Input id="discountedPrice" name="discountedPrice" type="number" defaultValue={editingCourse?.discountedPrice || 0} disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-order">Order</Label>
                    <Input id="course-order" name="order" type="number" defaultValue={editingCourse?.order || 0} required disabled={isSubmitting} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center pt-2">
                  <div className="flex items-center gap-2">
                    <Switch id="isPublished" name="isPublished" defaultChecked={editingCourse?.isPublished ?? true} disabled={isSubmitting} />
                    <Label htmlFor="isPublished">Published</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="isFeatured" name="isFeatured" defaultChecked={editingCourse?.isFeatured ?? false} disabled={isSubmitting} />
                    <Label htmlFor="isFeatured">Featured</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" defaultValue={editingCourse?.category} placeholder="JEE/NEET" disabled={isSubmitting} />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button type="submit" className="w-full bg-secondary" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                    Save Course
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {coursesLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-4">
            {courses?.map((course) => (
              <Card key={course.id} className="border-none shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary">{course.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px]">{course.category}</Badge>
                        {course.isFeatured && <Badge className="bg-orange-500 text-[10px]">Featured</Badge>}
                        {!course.isPublished && <Badge variant="secondary" className="text-[10px]">Draft</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => { setEditingCourse(course); setIsCourseDialogOpen(true); }}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(coursesRef, course.id, course.title)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
