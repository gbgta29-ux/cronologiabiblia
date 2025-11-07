'use client';

import { useSearchParams } from 'next/navigation';
import { modules } from '@/lib/modules';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ModuleCard } from '@/components/module-card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

function ModulesContent() {
  const searchParams = useSearchParams();
  const testament = searchParams.get('testament');

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
    (module) => module.id === 'mateus'
  );

  const displayedModules =
    testament === 'old'
      ? modules.slice(0, newTestamentStartIndex)
      : modules.slice(newTestamentStartIndex);

  const pageTitle =
    testament === 'old' ? 'Antigo Testamento' : 'Novo Testamento';
  const headerImage = getImageForModule(
    testament === 'old' ? 'antigo-testamento' : 'novo-testamento'
  );

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
        {displayedModules.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            slug={module.id}
            image={getImageForModule(module.imageId)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ModulesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModulesContent />
    </Suspense>
  );
}
