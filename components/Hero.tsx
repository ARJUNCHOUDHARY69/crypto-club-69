'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, DollarSign, Users, Activity, Zap, Star, ArrowRight, Shield, Globe } from 'lucide-react'

export default function Hero() {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null)
  const [marketCap, setMarketCap] = useState<string>('2.1T')
  const [isAnimating, setIsAnimating] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        // Try our secure API first
        const response = await fetch('/api/crypto?endpoint=simple/price&coin=bitcoin')
        if (response.ok) {
          const data = await response.json()
          if (data.bitcoin?.usd) {
            setBitcoinPrice(data.bitcoin.usd)
            setIsAnimating(true)
            setTimeout(() => setIsAnimating(false), 1000)
            return
          }
        }
        
        // Fallback to direct API call
        const directResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        const directData = await directResponse.json()
        if (directData.bitcoin?.usd) {
          setBitcoinPrice(directData.bitcoin.usd)
          setIsAnimating(true)
          setTimeout(() => setIsAnimating(false), 1000)
        }
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error)
        // Set current real price as fallback
        setBitcoinPrice(107916)
      }
    }

    // Set initial price to prevent hydration mismatch
    setBitcoinPrice(107916)
    
    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-crypto-gold/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-crypto-gold/4 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-green-500/6 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/6 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute top-3/4 right-1/3 w-48 h-48 bg-purple-500/4 rounded-full blur-2xl animate-pulse delay-900"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-crypto-gold">Your Gateway to</span> <span className="text-white">Crypto Success</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join <span className="text-crypto-gold font-bold">150K+ crypto enthusiasts</span> who trust us for 
              <span className="text-crypto-gold font-bold"> expert analysis</span>, <span className="text-crypto-gold font-bold">market insights</span>, and 
              <span className="text-crypto-gold font-bold"> profitable opportunities</span> in the crypto world.
            </p>
          </div>
          


          {/* CRYPTO CLUB 69 Influence Indicator */}
          <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Globe className="w-4 h-4" />
            <span>Trusted by <span className="text-crypto-gold font-semibold">150K+ crypto enthusiasts</span> worldwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
