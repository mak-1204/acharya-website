'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth, useFirestore } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, Eye, EyeOff, ArrowLeft, Info } from 'lucide-react';
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
      // This requires the user to be created in the Firebase Console -> Authentication tab
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Verify authorization in Firestore 'admin' collection
      const adminQuery = query(
        collection(db, 'admin'),
        where('user mail id', '==', user.email)
      );
      let adminSnapshot = await getDocs(adminQuery);

      // Fallback check for 'mail id'
      if (adminSnapshot.empty) {
        const fallbackQuery = query(
          collection(db, 'admin'),
          where('mail id', '==', user.email)
        );
        adminSnapshot = await getDocs(fallbackQuery);
      }

      if (adminSnapshot.empty) {
        // Not an authorized admin in Firestore, even if authenticated in Auth
        await signOut(auth);
        setError('Unauthorized user: Your email is not in the admin collection.');
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "This email is not authorized in the database.",
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
      // Firebase returns 'auth/invalid-credential' for both wrong password and user not found
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Ensure this user is created in Firebase Console Authentication AND added to the "admin" Firestore collection.');
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
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-2xl border-none overflow-hidden">
          <CardHeader className="space-y-4 text-center bg-white pb-8">
            <div className="flex justify-center mb-2">
              <Logo className="h-12" />
            </div>
            <CardTitle className="text-2xl font-bold text-secondary">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the management dashboard.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <Alert variant="destructive" className="rounded-xl border-destructive/20 bg-destructive/5">
                  <AlertDescription className="text-xs font-semibold">{error}</AlertDescription>
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
                  className="rounded-xl h-11"
                  autoComplete="email"
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
                    className="rounded-xl h-11 pr-10"
                    autoComplete="current-password"
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
            <CardFooter className="flex flex-col gap-4 pb-8">
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-12 font-bold transition-all shadow-lg active:scale-95"
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
              <Link 
                href="/" 
                className="text-sm text-muted-foreground hover:text-secondary flex items-center justify-center gap-2 transition-colors font-medium group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Website
              </Link>
            </CardFooter>
          </form>
        </Card>

        {/* Development Helper Tip */}
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-[11px] text-muted-foreground leading-relaxed">
            <p className="font-bold text-secondary mb-1">Login Tip:</p>
            1. Create the user in <span className="font-bold">Firebase Console &gt; Authentication</span>.<br/>
            2. Add the same email to the <span className="font-bold">admin</span> Firestore collection with field <span className="font-bold">user mail id</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
