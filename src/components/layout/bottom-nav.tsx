"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/library', label: 'Biblioteca', icon: BookOpen },
    { href: '/search', label: 'Buscar', icon: Search },
    { href: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-primary/10 bg-background/80 backdrop-blur-sm md:hidden">
      <nav className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 rounded-md p-2 text-sm font-medium transition-colors w-16',
              pathname === item.href
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
