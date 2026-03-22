'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Helper to check if we are running on the server
const isServer = typeof window === 'undefined';

export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp: FirebaseApp;
    try {
      // On the server, we avoid calling initializeApp() without arguments 
      // unless we are certain the environment variables are present.
      // This prevents the "Need to provide options" error during SSR/Build.
      if (isServer) {
        firebaseApp = initializeApp(firebaseConfig);
      } else {
        try {
          firebaseApp = initializeApp();
        } catch (e) {
          firebaseApp = initializeApp(firebaseConfig);
        }
      }
    } catch (e) {
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
