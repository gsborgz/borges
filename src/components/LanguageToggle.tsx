'use client'

import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@components/ui/Button';
import i18n from '@lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/DropdownMenu';
import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('pt');

  useEffect(() => {
    // Initialize i18n and set up language change listener
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    if (i18n.isInitialized) {
      setCurrentLanguage(i18n.language);
      i18n.on('languageChanged', handleLanguageChange);
    } else {
      i18n.init().then(() => {
        setCurrentLanguage(i18n.language);
        i18n.on('languageChanged', handleLanguageChange);
      });
    }

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const languages = [
    { code: 'pt', label: 'Português' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  const handleLanguageChange = (langCode: string) => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(langCode);
    } else {
      console.error('i18n.changeLanguage is not available');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' title={t('toggleLanguage')}>
          <Languages className='h-4 w-4 text-gray-950 dark:text-gray-50' />
          <span className='sr-only'>Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? 'bg-gray-200 dark:bg-zinc-700' : ''}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
