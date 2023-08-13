import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import '../globals.css'
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authendication",
  description: "A Next.js 13 Threads clone",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <html lang='en'>
          <body className={`${inter.className} flex justify-center items-center h-[100vh] bg-dark-1`}>{children}</body>
        </html>
      </ClerkProvider>
    );
  }