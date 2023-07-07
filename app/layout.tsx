import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
 import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
 import { Toaster } from 'react-hot-toast'
import { ToastProvider } from '@/providers/ToastProvider'
 
 
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ecom',
  description: 'ecom',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <ClerkProvider>

    <html lang="en">
      <body className={inter.className}>
        <ToastProvider/>
        <ModalProvider/>
       
        {children}</body>
    </html>
    </ClerkProvider>
  )
}
