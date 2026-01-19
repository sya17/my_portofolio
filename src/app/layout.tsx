import './globals.css';
import Head from 'next/head';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sarip Hidayatullah - Portfolio',
  description: 'Software Developer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="user_icon.ico" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
