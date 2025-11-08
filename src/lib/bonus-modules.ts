export type BonusModule = {
  id: string;
  title: string;
  imageUrl: string;
  pdfUrl: string;
  imageHint: string;
};

export const bonusModules: BonusModule[] = [
  {
    id: '43-milagres-jesus',
    title: '43 Milagres de Jesus',
    imageUrl: 'https://gvdtvgefzbxunjrtzrdw.supabase.co/storage/v1/object/public/media/mxj3jymjsie_1762296511688.png',
    pdfUrl: 'https://kdloteojnkcjblhoirea.supabase.co/storage/v1/object/public/public-files/0.1902708373797274.pdf',
    imageHint: 'jesus miracles',
  },
  {
    id: '10-mandamentos-explicados',
    title: '10 Mandamentos Explicados',
    imageUrl: 'https://gvdtvgefzbxunjrtzrdw.supabase.co/storage/v1/object/public/media/kk8e1u5xego_1762296511227.png',
    pdfUrl: 'https://kdloteojnkcjblhoirea.supabase.co/storage/v1/object/public/public-files/0.17443920734936302.pdf',
    imageHint: 'ten commandments',
  },
  {
    id: '365-dias-plano-leitura',
    title: '365 Dias: Plano de Leitura Da Bíblia',
    imageUrl: 'https://gvdtvgefzbxunjrtzrdw.supabase.co/storage/v1/object/public/media/cn5izqjddqo_1762296512398.png',
    pdfUrl: 'https://kdloteojnkcjblhoirea.supabase.co/storage/v1/object/public/public-files/0.5652654695025993.pdf',
    imageHint: 'bible reading plan',
  },
  {
    id: 'mulheres-virtuosas-biblia',
    title: 'Mulheres Virtuosas da Bíblia',
    imageUrl: 'https://gvdtvgefzbxunjrtzrdw.supabase.co/storage/v1/object/public/media/g5hdsuy04qj_1762296510322.png',
    pdfUrl: 'https://kdloteojnkcjblhoirea.supabase.co/storage/v1/object/public/public-files/0.6143706959631147.pdf',
    imageHint: 'virtuous women',
  },
];
