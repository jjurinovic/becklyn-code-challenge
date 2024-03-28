import type { Metadata } from 'next';

import localFont from 'next/font/local';

import './globals.css';
import { Header } from './ui/header';
import { Footer } from './ui/footer';

const gotham = localFont({
  src: [
    {
      path: '../../public/Gotham/Gotham-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/Gotham/Gotham-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/Gotham/Gotham-Book.otf',
      weight: 'normal',
      style: 'normal',
    },
    {
      path: '../../public/Gotham/Gotham-Bold.otf',
      weight: 'bold',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Becklyn Code Challenge',
  description: 'Code Challenge for Becklyn',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={gotham.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
