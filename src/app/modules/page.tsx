'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { collection, query } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { modules } from '@/lib/modules';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ModuleCard } from '@/components/module-card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

function ModulesContent() {
  const searchParams = useSearchParams();
  const testament = searchParams.get('testament');
  const { user, isLoading: userLoading } = useUser();
  const db = useFirestore();

  const progressColRef = useMemo(() => {
    if (!user || !db) return undefined;
    return collection(db, 'users', user.uid, 'progress');
  }, [user, db]);

  const [progressData, progressLoading] = useCollectionData(progressColRef);

  const getImageForModule = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    if (!image) {
      return {
        id: 'fallback',
        description: 'Default placeholder image',
        imageUrl: 'https://picsum.photos/seed/fallback/400/400',
        imageHint: 'scroll paper',
      };
    }
    return image;
  };

  const newTestamentStartIndex = modules.findIndex(
    (module) => module.id === 'nt'
  );

  const oldTestamentModules = modules.slice(0, newTestamentStartIndex);

  const displayedModules =
    testament === 'old'
      ? oldTestamentModules
      : modules.slice(newTestamentStartIndex);

  const pageTitle =
    testament === 'old' ? 'Antigo Testamento' : 'Novo Testamento';
  const headerImage = getImageForModule(
    testament === 'old' ? 'antigo-testamento' : 'novo-testamento'
  );
  
  const completedModulesCount = useMemo(() => {
    if (!progressData) return 0;
    return oldTestamentModules.filter(module => {
        const progress = progressData.find(p => p.id === module.id);
        return progress && progress.completed;
    }).length;
  }, [progressData, oldTestamentModules]);

  const oldTestamentProgress = (completedModulesCount / oldTestamentModules.length) * 100;

  if (testament === 'new' && oldTestamentProgress < 100) {
    return (
       <div className="container mx-auto px-4 py-8 text-center">
         <Button asChild variant="ghost" className="mb-4">
          <Link href="/testaments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Testamentos
          </Link>
        </Button>
        <h2 className="font-headline text-2xl font-bold text-primary">Novo Testamento Bloqueado</h2>
        <p className="mt-4 text-muted-foreground">
          Você precisa concluir todos os livros do Antigo Testamento para liberar o Novo Testamento.
        </p>
        <div className="mx-auto mt-6 max-w-md">
            <p className="mb-2 text-sm font-medium">Progresso do Antigo Testamento:</p>
            <Progress value={oldTestamentProgress} className="w-full" />
            <p className="mt-2 text-xs text-muted-foreground">{completedModulesCount} de {oldTestamentModules.length} livros concluídos</p>
        </div>
      </div>
    );
  }
  
  if (userLoading || progressLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const completedSet = new Set(progressData?.filter(p => p.completed).map(p => p.id));


  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/testaments">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Testamentos
        </Link>
      </Button>
      <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg shadow-lg md:h-64">
        <Image
          src={headerImage.imageUrl}
          alt={headerImage.description}
          fill
          className="object-cover"
          data-ai-hint={headerImage.imageHint}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
          <h2 className="font-headline text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
            {pageTitle}
          </h2>
        </div>
      </div>

       {testament === 'old' && (
        <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Seu Progresso:</p>
            <Progress value={oldTestamentProgress} />
            <p className="mt-1 text-xs text-muted-foreground">{`${completedModulesCount} de ${oldTestamentModules.length} livros concluídos.`}</p>
        </div>
      )}


      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
        {displayedModules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            slug={module.id}
            image={getImageForModule(module.imageId)}
            isCompleted={completedSet.has(module.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ModulesPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <ModulesContent />
    </Suspense>
  );
}
