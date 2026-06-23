import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pranit Hole',
  description:
    'A self-taught builder exploring technology, AI systems, design, and digital products through experimentation.',
  authors: [{ name: 'Pranit Hole' }],
  keywords: ['Pranit Hole', 'AURA', 'builder', 'AI', 'design', 'Next.js', 'Nagpur'],
  openGraph: {
    title: 'Pranit Hole',
    description:
      'A self-taught builder exploring technology, AI systems, design, and digital products through experimentation.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf9f7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.className} bg-background`}>
      <body className="font-sans antialiased noise">{children}</body>
    </html>
  )
}
