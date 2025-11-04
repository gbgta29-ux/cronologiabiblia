import { modules } from '@/lib/modules';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ModuleCard } from '@/components/module-card';

export default function Home() {
  const getImageForModule = (imageId: string) => {
    const image = PlaceHolderImages.find((img) => img.id === imageId);
    if (!image) {
      // Fallback in case image is not found
      return {
        id: 'fallback',
        description: 'Default placeholder image',
        imageUrl: 'https://picsum.photos/seed/fallback/400/400',
        imageHint: 'scroll paper'
      };
    }
    return image;
  };

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
        {modules.map((module) => (
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
