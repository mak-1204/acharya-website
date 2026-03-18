'use client';

import React, { useState, useEffect } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { FileUploader } from '@/components/FileUploader';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GalleryAdminPage() {
  const { firestore } = useFirestore();
  const { toast } = useToast();
  
  const galleryRef = useMemoFirebase(() => firestore ? collection(firestore, 'gallery') : null, [firestore]);
  const { data: items, isLoading } = useCollection(galleryRef);

  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editingItem) setImageUrl(editingItem.imageUrl || '');
    else setImageUrl('');
  }, [editingItem]);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!galleryRef) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      imageUrl: imageUrl,
      caption: formData.get('caption'),
      order: Number(formData.get('order')),
      isPublished: formData.get('isPublished') === 'on',
      updatedAt: serverTimestamp(),
    };

    if (editingItem) {
      updateDocumentNonBlocking(doc(galleryRef, editingItem.id), data);
      toast({ title: "Success", description: "Gallery item updated." });
    } else {
      addDocumentNonBlocking(galleryRef, { ...data, createdAt: serverTimestamp() });
      toast({ title: "Success", description: "Image added to gallery." });
    }
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this gallery image?")) {
      if (galleryRef) {
        deleteDocumentNonBlocking(doc(galleryRef, id));
        toast({ title: "Deleted", variant: "destructive" });
      }
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
            <Button className="rounded-xl gap-2"><Plus className="w-4 h-4" /> Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Media Content (Image/Video)</Label>
                <FileUploader 
                  onUploadComplete={setImageUrl} 
                  defaultValue={editingItem?.imageUrl}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Input id="caption" name="caption" defaultValue={editingItem?.caption} />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" name="order" type="number" defaultValue={editingItem?.order || 0} required />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch id="isPublished" name="isPublished" defaultChecked={editingItem?.isPublished ?? true} />
                  <Label htmlFor="isPublished">Published</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">Save Item</Button>
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
                    <Button variant="secondary" size="sm" className="flex-1 h-8" onClick={() => { setEditingItem(item); setIsOpen(true); }}>
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {!items?.length && <p className="col-span-full text-center py-20 text-muted-foreground italic">Gallery is empty.</p>}
        </div>
      )}
    </div>
  );
}
