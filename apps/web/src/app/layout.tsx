import { Noto_Sans_KR } from 'next/font/google'

import '@workspace/ui/globals.css'
import { Providers } from '@/components/providers'

const fontNotoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontNotoSansKr.variable} font-noto-sans-kr max-w-lg mx-auto w-full h-screen antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
