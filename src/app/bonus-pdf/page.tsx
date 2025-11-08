import { bonusModules } from '@/lib/bonus-modules';
import { BonusModuleCard } from '@/components/bonus-module-card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BonusPdfPage() {
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
          Seus PDFs Bônus
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Aproveite seus materiais exclusivos.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
        {bonusModules.map((module) => (
          <BonusModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
