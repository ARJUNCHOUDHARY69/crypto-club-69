'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Star, ArrowUpRight, Zap, Flame, Rocket, Target, DollarSign, Activity } from 'lucide-react'

interface TrendingItem {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

export default function TrendingSection() {
  const [trendingData, setTrendingData] = useState<TrendingItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setLoading(true)
        console.log('Fetching trending data...')
        
        const response = await fetch('/api/crypto?endpoint=coins/markets')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Trending API Response:', data)
        
        if (Array.isArray(data)) {
          setTrendingData(data)
        } else {
          throw new Error('Invalid API response - expected array')
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching trending data:', error)
        // Set fallback data
        const fallbackData = [
          {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            current_price: 107916,
            price_change_percentage_24h: 2.77,
            market_cap: 2100000000000,
            total_volume: 16000000000,
            image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
          },
          {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            current_price: 2890,
            price_change_percentage_24h: 1.45,
            market_cap: 350000000000,
            total_volume: 8500000000,
            image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
          },
          {
            id: 'binancecoin',
            name: 'BNB',
            symbol: 'BNB',
            current_price: 320,
            price_change_percentage_24h: -0.85,
            market_cap: 48000000000,
            total_volume: 1200000000,
            image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
          },
          {
            id: 'cardano',
            name: 'Cardano',
            symbol: 'ADA',
            current_price: 0.45,
            price_change_percentage_24h: 3.21,
            market_cap: 15000000000,
            total_volume: 450000000,
            image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
          },
          {
            id: 'solana',
            name: 'Solana',
            symbol: 'SOL',
            current_price: 95,
            price_change_percentage_24h: 5.67,
            market_cap: 40000000000,
            total_volume: 2100000000,
            image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png'
          }
        ]
        setTrendingData(fallbackData)
        setLoading(false)
      }
    }

    fetchTrendingData()
    const interval = setInterval(fetchTrendingData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`
    if (price < 100) return `$${price.toFixed(4)}`
    return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div className="space-y-8">
      {/* Market Stats */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-crypto-gold/30 transition-all duration-300 group">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Zap className="w-6 h-6 text-crypto-gold" />
            <h3 className="text-xl font-bold text-white">Market Pulse</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 hover:border-crypto-gold/30 transition-all duration-300 group-hover:scale-105">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">Trading</div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 hover:border-crypto-gold/30 transition-all duration-300 group-hover:scale-105">
              <div className="text-2xl font-bold text-white">Live</div>
              <div className="text-sm text-gray-300">Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Cryptocurrencies */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 hover:border-crypto-gold/30 transition-all duration-300 group">
        <div className="flex items-center space-x-2 mb-6">
          <Flame className="w-6 h-6 text-crypto-gold" />
            <h3 className="text-xl font-bold text-white font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>TRENDING NOW</h3>
        </div>
        
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-4 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(trendingData) && trendingData.length > 0 ? trendingData.map((crypto, index) => (
              <div key={crypto.id} className="bg-gray-700/30 hover:bg-gray-700/50 rounded-xl p-4 border border-gray-600/50 hover:border-crypto-gold/30 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-black font-bold text-sm">{index + 1}</span>
                    </div>
                    <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="font-semibold text-white group-hover:text-crypto-gold transition-colors">
                        {crypto.name}
                      </div>
                      <div className="text-sm text-gray-400 uppercase">{crypto.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-white">{formatPrice(crypto.current_price)}</div>
                    <div className={`text-sm flex items-center space-x-1 ${
                      crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatMarketCap(crypto.market_cap)}
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">No trending data available</div>
                <div className="text-sm text-gray-500">Please try again later</div>
              </div>
            )
          )}
        </div>
      </div>


    </div>
  )
}
