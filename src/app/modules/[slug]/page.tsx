import { modules } from '@/lib/modules';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function generateStaticParams() {
  return modules.map((module) => ({
    slug: module.id,
  }));
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const module = modules.find((m) => m.id === params.slug);

  if (!module) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
       <Button asChild variant="ghost" className="mb-8 hidden md:inline-flex">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Home
        </Link>
      </Button>
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
          {module.title}
        </h1>
      </header>
      <div className="min-h-[70vh] rounded-lg border-2 border-dashed border-muted-foreground/20 bg-card/30">
        {module.pdfUrl ? (
          <iframe
            src={module.pdfUrl}
            className="h-full w-full"
            style={{ minHeight: '70vh' }}
            allow="fullscreen"
          />
        ) : (
          <div className="flex h-full min-h-[60vh] items-center justify-center p-8">
            <p className="text-center text-muted-foreground">O conteúdo em PDF será exibido aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
}
