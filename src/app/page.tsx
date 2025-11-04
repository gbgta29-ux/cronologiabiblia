import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function Home() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id)!;
  };

  const oldTestamentImage = getImage('antigo-testamento');
  const newTestamentImage = getImage('novo-testamento');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center md:mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
          Biblical Chronicles
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A chronological journey through the Scriptures.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Link href="/testaments/old">
          <Card className="group relative aspect-video w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-105">
            <Image
              src={oldTestamentImage.imageUrl}
              alt={oldTestamentImage.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={oldTestamentImage.imageHint}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
              <h2 className="font-headline text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
                Antigo Testamento
              </h2>
            </div>
          </Card>
        </Link>
        <Link href="/testaments/new">
          <Card className="group relative aspect-video w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-105">
            <Image
              src={newTestamentImage.imageUrl}
              alt={newTestamentImage.description}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={newTestamentImage.imageHint}
            />
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
