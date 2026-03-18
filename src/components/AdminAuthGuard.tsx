'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Verify authorization in Firestore 'admin' collection
          const adminQuery = query(
            collection(db, 'admin'),
            where('mail id', '==', currentUser.email)
          );
          const adminSnapshot = await getDocs(adminQuery);

          if (adminSnapshot.empty) {
            await signOut(auth);
            setAuthorized(false);
            router.push('/admin/login');
          } else {
            setAuthorized(true);
          }
        } catch (error) {
          console.error("Auth Guard Error:", error);
          await signOut(auth);
          router.push('/admin/login');
        }
      } else {
        setAuthorized(false);
        router.push('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[200]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
};
