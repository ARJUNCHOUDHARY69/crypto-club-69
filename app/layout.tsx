import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import PriceTicker from '@/components/PriceTicker'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRYPTO CLUB 69 - Latest Crypto News',
  description: 'Stay updated with the latest cryptocurrency news, market analysis, and blockchain developments at CRYPTO CLUB 69.',
  keywords: 'cryptocurrency, bitcoin, ethereum, blockchain, crypto news, trading, DeFi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-crypto-gold/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-crypto-gold/4 rounded-full blur-3xl animate-pulse delay-500"></div>
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-500/6 rounded-full blur-2xl animate-pulse delay-700"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/6 rounded-full blur-2xl animate-pulse delay-300"></div>
            <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-purple-500/4 rounded-full blur-2xl animate-pulse delay-900"></div>
          </div>
          
          <div className="relative z-10">
            <Header />
            <PriceTicker />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
