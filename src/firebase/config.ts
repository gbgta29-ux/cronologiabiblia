import { FirebaseOptions } from 'firebase/app';

// This configuration is public and can be safely managed by Firebase Studio.
// All access and security is enforced by Security Rules and App Check.
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDP_R_J1-OaF3eM3eC8gM8pD7dJ0xI7h8E",
  authDomain: "biblical-chronicles-1-p9s2.firebaseapp.com",
  projectId: "biblical-chronicles-1-p9s2",
  storageBucket: "biblical-chronicles-1-p9s2.appspot.com",
  messagingSenderId: "599581754881",
  appId: "1:599581754881:web:5830b5b29b4661a5e1e1a5",
};

export function getFirebaseConfig() {
  if (!firebaseConfig.apiKey) {
    throw new Error('Missing Firebase config: Please check your .env.local file');
  }
  return firebaseConfig;
}
