'use client';

import React, { useState, useEffect } from 'react';
import { useFirestore, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2, MessageSquare, Star as StarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TestimonialsAdminPage() {
  const db = useFirestore();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  // Form states
  const [studentName, setStudentName] = useState('');
  const [photo, setPhoto] = useState('');
  const [course, setCourse] = useState('');
  const [review, setReview] = useState('');
  const [result, setResult] = useState('');
  const [rating, setRating] = useState('5');
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState('0');

  useEffect(() => {
    if (!db) return;
    setLoading(true);
    const unsub = onSnapshot(
      query(collection(db, 'testimonials'), orderBy('order', 'asc')),
      (snapshot) => {
        setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          operation: 'list',
          path: 'testimonials',
        }));
        setLoading(false);
      }
    );
    return () => unsub();
  }, [db]);

  const resetForm = () => {
    setStudentName(''); setPhoto(''); setCourse(''); setReview(''); setResult(''); setRating('5'); setIsPublished(true); setOrder('0'); setEditingItem(null);
  };

  const handleEdit = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingItem(item);
    setStudentName(item.studentName || '');
    setPhoto(item.photo || '');
    setCourse(item.course || '');
    setReview(item.review || '');
    setResult(item.result || '');
    setRating(String(item.rating || '5'));
    setIsPublished(item.isPublished ?? true);
    setOrder(String(item.order || 0));
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setSubmitting(true);
    const data = { studentName, photo, course, review, result, rating: Number(rating), isPublished, order: Number(order), updatedAt: serverTimestamp() };
    
    if (editingItem) {
      const docRef = doc(db, 'testimonials', editingItem.id);
      updateDoc(docRef, data).catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        }));
      });
    } else {
      const colRef = collection(db, 'testimonials');
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
    toast({ title: 'Testimonial saved' });
    setSubmitting(false);
  };

  const handleDeleteTestimonial = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!db) {
      alert("Database not connected. Try again.");
      return;
    }
    const confirmed = window.confirm("Delete this testimonial?");
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "testimonials", id));
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
          <h1 className="text-3xl font-bold text-secondary flex items-center gap-2"><MessageSquare className="text-primary w-8 h-8" /> Student Testimonials</h1>
          <p className="text-muted-foreground italic">Manage success stories in real-time.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={v => { setIsOpen(v); if(!v) resetForm(); }}>
          <DialogTrigger asChild><Button className="rounded-xl gap-2 h-11 px-6"><Plus className="w-5 h-5" /> Add Testimonial</Button></DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editingItem ? 'Edit Testimonial' : 'New Testimonial'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Student Name</Label><Input value={studentName} onChange={e => setStudentName(e.target.value)} required /></div>
                <div className="space-y-2"><Label>Course Name</Label><Input value={course} onChange={e => setCourse(e.target.value)} required /></div>
              </div>
              <div className="space-y-2"><Label>Student Photo URL</Label><Input value={photo} onChange={e => setPhoto(e.target.value)} placeholder="https://..." /></div>
              <div className="space-y-2"><Label>Review Content</Label><Textarea value={review} onChange={e => setReview(e.target.value)} required className="h-24" /></div>
              <div className="space-y-2"><Label>Result / Success Metric (Optional)</Label><Input value={result} onChange={e => setResult(e.target.value)} placeholder="e.g. 99.5 Percentile in JEE" /></div>
              <div className="grid grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <Label>Star Rating</Label>
                  <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{[1,2,3,4,5].map(num => <SelectItem key={num} value={String(num)}>{num} Stars</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Order</Label><Input type="number" value={order} onChange={e => setOrder(e.target.value)} required /></div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t"><Switch checked={isPublished} onCheckedChange={setIsPublished} /><Label>Published</Label></div>
              <Button type="submit" className="w-full h-12" disabled={submitting}>{submitting ? <Loader2 className="animate-spin" /> : null} Save Testimonial</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-12 h-12 text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(item => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden group">
              <CardContent className="p-6 flex gap-4">
                <div className="w-14 h-14 bg-muted rounded-full overflow-hidden shrink-0">
                  <img src={item.photo || 'https://picsum.photos/seed/user/100/100'} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex justify-between items-start">
                    <div><h4 className="font-bold text-secondary truncate">{item.studentName}</h4><p className="text-[10px] font-bold text-primary uppercase">{item.course}</p></div>
                    <div className="flex text-yellow-500">{Array.from({length: item.rating}).map((_, i) => <StarIcon key={i} className="w-3 h-3 fill-current" />)}</div>
                  </div>
                  <p className="text-sm italic text-muted-foreground line-clamp-3">"{item.review}"</p>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <Badge variant={item.isPublished ? 'default' : 'secondary'}>{item.isPublished ? 'Public' : 'Draft'}</Badge>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleEdit(item, e)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={(e) => handleDeleteTestimonial(item.id, e)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}