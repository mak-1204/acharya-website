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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Loader2, BarChart3, Users, GraduationCap, MapPin, Calendar, Trophy, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ICON_OPTIONS = [
  { name: 'Users', icon: Users },
  { name: 'GraduationCap', icon: GraduationCap },
  { name: 'MapPin', icon: MapPin },
  { name: 'Calendar', icon: Calendar },
  { name: 'Trophy', icon: Trophy },
  { name: 'BookOpen', icon: BookOpen },
];

export default function ImpactStatsAdminPage() {
  const db = useFirestore();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  // Form states
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [iconName, setIconName] = useState('Users');
  const [isPublished, setIsPublished] = useState(true);
  const [order, setOrder] = useState('0');

  useEffect(() => {
    if (!db) return;
    setLoading(true);
    const unsub = onSnapshot(
      query(collection(db, 'impact_stats'), orderBy('order', 'asc')),
      (snapshot) => {
        setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          operation: 'list',
          path: 'impact_stats',
        }));
        setLoading(false);
      }
    );
    return () => unsub();
  }, [db]);

  const resetForm = () => {
    setLabel(''); setValue(''); setIconName('Users'); setIsPublished(true); setOrder('0'); setEditingItem(null);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setLabel(item.label || '');
    setValue(item.value || '');
    setIconName(item.iconName || 'Users');
    setIsPublished(item.isPublished ?? true);
    setOrder(String(item.order || 0));
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;
    setSubmitting(true);
    const data = { label, value, iconName, isPublished, order: Number(order), updatedAt: serverTimestamp() };
    
    if (editingItem) {
      const docRef = doc(db, 'impact_stats', editingItem.id);
      updateDoc(docRef, data).catch(async (error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        }));
      });
    } else {
      const colRef = collection(db, 'impact_stats');
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
    toast({ title: 'Stat updated' });
    setSubmitting(false);
  };

  const handleDeleteStat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!db) {
      alert("Database not connected. Try again.");
      return;
    }
    const confirmed = window.confirm("Delete this stat?");
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "impact_stats", id));
      alert("Deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete. Try again.");
    }
  };

  const renderIcon = (name: string) => {
    const IconComp = ICON_OPTIONS.find(o => o.name === name)?.icon || Users;
    return <IconComp className="w-5 h-5" />;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-secondary flex items-center gap-2"><BarChart3 className="text-primary w-8 h-8" /> Impact Statistics</h1>
          <p className="text-muted-foreground italic">Manage stats counters in real-time.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={v => { setIsOpen(v); if(!v) resetForm(); }}>
          <DialogTrigger asChild><Button className="rounded-xl gap-2 h-11 px-6"><Plus className="w-5 h-5" /> Add New Stat</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>{editingItem ? 'Edit Impact Stat' : 'New Impact Stat'}</DialogTitle></DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="space-y-2"><Label>Value (e.g. 50k+)</Label><Input value={value} onChange={e => setValue(e.target.value)} required placeholder="50k+" /></div>
              <div className="space-y-2"><Label>Label (e.g. Students Trained)</Label><Input value={label} onChange={e => setLabel(e.target.value)} required placeholder="Students Trained" /></div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={iconName} onValueChange={setIconName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map(opt => (
                      <SelectItem key={opt.name} value={opt.name}>
                        <div className="flex items-center gap-2">
                          <opt.icon className="w-4 h-4" />
                          <span>{opt.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Display Order</Label><Input type="number" value={order} onChange={e => setOrder(e.target.value)} required /></div>
                <div className="flex items-center gap-3 pt-8"><Switch checked={isPublished} onCheckedChange={setIsPublished} /><Label>Published</Label></div>
              </div>
              <Button type="submit" className="w-full h-12" disabled={submitting}>{submitting ? <Loader2 className="animate-spin" /> : null} Save Stat</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin w-12 h-12 text-primary" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <Card key={item.id} className="border-none shadow-sm group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    {renderIcon(item.iconName)}
                  </div>
                  <Badge variant={item.isPublished ? 'default' : 'secondary'}>{item.isPublished ? 'Live' : 'Draft'}</Badge>
                </div>
                <div className="space-y-1 mb-6">
                  <h3 className="text-2xl font-bold text-secondary">{item.value}</h3>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{item.label}</p>
                </div>
                <div className="flex gap-2 border-t pt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(item)}><Edit className="w-4 h-4 mr-2" /> Edit</Button>
                  <Button variant="outline" size="sm" className="w-10 p-0 text-destructive border-destructive/20 hover:bg-destructive/10" onClick={(e) => handleDeleteStat(item.id, e)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-20 text-center bg-muted/20 rounded-2xl border-2 border-dashed">
              <p className="text-muted-foreground font-medium">No impact stats added yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}