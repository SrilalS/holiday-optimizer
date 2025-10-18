'use client';

import { Logo } from '@/components/Logo';
import { cn, spacing } from '@/lib/utils';
import { GitHubLink } from '@/components/ui/github-link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GITHUB_URL } from '@/constants';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full',
      'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
      'border-b border-gray-200/60 dark:border-gray-700/30',
      'pt-[env(safe-area-inset-top)]',
    )}>
      <div className={cn(
        'mx-auto max-w-7xl',
        spacing.container,
      )}>
        <div className="flex h-14 items-center justify-between">          <div className="flex items-center">
            <Logo hideTaglineOnMobile={true} />          </div><div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <GitHubLink
              href={GITHUB_URL}
              variant="default"
              className="hidden md:inline-flex"
            />
            <GitHubLink
              href={GITHUB_URL}
              variant="compact"
              className="hidden sm:inline-flex md:hidden"
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md text-gray-600 hover:text-teal-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-teal-400 dark:hover:bg-gray-750"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>        {mobileMenuOpen && (
          <div
            className="md:hidden py-2 px-2 border-t border-gray-200 dark:border-gray-700/30 bg-white dark:bg-gray-800 transition-all">            <nav className="flex flex-col space-y-3 py-2">
              <div className="py-1 px-3">
                <GitHubLink
                  href={GITHUB_URL}
                  variant="default"
                  className="w-full"
                />
              </div>
              <div className="py-1 px-3 flex justify-start">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
