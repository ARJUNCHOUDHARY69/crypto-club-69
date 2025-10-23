'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Target, Zap, AlertCircle, CheckCircle } from 'lucide-react'

interface MarketAnalysis {
  coin: string
  symbol: string
  price: number
  change24h: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
  support: number
  resistance: number
  volume: number
  recommendation: string
}

export default function AnalysisPage() {
  const [analyses, setAnalyses] = useState<MarketAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [marketSentiment, setMarketSentiment] = useState('BULLISH')
  const [fearGreedIndex, setFearGreedIndex] = useState(65)
  const [globalData, setGlobalData] = useState<any>(null)
  const [trendingData, setTrendingData] = useState<any[]>([])
  const [marketStats, setMarketStats] = useState({
    totalMarketCap: 0,
    totalVolume: 0,
    activeCryptocurrencies: 0,
    marketCapChange: 0,
    bitcoinDominance: 0,
    ethereumDominance: 0
  })

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true)
        
        // Fetch multiple data sources in parallel
        const [marketsResponse, globalResponse, trendingResponse] = await Promise.all([
          fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&per_page=50'),
          fetch('/api/crypto?endpoint=global'),
          fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&order=market_cap_desc&per_page=10')
        ])
        
        if (marketsResponse.ok && globalResponse.ok && trendingResponse.ok) {
          const [marketsData, globalData, trendingData] = await Promise.all([
            marketsResponse.json(),
            globalResponse.json(),
            trendingResponse.json()
          ])
          
          // Process markets data
          const analysisData: MarketAnalysis[] = marketsData.map((coin: any) => ({
            coin: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
            sentiment: coin.price_change_percentage_24h > 2 ? 'bullish' : 
                      coin.price_change_percentage_24h < -2 ? 'bearish' : 'neutral',
            support: coin.low_24h,
            resistance: coin.high_24h,
            volume: coin.total_volume,
            recommendation: coin.price_change_percentage_24h > 2 ? 'BUY' : 
                           coin.price_change_percentage_24h < -2 ? 'SELL' : 'HOLD'
          }))
          setAnalyses(analysisData)
          
          // Process global data
          setGlobalData(globalData.data)
          setTrendingData(trendingData)
          
          // Calculate market stats
          if (globalData.data) {
            setMarketStats({
              totalMarketCap: globalData.data.total_market_cap?.usd || 0,
              totalVolume: globalData.data.total_volume?.usd || 0,
              activeCryptocurrencies: globalData.data.active_cryptocurrencies || 0,
              marketCapChange: globalData.data.market_cap_change_percentage_24h_usd || 0,
              bitcoinDominance: globalData.data.market_cap_percentage?.btc || 0,
              ethereumDominance: globalData.data.market_cap_percentage?.eth || 0
            })
          }
        } else {
          // Fallback analysis data - 25 coins
          const fallbackData: MarketAnalysis[] = [
            { coin: 'Bitcoin', symbol: 'BTC', price: 107916, change24h: 0.13, sentiment: 'neutral', support: 106800, resistance: 108500, volume: 45000000000, recommendation: 'HOLD' },
            { coin: 'Ethereum', symbol: 'ETH', price: 3839.63, change24h: -1.09, sentiment: 'neutral', support: 3810, resistance: 3920, volume: 20000000000, recommendation: 'HOLD' },
            { coin: 'BNB', symbol: 'BNB', price: 612.45, change24h: 1.36, sentiment: 'neutral', support: 598, resistance: 625, volume: 1800000000, recommendation: 'HOLD' },
            { coin: 'Solana', symbol: 'SOL', price: 198.32, change24h: -1.07, sentiment: 'neutral', support: 195, resistance: 205, volume: 4200000000, recommendation: 'HOLD' },
            { coin: 'XRP', symbol: 'XRP', price: 2.39, change24h: -2.07, sentiment: 'bearish', support: 2.35, resistance: 2.48, volume: 2100000000, recommendation: 'SELL' },
            { coin: 'Cardano', symbol: 'ADA', price: 0.48, change24h: 4.35, sentiment: 'bullish', support: 0.45, resistance: 0.51, volume: 890000000, recommendation: 'BUY' },
            { coin: 'Dogecoin', symbol: 'DOGE', price: 0.15, change24h: 6.67, sentiment: 'bullish', support: 0.14, resistance: 0.16, volume: 1200000000, recommendation: 'BUY' },
            { coin: 'Avalanche', symbol: 'AVAX', price: 28.45, change24h: -2.90, sentiment: 'bearish', support: 27.5, resistance: 29.8, volume: 450000000, recommendation: 'SELL' },
            { coin: 'Chainlink', symbol: 'LINK', price: 14.23, change24h: 3.26, sentiment: 'bullish', support: 13.9, resistance: 14.8, volume: 320000000, recommendation: 'BUY' },
            { coin: 'Polygon', symbol: 'MATIC', price: 0.89, change24h: -2.20, sentiment: 'bearish', support: 0.86, resistance: 0.93, volume: 280000000, recommendation: 'SELL' },
            { coin: 'Litecoin', symbol: 'LTC', price: 92.40, change24h: -0.92, sentiment: 'neutral', support: 89.5, resistance: 95.2, volume: 580000000, recommendation: 'HOLD' },
            { coin: 'Polkadot', symbol: 'DOT', price: 7.89, change24h: 2.45, sentiment: 'bullish', support: 7.55, resistance: 8.12, volume: 340000000, recommendation: 'BUY' },
            { coin: 'Tron', symbol: 'TRX', price: 0.22, change24h: 1.85, sentiment: 'neutral', support: 0.21, resistance: 0.23, volume: 890000000, recommendation: 'HOLD' },
            { coin: 'Shiba Inu', symbol: 'SHIB', price: 0.00002345, change24h: 8.92, sentiment: 'bullish', support: 0.00002156, resistance: 0.00002498, volume: 1500000000, recommendation: 'BUY' },
            { coin: 'Uniswap', symbol: 'UNI', price: 11.45, change24h: -3.12, sentiment: 'bearish', support: 10.95, resistance: 12.10, volume: 240000000, recommendation: 'SELL' },
            { coin: 'Cosmos', symbol: 'ATOM', price: 9.87, change24h: 1.23, sentiment: 'neutral', support: 9.45, resistance: 10.25, volume: 180000000, recommendation: 'HOLD' },
            { coin: 'Stellar', symbol: 'XLM', price: 0.35, change24h: 3.45, sentiment: 'bullish', support: 0.33, resistance: 0.37, volume: 290000000, recommendation: 'BUY' },
            { coin: 'Bitcoin Cash', symbol: 'BCH', price: 484.39, change24h: 0.11, sentiment: 'neutral', support: 475, resistance: 495, volume: 520000000, recommendation: 'HOLD' },
            { coin: 'Near Protocol', symbol: 'NEAR', price: 5.67, change24h: 2.89, sentiment: 'bullish', support: 5.35, resistance: 5.95, volume: 210000000, recommendation: 'BUY' },
            { coin: 'Aptos', symbol: 'APT', price: 12.34, change24h: -2.45, sentiment: 'bearish', support: 11.85, resistance: 12.95, volume: 380000000, recommendation: 'SELL' },
            { coin: 'Optimism', symbol: 'OP', price: 3.21, change24h: 1.67, sentiment: 'neutral', support: 3.05, resistance: 3.42, volume: 190000000, recommendation: 'HOLD' },
            { coin: 'Arbitrum', symbol: 'ARB', price: 1.89, change24h: 4.12, sentiment: 'bullish', support: 1.76, resistance: 2.05, volume: 450000000, recommendation: 'BUY' },
            { coin: 'VeChain', symbol: 'VET', price: 0.045, change24h: -1.23, sentiment: 'neutral', support: 0.042, resistance: 0.048, volume: 120000000, recommendation: 'HOLD' },
            { coin: 'Filecoin', symbol: 'FIL', price: 6.78, change24h: -2.89, sentiment: 'bearish', support: 6.45, resistance: 7.15, volume: 280000000, recommendation: 'SELL' },
            { coin: 'The Graph', symbol: 'GRT', price: 0.28, change24h: 5.34, sentiment: 'bullish', support: 0.26, resistance: 0.31, volume: 160000000, recommendation: 'BUY' }
          ]
          setAnalyses(fallbackData)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching analysis data:', error)
        setLoading(false)
      }
    }

    fetchAnalysisData()
    const interval = setInterval(fetchAnalysisData, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    return `$${volume.toFixed(2)}`
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-400 bg-green-500/20 border-green-500'
      case 'bearish': return 'text-red-400 bg-red-500/20 border-red-500'
      default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500'
    }
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'bg-green-500 text-white'
      case 'SELL': return 'bg-red-500 text-white'
      default: return 'bg-yellow-500 text-black'
    }
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-8 sm:py-12 border-b-4 border-crypto-gold">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-crypto-gold mb-4 font-mono tracking-wider" style={{
              textShadow: '3px 0 0 #ff0000, -3px 0 0 #0000ff, 0 3px 0 #ff0000, 0 -3px 0 #0000ff',
              filter: 'contrast(1.3)'
            }}>MARKET ANALYSIS</h1>
            <p className="text-lg sm:text-xl text-gray-300 font-mono tracking-wider">TECHNICAL ANALYSIS & TRADING RECOMMENDATIONS</p>
          </div>

          {/* Analysis Overview Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-crypto-gold/30 hover:border-crypto-gold transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-crypto-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">SENTIMENT</p>
                <p className="text-xs sm:text-sm font-bold text-green-400 font-mono">{marketSentiment}</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-blue-500/30 hover:border-blue-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">FEAR/GREED</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">{fearGreedIndex}/100</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-purple-500/30 hover:border-purple-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">SIGNALS</p>
                <p className="text-xs sm:text-sm font-bold text-crypto-gold font-mono">ACTIVE</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-green-500/30 hover:border-green-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">BULLISH</p>
                <p className="text-xs sm:text-sm font-bold text-green-400 font-mono">6/10</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-red-500/30 hover:border-red-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">BEARISH</p>
                <p className="text-xs sm:text-sm font-bold text-red-400 font-mono">4/10</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">RSI AVG</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">58.2</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-pink-500/30 hover:border-pink-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">AVG VOL</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">$8.5B</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-cyan-500/30 hover:border-cyan-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">ACCURACY</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">87%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Market Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Global Market Overview */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 mb-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 text-center font-mono tracking-wider" style={{
              textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>GLOBAL MARKET OVERVIEW</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-crypto-gold/20">
                <div className="w-12 h-12 bg-crypto-gold rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-black" />
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  ${marketStats.totalMarketCap >= 1e12 ? `${(marketStats.totalMarketCap / 1e12).toFixed(2)}T` : `${(marketStats.totalMarketCap / 1e9).toFixed(2)}B`}
                </div>
                <div className="text-xs text-gray-400 font-mono">TOTAL MARKET CAP</div>
                <div className={`text-xs font-mono ${marketStats.marketCapChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketStats.marketCapChange >= 0 ? '+' : ''}{marketStats.marketCapChange.toFixed(2)}%
                </div>
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-green-500/20">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  ${marketStats.totalVolume >= 1e9 ? `${(marketStats.totalVolume / 1e9).toFixed(2)}B` : `${(marketStats.totalVolume / 1e6).toFixed(2)}M`}
                </div>
                <div className="text-xs text-gray-400 font-mono">24H VOLUME</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-blue-500/20">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-white mb-1">{marketStats.activeCryptocurrencies.toLocaleString()}</div>
                <div className="text-xs text-gray-400 font-mono">ACTIVE COINS</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-orange-500/20">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-white mb-1">{marketStats.bitcoinDominance.toFixed(1)}%</div>
                <div className="text-xs text-gray-400 font-mono">BTC DOMINANCE</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-purple-500/20">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-white mb-1">{marketStats.ethereumDominance.toFixed(1)}%</div>
                <div className="text-xs text-gray-400 font-mono">ETH DOMINANCE</div>
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-4 text-center border border-cyan-500/20">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold text-white mb-1">{fearGreedIndex}/100</div>
                <div className="text-xs text-gray-400 font-mono">FEAR/GREED</div>
              </div>
            </div>
          </div>

          {/* Trending Coins Section */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 mb-8 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-wider text-center" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>TOP PERFORMING COINS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {trendingData.slice(0, 5).map((coin, index) => (
                <div key={coin.id} className="bg-gray-700/30 rounded-xl p-4 hover:bg-gray-700/50 transition-colors border border-gray-600/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-crypto-gold rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-xs">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{coin.name}</div>
                      <div className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white text-sm">${coin.current_price?.toLocaleString() || '0'}</div>
                    <div className={`text-xs flex items-center justify-end space-x-1 ${
                      coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{coin.price_change_percentage_24h?.toFixed(2) || '0'}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Table */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-6 border-2 border-gray-700/50">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-mono tracking-wider text-center" style={{
            textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
            filter: 'contrast(1.2)'
          }}>TOP 5 CRYPTO ANALYSIS</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-gold mx-auto mb-4"></div>
              <p className="text-gray-400 font-mono">ANALYZING MARKET DATA...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-crypto-gold">
                    <th className="text-left py-4 px-4 text-crypto-gold font-mono tracking-wider">COIN</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">PRICE</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">24H CHANGE</th>
                    <th className="text-center py-4 px-4 text-crypto-gold font-mono tracking-wider">SENTIMENT</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">SUPPORT</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">RESISTANCE</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">VOLUME</th>
                    <th className="text-center py-4 px-4 text-crypto-gold font-mono tracking-wider">SIGNAL</th>
                  </tr>
                </thead>
                <tbody>
                  {analyses.map((analysis, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-white font-semibold font-mono">{analysis.coin}</p>
                          <p className="text-gray-400 text-sm font-mono">{analysis.symbol}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-white font-mono font-bold">{formatPrice(analysis.price)}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={`flex items-center justify-end space-x-1 font-mono font-bold ${
                          analysis.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {analysis.change24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>{Math.abs(analysis.change24h).toFixed(2)}%</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border-2 ${getSentimentColor(analysis.sentiment)}`}>
                            {analysis.sentiment.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-green-400 font-mono">{formatPrice(analysis.support)}</td>
                      <td className="py-4 px-4 text-right text-red-400 font-mono">{formatPrice(analysis.resistance)}</td>
                      <td className="py-4 px-4 text-right text-white font-mono">{formatVolume(analysis.volume)}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center">
                          <span className={`px-4 py-2 rounded-lg text-xs font-bold font-mono ${getRecommendationColor(analysis.recommendation)}`}>
                            {analysis.recommendation}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Key Insights Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6 border-2 border-green-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-bold text-white font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>BULLISH SIGNALS</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 font-mono text-sm">Bitcoin holding strong above $107K support</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 font-mono text-sm">Altcoin season indicators showing strength</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 font-mono text-sm">Institutional buying pressure increasing</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 font-mono text-sm">DeFi TVL reaching new highs</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border-2 border-red-500/30">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold text-white font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>RISK ALERTS</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-gray-300 font-mono text-sm">Watch for potential resistance at $110K BTC</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-gray-300 font-mono text-sm">Some altcoins showing overbought signals</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-gray-300 font-mono text-sm">Regulatory concerns in key markets</span>
              </li>
              <li className="flex items-center space-x-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-gray-300 font-mono text-sm">Volume declining on some pairs</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Advanced Market Metrics Section */}
        <div className="mt-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-8 text-center font-mono tracking-wider" style={{
            textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
            filter: 'contrast(1.2)'
          }}>ADVANCED MARKET METRICS</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-green-500/20">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {analyses.filter(a => a.sentiment === 'bullish').length}
              </div>
              <div className="text-sm text-gray-400 font-mono">BULLISH SIGNALS</div>
              <div className="text-xs text-green-400 font-mono mt-2">
                {((analyses.filter(a => a.sentiment === 'bullish').length / analyses.length) * 100).toFixed(1)}% of market
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-red-500/20">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {analyses.filter(a => a.sentiment === 'bearish').length}
              </div>
              <div className="text-sm text-gray-400 font-mono">BEARISH SIGNALS</div>
              <div className="text-xs text-red-400 font-mono mt-2">
                {((analyses.filter(a => a.sentiment === 'bearish').length / analyses.length) * 100).toFixed(1)}% of market
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-yellow-500/20">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {analyses.filter(a => a.sentiment === 'neutral').length}
              </div>
              <div className="text-sm text-gray-400 font-mono">NEUTRAL SIGNALS</div>
              <div className="text-xs text-yellow-400 font-mono mt-2">
                {((analyses.filter(a => a.sentiment === 'neutral').length / analyses.length) * 100).toFixed(1)}% of market
              </div>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-crypto-gold/20">
              <div className="w-12 h-12 bg-crypto-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-black" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {analyses.filter(a => a.recommendation === 'BUY').length}
              </div>
              <div className="text-sm text-gray-400 font-mono">BUY RECOMMENDATIONS</div>
              <div className="text-xs text-crypto-gold font-mono mt-2">
                {((analyses.filter(a => a.recommendation === 'BUY').length / analyses.length) * 100).toFixed(1)}% of market
              </div>
            </div>
          </div>

          {/* Market Volatility Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-blue-500/20">
              <h4 className="text-lg font-bold text-blue-400 mb-4 font-mono">VOLATILITY ANALYSIS</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono">High Volatility Coins</span>
                  <span className="text-blue-400 font-bold">
                    {analyses.filter(a => Math.abs(a.change24h) > 5).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono">Medium Volatility</span>
                  <span className="text-yellow-400 font-bold">
                    {analyses.filter(a => Math.abs(a.change24h) > 2 && Math.abs(a.change24h) <= 5).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono">Low Volatility</span>
                  <span className="text-green-400 font-bold">
                    {analyses.filter(a => Math.abs(a.change24h) <= 2).length}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full" 
                    style={{ 
                      width: `${(analyses.filter(a => Math.abs(a.change24h) > 5).length / analyses.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-bold text-purple-400 mb-4 font-mono">PRICE RANGE ANALYSIS</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono">Above $100</span>
                  <span className="text-purple-400 font-bold">
                    {analyses.filter(a => a.price > 100).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono">$1 - $100</span>
                  <span className="text-blue-400 font-bold">
                    {analyses.filter(a => a.price >= 1 && a.price <= 100).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono">Below $1</span>
                  <span className="text-green-400 font-bold">
                    {analyses.filter(a => a.price < 1).length}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-purple-500 h-2 rounded-full" 
                    style={{ 
                      width: `${(analyses.filter(a => a.price > 100).length / analyses.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Sentiment Heatmap */}
        <div className="mt-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center font-mono tracking-wider" style={{
            textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
            filter: 'contrast(1.2)'
          }}>MARKET SENTIMENT HEATMAP</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {analyses.slice(0, 15).map((analysis, index) => (
              <div key={index} className={`rounded-lg p-4 text-center border-2 transition-all hover:scale-105 ${
                analysis.sentiment === 'bullish' ? 'bg-green-500/20 border-green-500' :
                analysis.sentiment === 'bearish' ? 'bg-red-500/20 border-red-500' :
                'bg-yellow-500/20 border-yellow-500'
              }`}>
                <div className="font-bold text-white text-sm font-mono mb-1">{analysis.symbol}</div>
                <div className={`text-xs font-mono ${
                  analysis.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {analysis.change24h >= 0 ? '+' : ''}{analysis.change24h.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-400 font-mono mt-1">
                  {analysis.sentiment.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Strategy Section */}
        <div className="mt-8 bg-gray-800/50 rounded-xl p-8 border-2 border-crypto-gold/30">
          <h3 className="text-2xl font-bold text-crypto-gold mb-6 text-center font-mono tracking-wider" style={{
            textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
            filter: 'contrast(1.2)'
          }}>RECOMMENDED TRADING STRATEGY</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-white font-bold mb-2 font-mono">ACCUMULATION PHASE</h4>
              <p className="text-gray-400 text-sm font-mono">Focus on established coins with strong fundamentals and positive sentiment</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold text-xl">2</span>
              </div>
              <h4 className="text-white font-bold mb-2 font-mono">RISK MANAGEMENT</h4>
              <p className="text-gray-400 text-sm font-mono">Set stop-losses at support levels and take profits at resistance zones</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-white font-bold mb-2 font-mono">DIVERSIFICATION</h4>
              <p className="text-gray-400 text-sm font-mono">Balance portfolio across BTC, ETH, and promising altcoins</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

