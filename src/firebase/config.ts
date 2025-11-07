import { FirebaseOptions } from 'firebase/app';

// This configuration is public and can be safely managed by Firebase Studio.
// All access and security is enforced by Security Rules and App Check.
const firebaseConfig: FirebaseOptions = {
  "projectId": "studio-2102878942-2b4ac",
  "appId": "1:660440704401:web:201957e6cdb03f1e02a630",
  "apiKey": "AIzaSyCdCwtzV47M8Xf2mfdK8__7CkUTYs0HvTs",
  "authDomain": "studio-2102878942-2b4ac.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "660440704401"
};

export function getFirebaseConfig() {
  if (!firebaseConfig.apiKey) {
    throw new Error('Missing Firebase config: Please check your .env.local file');
  }
  return firebaseConfig;
}
