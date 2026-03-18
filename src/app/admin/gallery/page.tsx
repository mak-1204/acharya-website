'use client';

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GalleryAdminPage() {
  const { firestore } = useFirestore();
  const { toast } = useToast();
  
  const galleryRef = useMemoFirebase(() => firestore ? collection(firestore, 'gallery') : null, [firestore]);
  const { data: items, isLoading } = useCollection(galleryRef);

  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!galleryRef) return;

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      imageUrl: formData.get('imageUrl'),
      caption: formData.get('caption'),
      order: Number(formData.get('order')),
      isPublished: formData.get('isPublished') === 'on',
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingItem) {
        await updateDoc(doc(galleryRef, editingItem.id), data);
        toast({ title: "Success", description: "Gallery item updated." });
      } else {
        await addDoc(galleryRef, { ...data, createdAt: serverTimestamp() });
        toast({ title: "Success", description: "Image added to gallery." });
      }
      setIsOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      console.error("Error saving gallery item:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Could not save gallery item." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    if (!galleryRef) return;

    setIsSubmitting(true);
    try {
      await deleteDoc(doc(galleryRef, id));
      toast({ title: "Deleted", variant: "destructive" });
    } catch (error: any) {
      console.error("Error deleting gallery item:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Could not delete gallery item." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Campus Gallery</h1>
          <p className="text-muted-foreground">Manage images and videos displayed in the website gallery.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if(!v) setEditingItem(null); }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2" disabled={isSubmitting}><Plus className="w-4 h-4" /> Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Media URL (Image/Video)</Label>
                <Input id="imageUrl" name="imageUrl" defaultValue={editingItem?.imageUrl} required placeholder="https://..." disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Input id="caption" name="caption" defaultValue={editingItem?.caption} disabled={isSubmitting} />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" name="order" type="number" defaultValue={editingItem?.order || 0} required disabled={isSubmitting} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch id="isPublished" name="isPublished" defaultChecked={editingItem?.isPublished ?? true} disabled={isSubmitting} />
                  <Label htmlFor="isPublished">Published</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                  Save Item
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items?.map((item) => (
            <Card key={item.id} className="overflow-hidden border-none shadow-sm group relative aspect-square">
              <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                <div className="flex justify-end gap-1">
                  <Badge variant={item.isPublished ? "default" : "secondary"}>
                    {item.isPublished ? "Public" : "Draft"}
                  </Badge>
                </div>
                <div>
                  <p className="text-white text-xs font-medium mb-4 line-clamp-2">{item.caption || 'No caption'}</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1 h-8" onClick={() => { setEditingItem(item); setIsOpen(true); }} disabled={isSubmitting}>
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(item.id)} disabled={isSubmitting}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
