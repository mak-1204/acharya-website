'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const auth = useAuth();
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !db) return;
    
    setLoading(true);
    setError(null);

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Verify authorization in Firestore 'admin' collection
      // Field name is 'mail id' as per requirements
      const adminQuery = query(
        collection(db, 'admin'),
        where('mail id', '==', user.email)
      );
      const adminSnapshot = await getDocs(adminQuery);

      if (adminSnapshot.empty) {
        // Not an authorized admin
        await signOut(auth);
        setError('Unauthorized user: Your email is not in the admin list.');
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "This email is not authorized to access the admin portal.",
        });
      } else {
        // Success
        toast({
          title: "Login Successful",
          description: "Welcome back, admin.",
        });
        router.push('/admin');
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('An error occurred during sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-2">
            <Logo className="h-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-secondary">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the management dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@acharya.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-12 font-bold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
