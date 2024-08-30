import type { Metadata } from "next";
import { mouse_memoirs } from "./font";
import Head from "next/head";

import "./globals.css";


export const metadata: Metadata = {
  title: "Hangman",
  description: "Enjoy classic Hnagman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  
      <body className={`${mouse_memoirs.className} antialiased`}>{children}</body>
    </html>
  );
}
