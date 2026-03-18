
'use client';

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, MessageSquare, Star as StarIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TestimonialsAdminPage() {
  const { firestore } = useFirestore();
  const { toast } = useToast();
  
  const testimonialsRef = useMemoFirebase(() => firestore ? collection(firestore, 'testimonials') : null, [firestore]);
  const { data: items, isLoading } = useCollection(testimonialsRef);

  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [rating, setRating] = useState('5');

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!testimonialsRef) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      studentName: formData.get('studentName'),
      photo: formData.get('photo'),
      course: formData.get('course'),
      review: formData.get('review'),
      result: formData.get('result'),
      rating: Number(rating),
      order: Number(formData.get('order')),
      isPublished: formData.get('isPublished') === 'on',
      updatedAt: serverTimestamp(),
    };

    if (editingItem) {
      updateDocumentNonBlocking(doc(testimonialsRef, editingItem.id), data);
      toast({ title: "Updated", description: "Testimonial updated." });
    } else {
      addDocumentNonBlocking(testimonialsRef, { ...data, createdAt: serverTimestamp() });
      toast({ title: "Added", description: "New testimonial added." });
    }
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      if (testimonialsRef) {
        deleteDocumentNonBlocking(doc(testimonialsRef, id));
        toast({ title: "Deleted", variant: "destructive" });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Testimonials</h1>
          <p className="text-muted-foreground">Manage student feedback and reviews.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if(!v) setEditingItem(null); }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2"><Plus className="w-4 h-4" /> Add Testimonial</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input id="studentName" name="studentName" defaultValue={editingItem?.studentName} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" name="course" defaultValue={editingItem?.course} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input id="photo" name="photo" defaultValue={editingItem?.photo} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review">Review Content</Label>
                <Textarea id="review" name="review" defaultValue={editingItem?.review} required className="h-24" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="result">Student Result (Optional)</Label>
                <Input id="result" name="result" defaultValue={editingItem?.result} placeholder="e.g. 99.5 Percentile" />
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(num => <SelectItem key={num} value={num.toString()}>{num} Stars</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="test-order">Order</Label>
                  <Input id="test-order" name="order" type="number" defaultValue={editingItem?.order || 0} required />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch id="isPublished" name="isPublished" defaultChecked={editingItem?.isPublished ?? true} />
                  <Label htmlFor="isPublished">Public</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">Save Testimonial</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items?.map((item) => (
            <Card key={item.id} className="border-none shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full overflow-hidden shrink-0">
                    <img src={item.photo || 'https://picsum.photos/seed/user/100/100'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-secondary truncate">{item.studentName}</h3>
                      <div className="flex">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-primary font-bold">{item.course}</p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3 italic">"{item.review}"</p>
                    {item.result && <p className="text-xs font-bold text-secondary mt-2">Result: {item.result}</p>}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <Badge variant={item.isPublished ? "default" : "secondary"}>{item.isPublished ? 'Public' : 'Draft'}</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setEditingItem(item); setRating(item.rating.toString()); setIsOpen(true); }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {!items?.length && <p className="col-span-full text-center py-20 text-muted-foreground italic">No testimonials yet.</p>}
        </div>
      )}
    </div>
  );
}
