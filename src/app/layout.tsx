import './globals.css';
import type { Metadata } from 'next';
import { Atkinson_Hyperlegible_Next } from 'next/font/google';
import HeaderSection from './components/headerSection';
import FooterSection from './components/footerSection';

// Drawn so that l, I, 1, O and 0 can never be mistaken for each other.
const sans = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Sarip Hidayatullah, Java developer',
    template: '%s · Sarip Hidayatullah',
  },
  description:
    'Java developer in Jakarta, building back-office systems with Spring, ZK and Vue since 2021.',
};

// Applies a saved theme before first paint, so there is no flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <HeaderSection />
        <main className="page flex-1">{children}</main>
        <FooterSection />
      </body>
    </html>
  );
}
