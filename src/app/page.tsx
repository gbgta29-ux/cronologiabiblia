import { modules } from '@/lib/modules';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ModuleCard } from '@/components/module-card';
import Image from 'next/image';

export default function Home() {
  const getImageForModule = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    if (!image) {
      // Fallback in case image is not found
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
  const oldTestamentModules = modules.slice(0, newTestamentStartIndex);
  const newTestamentModules = modules.slice(newTestamentStartIndex);

  const oldTestamentImage = getImageForModule('antigo-testamento');
  const newTestamentImage = getImageForModule('novo-testamento');

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

      <div className="space-y-12">
        <section>
          <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg shadow-lg md:h-64">
            <Image
              src={oldTestamentImage.imageUrl}
              alt={oldTestamentImage.description}
              fill
              className="object-cover"
              data-ai-hint={oldTestamentImage.imageHint}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
              <h2 className="font-headline text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
                Antigo Testamento
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {oldTestamentModules.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                slug={module.id}
                image={getImageForModule(module.imageId)}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg shadow-lg md:h-64">
             <Image
              src={newTestamentImage.imageUrl}
              alt={newTestamentImage.description}
              fill
              className="object-cover"
              data-ai-hint={newTestamentImage.imageHint}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
              <h2 className="font-headline text-3xl font-bold text-white drop-shadow-md sm:text-4xl">
                Novo Testamento
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {newTestamentModules.map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                slug={module.id}
                image={getImageForModule(module.imageId)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
