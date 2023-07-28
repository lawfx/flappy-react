import './globals.css'
import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'

const press_start_2p = Press_Start_2P({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Reacty Bird',
  description: 'Flappy bird clone made with React'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={press_start_2p.className}>{children}</body>
    </html>
  )
}
