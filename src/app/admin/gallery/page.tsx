'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
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

  const fetchItems = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(query(collection(db, 'gallery'), orderBy('order', 'asc')));
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => {
    setImageUrl(''); setCaption(''); setIsPublished(true); setOrder('0'); setEditingItem(null);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setImageUrl(item.imageUrl || '');
    setCaption(item.caption || '');
    setIsPublished(item.isPublished ?? true);
    setOrder(String(item.order || 0));
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const data = { imageUrl, caption, isPublished, order: Number(order), updatedAt: serverTimestamp() };
    try {
      if (editingItem) await updateDoc(doc(db, 'gallery', editingItem.id), data);
      else await addDoc(collection(db, 'gallery'), { ...data, createdAt: serverTimestamp() });
      setIsOpen(false); resetForm(); fetchItems(); toast({ title: 'Gallery item saved' });
    } catch (err: any) { toast({ variant: 'destructive', title: 'Error', description: err.message }); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
      setItems(prev => prev.filter(i => i.id !== id));
      toast({ title: 'Deleted' });
    } catch (err: any) { toast({ variant: 'destructive', title: 'Error', description: err.message }); }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-secondary flex items-center gap-2"><ImageIcon className="text-primary w-8 h-8" /> Campus Gallery</h1>
          <p className="text-muted-foreground italic">Update the visual tour of your institute.</p>
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
                    <Button variant="secondary" size="sm" className="flex-1 h-8" onClick={() => handleEdit(item)}><Edit className="w-3 h-3 mr-1" /> Edit</Button>
                    <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(item.id)}><Trash2 className="w-3 h-3" /></Button>
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
