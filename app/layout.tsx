import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/providers/toast-provider'

const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'simon game npn',
  description: 'created by niranjan p.n',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ToastProvider/>
        {children}
        </body>
    </html>
  )
}
