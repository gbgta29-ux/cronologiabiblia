'use client';

import { useState, useRef, type ReactNode } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gvdtvgefzbxunjrtzrdw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZHR2Z2VmemJ4dW5qcnR6cmR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4NDc5ODEsImV4cCI6MjAzMjQyMzk4MX0.SgU5s2bMNEs0yB0s_2aCprxWd_2n_a4x1fW-aBw-kAw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface FileUploadButtonProps {
  onUpload: (url: string) => void;
  children: ReactNode;
}

export function FileUploadButton({ onUpload, children }: FileUploadButtonProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('media') // Make sure this bucket exists and has public insert access
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      if (!publicUrl) {
        throw new Error('Could not get public URL for uploaded file.');
      }
      
      onUpload(publicUrl);
      toast({
        title: 'Sucesso!',
        description: 'Sua foto de perfil foi atualizada.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro no Upload',
        description: error.message || 'Não foi possível enviar sua imagem.',
      });
    } finally {
      setUploading(false);
      // Reset file input
      if(fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div onClick={handleClick} className="relative cursor-pointer">
      {uploading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      {children}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/gif"
        disabled={uploading}
      />
    </div>
  );
}
