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
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2, Star as StarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function StarsAdminPage() {
  const db = useFirestore();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  // Form states
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [score, setScore] = useState('');
  const [exam, setExam] = useState('');
  const [rank, setRank] = useState('');
  const [courseName, setCourseName] = useState('');
  const [quote, setQuote] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState('0');

  useEffect(() => {
    if (!db) return;
    setLoading(true);
    const unsub = onSnapshot(
      query(collection(db, 'stars'), orderBy('order', 'asc')),
      (snapshot) => {
        setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          operation: 'list',
          path: 'stars',
        }));
        setLoading(false);
      }
    );
    return () => unsub();
  }, [db]);

  const resetForm = () => {
    setName(''); setPhoto(''); setScore(''); setExam(''); setRank(''); setCourseName(''); setQuote(''); setIsPublished(true); setOrder('0'); setEditingItem(null);
  };

  const handleEdit = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingItem(item);
    setName(item.name || '');
    setPhoto(item.photo || '');
    setScore(item.score || '');
    setExam(item.exam || '');
    setRank(item.rank || '');
    setCourseName(item.courseName || '');
    setQuote(item.quote || '');
    setIsPublished(item.isPublished ?? true);
    setOrder(String(item.order || 0));
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setSubmitting(true);
    const data = { name, photo, score, exam, rank, courseName, quote, isPublished, order: Number(order), updatedAt: serverTimestamp() };

    if (editingItem) {
      const docRef = doc(db, 'stars', editingItem.id);
      updateDoc(docRef, data).catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        }));
      });
    } else {
      const colRef = collection(db, 'stars');
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
    toast({ title: 'Student profile saved' });
    setSubmitting(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!db || !confirm('Are you sure you want to remove this student?')) return;
    const docRef = doc(db, 'stars', id);
    deleteDoc(docRef).catch(async (error) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      }));
    });
    toast({ title: 'Deletion initiated' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-secondary flex items-center gap-2">
            <StarIcon className="text-primary w-8 h-8" />
            Our Star Performers
          </h1>
          <p className="text-muted-foreground italic">Highlight student achievements in real-time.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if(!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2 h-11 px-6 shadow-lg"><Plus className="w-5 h-5" /> Add New Star</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{editingItem ? 'Edit Star Student' : 'Add New Star'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Student Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Exam Name</Label>
                  <Input value={exam} onChange={e => setExam(e.target.value)} required placeholder="e.g. NEET-UG '26" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Score / Marks</Label>
                  <Input value={score} onChange={e => setScore(e.target.value)} required placeholder="672 / 720" />
                </div>
                <div className="space-y-2">
                  <Label>Rank (Optional)</Label>
                  <Input value={rank} onChange={e => setRank(e.target.value)} placeholder="e.g. AIR 1204" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Course Name</Label>
                <Input value={courseName} onChange={e => setCourseName(e.target.value)} required placeholder="e.g. 2-Year Classroom Course" />
              </div>
              <div className="space-y-2">
                <Label>Student Photo URL</Label>
                <Input value={photo} onChange={e => setPhoto(e.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Inspirational Quote</Label>
                <Textarea value={quote} onChange={e => setQuote(e.target.value)} placeholder="Consistency is the key..." className="h-24" />
              </div>
              <div className="grid grid-cols-2 gap-6 items-center border-t pt-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input type="number" value={order} onChange={e => setOrder(e.target.value)} required />
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                  <Label>Visible on Site</Label>
                </div>
              </div>
              <DialogFooter className="pt-2">
                <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={submitting}>
                  {submitting ? <Loader2 className="animate-spin mr-2" /> : null}
                  {editingItem ? 'Update Student' : 'Save Student'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-12 h-12 text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden group">
              <div className="h-44 bg-muted relative">
                {item.photo ? (
                  <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-white text-3xl font-bold">
                    {item.name?.charAt(0)}
                  </div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
                  <Badge variant={item.isPublished ? 'default' : 'secondary'}>{item.isPublished ? 'Public' : 'Draft'}</Badge>
                  <Badge className="bg-white/90 text-secondary border-none">Order: {item.order}</Badge>
                </div>
              </div>
              <CardContent className="p-5 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-bold text-secondary truncate">{item.name}</h3>
                  <p className="text-primary font-bold text-xs uppercase tracking-wider">{item.exam}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-black text-secondary">{item.score}</p>
                  {item.rank && <p className="text-xs font-bold text-muted-foreground">{item.rank}</p>}
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" className="flex-1" onClick={(e) => handleEdit(item, e)}>
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 p-0 text-destructive border-destructive/20 hover:bg-destructive/10" onClick={(e) => handleDelete(item.id, e)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
