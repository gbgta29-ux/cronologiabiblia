"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, Headphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Início', icon: Home },
    { href: '/library', label: 'Biblioteca', icon: BookOpen },
    { href: '/audio', label: 'Áudio', icon: Headphone },
    { href: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-zinc-200 bg-white shadow-t-lg md:hidden">
      <nav className="mx-auto flex h-20 items-center justify-around px-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 rounded-md p-2 text-sm font-medium transition-colors w-20',
              pathname === item.href
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
