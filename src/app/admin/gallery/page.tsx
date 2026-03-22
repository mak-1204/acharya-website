'use client';

import React, { useState, useEffect } from 'react';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GalleryAdminPage() {
  const db = useFirestore();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  // Form states
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState('0');

  useEffect(() => {
    if (!db) return;
    setLoading(true);
    const unsub = onSnapshot(
      query(collection(db, 'gallery'), orderBy('order', 'asc')),
      (snapshot) => {
        setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path: 'gallery',
        });
        errorEmitter.emit('permission-error', contextualError);
        setLoading(false);
      }
    );
    return () => unsub();
  }, [db]);

  const resetForm = () => {
    setImageUrl(''); setCaption(''); setIsPublished(true); setOrder('0'); setEditingItem(null);
  };

  const handleEdit = (item: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingItem(item);
    setImageUrl(item.imageUrl || '');
    setCaption(item.caption || '');
    setIsPublished(item.isPublished ?? true);
    setOrder(String(item.order || 0));
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setSubmitting(true);
    const data = { imageUrl, caption, isPublished, order: Number(order), updatedAt: serverTimestamp() };
    
    if (editingItem) {
      const docRef = doc(db, 'gallery', editingItem.id);
      updateDoc(docRef, data).catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        }));
      });
    } else {
      const colRef = collection(db, 'gallery');
      const addData = { ...data, createdAt: serverTimestamp() };
      addDoc(colRef, addData).catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: addData,
        }));
      });
    }

    setIsOpen(false);
    resetForm();
    toast({ title: 'Gallery item saved' });
    setSubmitting(false);
  };

  const handleDeleteGallery = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!db) {
      alert("Database not connected. Try again.");
      return;
    }
    const confirmed = window.confirm("Delete this image?");
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
      alert("Deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete. Try again.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-secondary flex items-center gap-2"><ImageIcon className="text-primary w-8 h-8" /> Campus Gallery</h1>
          <p className="text-muted-foreground italic">Update the visual tour of your institute in real-time.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={v => { setIsOpen(v); if(!v) resetForm(); }}>
          <DialogTrigger asChild><Button className="rounded-xl gap-2 h-11 px-6"><Plus className="w-5 h-5" /> Add Image</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>{editingItem ? 'Edit Item' : 'New Gallery Item'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="space-y-2"><Label>Image URL</Label><Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required placeholder="https://..." /></div>
              <div className="space-y-2"><Label>Caption</Label><Input value={caption} onChange={e => setCaption(e.target.value)} placeholder="e.g. Science Lab Session" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={order} onChange={e => setOrder(e.target.value)} required /></div>
                <div className="flex items-center gap-3 pt-8"><Switch checked={isPublished} onCheckedChange={setIsPublished} /><Label>Published</Label></div>
              </div>
              <Button type="submit" className="w-full h-12" disabled={submitting}>{submitting ? <Loader2 className="animate-spin" /> : null} Save Item</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-12 h-12 text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <Card key={item.id} className="overflow-hidden border-none shadow-sm relative group aspect-square">
              <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.caption} />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all p-4 flex flex-col justify-between">
                <div className="flex justify-end gap-1">
                  <Badge variant={item.isPublished ? 'default' : 'secondary'}>{item.isPublished ? 'Live' : 'Draft'}</Badge>
                </div>
                <div className="space-y-3">
                  <p className="text-white text-xs font-medium line-clamp-2">{item.caption || 'No caption'}</p>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1 h-8" onClick={(e) => handleEdit(item, e)}><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={(e) => handleDeleteGallery(item.id, e)}><Trash2 className="w-3 h-3" /></Button>
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