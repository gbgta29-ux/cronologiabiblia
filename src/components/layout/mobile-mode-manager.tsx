'use client';

import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function MobileModeManager() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.body.classList.toggle('mobile_mode', isMobile);
  }, [isMobile]);

  return null; // This component does not render anything
}
