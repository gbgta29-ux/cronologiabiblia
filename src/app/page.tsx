'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id)!;
  };

  const cards = [
    {
      id: 'resumo-cronologico',
      title: 'Resumo Cronológico',
      href: '/testaments',
    },
    {
      id: 'bonus-pdf',
      title: 'Seus PDFS bonus',
      href: '/bonus-pdf',
    },
    {
      id: 'presentes',
      title: 'Seus Presentes',
      href: '#',
    },
    {
      id: 'estudo-salmos',
      title: 'Imprima os Aconselhamentos',
      href: '#',
    },
  ];

  return (
    <div className="flex flex-col">
      <header className="relative mb-4 overflow-hidden bg-transparent p-4 text-center">
        <div className="container mx-auto flex flex-col items-center py-8">
          <h1 className="font-headline text-3xl font-bold text-foreground">
            Resumo Cronológico da Bíblia
          </h1>
          <Button asChild className="mt-4 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg hover:bg-primary/90">
            <Link href="/testaments">Começar Agora</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto flex-grow px-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card) => {
            const image = getImage(card.id);
            return (
              <Link href={card.href} key={card.id} className="group">
                <div className="flex flex-col items-center">
                  <Card className="aspect-square w-full overflow-hidden rounded-lg shadow-md transition-shadow group-hover:shadow-xl">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </Card>
                  <p className="mt-2 text-center text-sm font-medium text-foreground/80">
                    {card.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
