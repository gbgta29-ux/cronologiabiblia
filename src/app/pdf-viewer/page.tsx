
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import Link from 'next/link';

function PdfViewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pdfUrl = searchParams.get('url');

  if (!pdfUrl) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-4">
        <p className="text-center text-destructive">URL do PDF não fornecida.</p>
        <Button onClick={() => router.back()} variant="outline" className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b bg-background p-4">
        <Button onClick={() => router.back()} variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Voltar</span>
        </Button>
        <h2 className="truncate text-sm font-medium">Visualizador de PDF</h2>
        <Button asChild variant="default">
          <a href={pdfUrl} download>
            <Download className="mr-2 h-4 w-4" />
            Baixar
          </a>
        </Button>
      </header>
      <main className="flex-1">
        <iframe
          src={pdfUrl}
          className="h-full w-full border-0"
          title="Visualizador de PDF"
          allow="fullscreen"
        />
      </main>
    </div>
  );
}

export default function PdfViewerPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <PdfViewer />
        </Suspense>
    )
}
