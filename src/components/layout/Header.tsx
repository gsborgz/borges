'use client'

import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@components/ThemeToggle';
import { LanguageToggle } from '@components/LanguageToggle';
import { Button } from '@components/ui/Button';
import { useTranslation } from 'react-i18next';
import { ResumeDownload } from '@components/ResumeDownload';

export default function Header() {
  const { t } = useTranslation();
  const currentRoute = usePathname();
  const router = useRouter();
  const isHome = currentRoute === '/';
  const isProjects = currentRoute === '/projects';

  const handleNavigateHome = () => {
    router.push('/');
  };

  const handleNavigateProjects = () => {
    router.push('/projects');
  };

  return (
    <HeaderBar>
      <div className='flex items-center justify-start gap-2 px-4 py-3'>
        <Button variant="default" primary={isHome} onClick={handleNavigateHome}>
          {t('home')}
        </Button>

        <Button variant="default" primary={isProjects} onClick={handleNavigateProjects}>
          {t('projects')}
        </Button>
      </div>

      <div className='flex items-center justify-end gap-2 px-4 py-3'>
        {isHome && <ResumeDownload />}
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </HeaderBar>
  );
}

function HeaderBar({ children }: { children: React.ReactNode }) {
  return (
    <header className='sticky flex items-center justify-between top-0 z-50 w-full !p-0 sm:px-4 border-b backdrop-blur border-slate-400'>
      {children}
    </header>
  );
}
