// import type { Metadata } from 'next'
// import { JetBrains_Mono } from 'next/font/google'
// import './globals.css'

// const jetbrainsMono = JetBrains_Mono({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-jetbrains-mono',
//   display: 'swap',
// })

// export const metadata: Metadata = {
//   title: 'Terminal Portfolio | Your Name',
//   description: 'Interactive terminal-themed portfolio showcasing projects, skills, and experience. Built with Next.js, React, and TypeScript.',
//   keywords: ['portfolio', 'developer', 'react', 'nextjs', 'typescript', 'frontend', 'terminal', 'web developer'],
//   authors: [{ name: 'Your Name', url: 'https://github.com/yourusername' }],
//   creator: 'Your Name',
//   publisher: 'Your Name',
//   openGraph: {
//     title: 'Terminal Portfolio | Your Name',
//     description: 'Interactive terminal-themed portfolio showcasing projects and skills',
//     type: 'website',
//     locale: 'en_US',
//     siteName: 'Terminal Portfolio',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Terminal Portfolio | Your Name',
//     description: 'Interactive terminal-themed portfolio',
//     creator: '@yourusername',
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   icons: {
//     icon: '/favicon.ico',
//     shortcut: '/favicon-16x16.png',
//     apple: '/apple-touch-icon.png',
//   },
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </head>
//       <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
//         {children}
//       </body>
//     </html>
//   )
// }


import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Terminal Portfolio | Your Name',
  description: 'Interactive terminal-themed portfolio showcasing projects, skills, and experience.',
  keywords: ['portfolio', 'developer', 'react', 'nextjs', 'typescript', 'frontend'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        {children}
      </body>
    </html>
  )
}