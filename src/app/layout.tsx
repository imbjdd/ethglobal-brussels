import { headers } from 'next/headers'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DDD - Decentralized datasets",
  description: "Decentralize data application",
};


import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider initialState={initialState}>
          <main>{children}</main>
          <Toaster />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
