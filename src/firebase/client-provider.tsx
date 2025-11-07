'use client';

import { useMemo, type ReactNode } from 'react';
import { FirebaseProvider, initializeFirebase, useFirebaseApp, useAuth, useFirestore, useFirebase } from '.';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const { app, auth, db } = useMemo(
    () => initializeFirebase(),
    []
  );

  return (
    <FirebaseProvider app={app} auth={auth} db={db}>
      {children}
    </FirebaseProvider>
  );
}