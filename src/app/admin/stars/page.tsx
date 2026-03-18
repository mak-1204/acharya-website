
'use client';

import React, { useState } from 'react';
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
import { Plus, Edit, Trash2, Trophy, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export default function StarsAdminPage() {
  const { firestore } = useFirestore();
  const { toast } = useToast();
  
  const starsRef = useMemoFirebase(() => firestore ? collection(firestore, 'stars') : null, [firestore]);
  const { data: items, isLoading } = useCollection(starsRef);

  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!starsRef) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      photo: formData.get('photo'),
      score: formData.get('score'),
      exam: formData.get('exam'),
      courseName: formData.get('courseName'),
      order: Number(formData.get('order')),
      isPublished: formData.get('isPublished') === 'on',
      updatedAt: serverTimestamp(),
    };

    if (editingItem) {
      updateDocumentNonBlocking(doc(starsRef, editingItem.id), data);
      toast({ title: "Updated", description: "Star student updated successfully." });
    } else {
      addDocumentNonBlocking(starsRef, { ...data, createdAt: serverTimestamp() });
      toast({ title: "Created", description: "New star added to the hall of fame." });
    }
    setIsOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this star student from the list?")) {
      if (starsRef) {
        deleteDocumentNonBlocking(doc(starsRef, id));
        toast({ title: "Deleted", variant: "destructive" });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Our Stars</h1>
          <p className="text-muted-foreground">Celebrate your top achieving students.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if(!v) setEditingItem(null); }}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2 bg-secondary hover:bg-secondary/90"><Plus className="w-4 h-4" /> Add Star</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Star Student' : 'Add New Star'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name</Label>
                  <Input id="name" name="name" defaultValue={editingItem?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam">Exam Name</Label>
                  <Input id="exam" name="exam" defaultValue={editingItem?.exam} placeholder="NEET-UG '26" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="score">Score / Rank</Label>
                  <Input id="score" name="score" defaultValue={editingItem?.score} placeholder="672 / 720" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input id="courseName" name="courseName" defaultValue={editingItem?.courseName} placeholder="Classroom Course" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Photo URL (Optional)</Label>
                <Input id="photo" name="photo" defaultValue={editingItem?.photo} placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4 items-center pt-2">
                <div className="space-y-2">
                  <Label htmlFor="star-order">Order</Label>
                  <Input id="star-order" name="order" type="number" defaultValue={editingItem?.order || 0} required />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch id="isPublished" name="isPublished" defaultChecked={editingItem?.isPublished ?? true} />
                  <Label htmlFor="isPublished">Visible on Site</Label>
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full bg-secondary">Save Star Student</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items?.map((star) => (
            <Card key={star.id} className="border-none shadow-sm overflow-hidden group">
              <div className="h-40 bg-gradient-to-br from-secondary to-primary relative overflow-hidden flex items-center justify-center">
                {star.photo ? (
                  <img src={star.photo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-4xl font-bold">{getInitials(star.name)}</span>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                  <Badge variant={star.isPublished ? "default" : "secondary"}>
                    {star.isPublished ? 'Public' : 'Draft'}
                  </Badge>
                  <Badge className="bg-white text-secondary font-bold">#{star.order}</Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="space-y-1 text-left">
                  <h3 className="font-bold text-secondary text-lg leading-tight truncate">{star.name}</h3>
                  <p className="text-primary font-bold text-sm">{star.exam}</p>
                </div>
                <div className="space-y-1 text-left">
                  <p className="text-xs font-bold text-muted-foreground uppercase">{star.courseName}</p>
                  <p className="text-secondary font-bold text-lg">{star.score}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { setEditingItem(star); setIsOpen(true); }}>
                    <Edit className="w-3 h-3 mr-2" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10" onClick={() => handleDelete(star.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {!items?.length && <p className="col-span-full text-center py-20 text-muted-foreground italic">No stars added yet.</p>}
        </div>
      )}
    </div>
  );
}
