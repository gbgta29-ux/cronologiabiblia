'use client';

import { useMemo } from 'react';
import { useUser } from '@/firebase';
import { useFirestore } from '@/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query } from 'firebase/firestore';
import { modules } from '@/lib/modules';
import { Loader2, User as UserIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FileUploadButton } from '@/components/file-upload-button';
import { updateProfile } from 'firebase/auth';

const getRank = (completedCount: number) => {
  if (completedCount <= 10) return 'Novato na Palavra';
  if (completedCount <= 21) return 'Discípulo em Crescimento';
  if (completedCount <= 32) return 'Pesquisador das Escrituras';
  if (completedCount <= 43) return 'Estudioso Cronológico';
  if (completedCount <= 54) return 'Mestre da Palavra';
  return 'Elite Cronológica';
};

export default function ProfilePage() {
  const { user, isLoading: userLoading } = useUser();
  const db = useFirestore();

  const progressColRef = useMemo(() => {
    if (!user || !db) return undefined;
    return collection(db, 'users', user.uid, 'progress');
  }, [user, db]);

  const [progressData, progressLoading] = useCollectionData(progressColRef, {
    idField: 'id',
  });

  const { completedCount, totalModules, progressPercentage, rank } =
    useMemo(() => {
      const allModules = modules.filter(m => m.id !== 'nt');
      const total = allModules.length;

      if (!progressData) {
        return {
          completedCount: 0,
          totalModules: total,
          progressPercentage: 0,
          rank: getRank(0),
        };
      }

      const completed = progressData.filter((p) => p.completed).length;
      const percentage = total > 0 ? (completed / total) * 100 : 0;
      const userRank = getRank(completed);

      return {
        completedCount: completed,
        totalModules: total,
        progressPercentage: percentage,
        rank: userRank,
      };
    }, [progressData]);

  const handlePhotoUpload = async (url: string) => {
    if (user) {
      try {
        await updateProfile(user, { photoURL: url });
        // Force a re-render or state update if necessary, though useUser should handle it
        window.location.reload(); // Simple way to force refresh
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
  };

  if (userLoading || progressLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Por favor, faça login para ver seu perfil.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8 flex flex-col items-center gap-4">
        <div className="relative">
           <FileUploadButton onUpload={handlePhotoUpload}>
            <Avatar className="h-24 w-24 cursor-pointer border-2 border-primary">
              <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? 'User'} />
              <AvatarFallback>
                <UserIcon className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
           </FileUploadButton>
        </div>
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold text-foreground">
            {user.displayName}
          </h1>
          <p className="font-medium text-primary">{rank}</p>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Seu Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm font-medium text-muted-foreground">
                <span>Progresso Geral</span>
                <span>
                  {completedCount} / {totalModules} Livros
                </span>
              </div>
              <Progress value={progressPercentage} />
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {Math.round(progressPercentage)}% completo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}