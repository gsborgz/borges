import '@assets/globals.css';
import React from 'react';
import { Inter } from 'next/font/google';

import Header from '@components/layout/Header';
import Main from '@components/layout/Main';
import Footer from '@components/layout/Footer';
import { I18nProvider } from '@providers/I18nProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Gabriel Borges',
  description: 'Gabriel Borges - CV',
  icons: {
    icon: '/borges_icon.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={ `${inter.className} min-h-screen bg-slate-50 dark:bg-slate-950`}>
        <I18nProvider>
          <Header />
          <Main>{ children }</Main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
