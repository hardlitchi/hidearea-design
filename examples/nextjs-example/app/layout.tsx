import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hidearea Design System - Next.js Example',
  description: 'Example integration of Hidearea Design System with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
