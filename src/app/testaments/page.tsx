import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TestamentsPage() {
  const oldTestamentImage = PlaceHolderImages.find(
    (img) => img.id === 'antigo-testamento'
  );
  const newTestamentImage = PlaceHolderImages.find(
    (img) => img.id === 'novo-testamento'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Home
        </Link>
      </Button>

      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
          Resumo Cronológico
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Selecione um testamento para começar.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Link href="/testaments/old" className="group">
          <Card className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            {oldTestamentImage && (
              <Image
                src={oldTestamentImage.imageUrl}
                alt={oldTestamentImage.description}
                fill
                className="object-cover"
                data-ai-hint={oldTestamentImage.imageHint}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
              <h2 className="font-headline text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
                Antigo Testamento
              </h2>
            </div>
          </Card>
        </Link>

        <Link href="/testaments/new" className="group">
          <Card className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
            {newTestamentImage && (
              <Image
                src={newTestamentImage.imageUrl}
                alt={newTestamentImage.description}
                fill
                className="object-cover"
                data-ai-hint={newTestamentImage.imageHint}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
              <h2 className="font-headline text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
                Novo Testamento
              </h2>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
