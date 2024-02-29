import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Record Diff Checker',
  description: 'npm `diff-unique-record` Sample Web App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`grid grid-rows-[auto_1fr] min-h-lvh ${inter.className}`}>
        <header className="bg-white/70 px-8 py-4">
          <div className="flex items-center max-w-5xl w-full">
            <h1 className="font-bold italic">Record Diff Checker</h1>
          </div>
        </header>
        <main className="p-8">
          <div className="flex max-w-5xl w-full h-full">{children}</div>
        </main>
      </body>
    </html>
  )
}
