import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ModalProvider } from '@/providers/modal-providers'
import ToasterProvider from '@/providers/toast-provider'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'admin dashboard',
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
          <ToasterProvider/>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
