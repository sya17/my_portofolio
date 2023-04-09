import "./globals.css";
import  Head  from 'next/head';

export const metadata = {
  title: "Sarip Hidayatullah",
  description: "Portofolio Sarip Hidayatullah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="user_icon.ico" />
      </Head>
      {children}
    </html>
  );
}
