import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFirebaseConfig } from './config';

function initializeFirebase() {
  const firebaseConfig = getFirebaseConfig();
  const apps = getApps();

  const app = apps.length
    ? apps[0]!
    : initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  const auth = getAuth(app);
  
  return { app, auth, db };
}

export { initializeFirebase };

export { FirebaseProvider, useFirebase, useFirebaseApp, useAuth, useFirestore } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { useUser } from './auth/use-user';