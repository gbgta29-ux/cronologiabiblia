
'use client';

import { useEffect, useMemo, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { modules } from '@/lib/modules';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function ModulePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { user, isLoading: userIsLoading } = useUser();
  const db = useFirestore();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const module = useMemo(() => modules.find((m) => m.id === params.slug), [params.slug]);

  const progressDocRef = useMemo(() => {
    if (!user || !db || !params.slug) return undefined;
    return doc(db, 'users', user.uid, 'progress', params.slug);
  }, [user, db, params.slug]);

  const [progressData, progressLoading] = useDocumentData(progressDocRef);

  useEffect(() => {
    if (progressData) {
      setIsCompleted(progressData.completed);
    }
  }, [progressData]);

  if (userIsLoading || progressLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!module) {
    notFound();
  }

  const handleToggleComplete = async () => {
    if (!user || !db) return;
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);

    if (progressDocRef) {
      setDocumentNonBlocking(
        progressDocRef,
        { completed: newCompletedStatus, completedAt: new Date() },
        { merge: true }
      );
    }
  };

  const pdfViewerUrl = module.pdfUrl ? `/pdf-viewer?url=${encodeURIComponent(module.pdfUrl)}` : '#';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Button asChild variant="ghost" className="mb-8 hidden md:inline-flex">
        <Link href="/modules">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para os Módulos
        </Link>
      </Button>
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
          {module.title}
        </h1>
      </header>
      <div className="min-h-[60vh] rounded-lg border-2 border-dashed border-muted-foreground/20 bg-card/30 flex flex-col items-center justify-center p-8 text-center">
        {module.pdfUrl ? (
          <>
            <p className="mb-6 text-muted-foreground">Clique no botão abaixo para ler o livro.</p>
            <Button asChild size="lg">
              <Link href={pdfViewerUrl}>
                <BookOpen className="mr-2 h-5 w-5" />
                Ler Livro
              </Link>
            </Button>
          </>
        ) : (
            <p className="text-muted-foreground">
              O conteúdo deste livro está em produção e será liberado em breve.
            </p>
        )}
      </div>
      {module.pdfUrl && (
         <div className="mt-8 flex justify-center">
         <Button onClick={handleToggleComplete} size="lg" variant={isCompleted ? "secondary" : "default"}>
           <CheckCircle className="mr-2 h-5 w-5" />
           {isCompleted ? 'Marcar como não concluído' : 'Já terminei esse livro'}
         </Button>
       </div>
      )}
    </div>
  );
}
