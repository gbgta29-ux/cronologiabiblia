import Link from 'next/link';
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ModuleCardProps = {
  title: string;
  slug: string;
  image: ImagePlaceholder;
  isCompleted?: boolean;
};

export function ModuleCard({ title, slug, image, isCompleted }: ModuleCardProps) {
  return (
    <Link href={`/modules/${slug}`} className="group block">
      <Card className={cn(
          "relative aspect-square overflow-hidden rounded-lg border-primary/20 bg-card shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-105 hover:border-primary/40",
          isCompleted && "border-2 border-green-500"
        )}>
        {isCompleted && (
          <div className="absolute right-2 top-2 z-10 rounded-full bg-green-500 p-1 text-white">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          data-ai-hint={image.imageHint}
        />
        <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent",
            isCompleted && "bg-black/30"
          )} />
        <div className="absolute bottom-0 left-0 flex h-full w-full items-end p-4">
          <CardTitle className="font-headline text-xl text-white drop-shadow-md sm:text-2xl">
            {title}
          </CardTitle>
        </div>
      </Card>
    </Link>
  );
}
