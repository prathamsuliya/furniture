import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maison — Luxury Furniture Showroom',
  description:
    'Step inside a world of considered design. Maison curates the finest European furniture — handcrafted pieces that transform spaces into sanctuaries.',
  keywords: 'luxury furniture, European design, interior, showroom, handcrafted',
  openGraph: {
    title: 'Maison — Luxury Furniture Showroom',
    description: 'Step inside a world of considered design.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full overflow-hidden bg-warm-beige antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
