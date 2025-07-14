import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Chatbot from '@/components/Chatbot'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GDG MAIT – Developers Platform',
  description: 'Explore, host, and join tech events at MAIT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
