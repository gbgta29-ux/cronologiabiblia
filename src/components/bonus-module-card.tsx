import Link from 'next/link';
import Image from 'next/image';
import { Card, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { BonusModule } from '@/lib/bonus-modules';

type BonusModuleCardProps = {
  module: BonusModule;
};

export function BonusModuleCard({ module }: BonusModuleCardProps) {
  const viewerUrl = `/pdf-viewer?url=${encodeURIComponent(module.pdfUrl)}`;

  return (
    <Link href={viewerUrl} className="group block">
      <Card className="relative aspect-square overflow-hidden rounded-lg border-primary/20 bg-card shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:shadow-primary/20">
        <Image
          src={module.imageUrl}
          alt={module.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          data-ai-hint={module.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 flex h-full w-full items-end p-4">
          <CardTitle className="font-headline text-xl text-white drop-shadow-md sm:text-2xl">
            {module.title}
          </CardTitle>
        </div>
      </Card>
    </Link>
  );
}
