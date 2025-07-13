// app/layout.tsx

import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDG MAIT",
  description: "Official website of GDG MAIT - Maharaja Agrasen Institute of Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
