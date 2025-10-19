import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from 'next/link';
import { Logo } from '../icons';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
         <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline">Cureva</span>
        </Link>
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
