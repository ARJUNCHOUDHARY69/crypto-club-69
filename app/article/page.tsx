'use client'

import Footer from '@/components/Footer'
import { Calendar, Clock, Eye, MessageCircle, Share2, ArrowRight, TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function ArticlePage() {
  const [cryptoData, setCryptoData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&per_page=10')
        if (response.ok) {
          const data = await response.json()
          setCryptoData(data)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching crypto data:', error)
        setLoading(false)
      }
    }
    fetchCryptoData()
  }, [])

  return (
    <>
      {/* Hero Section - Mobile Optimized */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-crypto-gold/10 border border-crypto-gold/30 rounded-full px-3 py-1.5 mb-4 sm:mb-6">
              <span className="text-crypto-gold text-xs sm:text-sm font-mono tracking-wider">LATEST INSIGHTS</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-mono tracking-wider leading-tight" style={{
              textShadow: '3px 0 0 #ff0000, -3px 0 0 #0000ff, 0 3px 0 #ff0000, 0 -3px 0 #0000ff',
              filter: 'contrast(1.3)'
            }}>
              FEATURED <span className="text-crypto-gold">ARTICLES</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-mono mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Expert insights on the future of cryptocurrency and blockchain technology
            </p>
          </div>
        </div>
      </div>

      {/* Modern Charts Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Charts Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-mono tracking-wider" style={{
              textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>
              LIVE <span className="text-crypto-gold">MARKET ANALYTICS</span>
            </h2>
            <p className="text-gray-400 font-mono">Real-time cryptocurrency market data and insights</p>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Coin Performance Chart */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-crypto-gold rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">TOP COINS PERFORMANCE</h3>
                  <p className="text-sm text-gray-400 font-mono">24H Price Changes</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-3">
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
                  cryptoData.slice(0, 5).map((coin, index) => (
                    <div key={coin.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-crypto-gold rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-xs">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{coin.name}</div>
                          <div className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">${coin.current_price?.toLocaleString() || '0'}</div>
                        <div className={`text-sm flex items-center space-x-1 ${
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
                  ))
                )}
              </div>
            </div>

            {/* Market Cap Pie Chart */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-mono">MARKET CAP DISTRIBUTION</h3>
                  <p className="text-sm text-gray-400 font-mono">Top 5 Cryptocurrencies</p>
                </div>
              </div>
              
              <div className="relative">
                {/* SVG Pie Chart */}
                <svg className="w-full h-64" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="btcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f7931a" />
                      <stop offset="100%" stopColor="#ffb84d" />
                    </linearGradient>
                    <linearGradient id="ethGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#627eea" />
                      <stop offset="100%" stopColor="#8fa4f3" />
                    </linearGradient>
                    <linearGradient id="bnbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f3ba2f" />
                      <stop offset="100%" stopColor="#f5c842" />
                    </linearGradient>
                    <linearGradient id="solGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9945ff" />
                      <stop offset="100%" stopColor="#b366ff" />
                    </linearGradient>
                    <linearGradient id="xrpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#23292f" />
                      <stop offset="100%" stopColor="#4a5568" />
                    </linearGradient>
                  </defs>
                  
                  {/* Pie Chart Sectors */}
                  <path d="M 100 100 L 100 0 A 100 100 0 0 1 170.71 29.29 Z" fill="url(#btcGradient)" />
                  <path d="M 100 100 L 170.71 29.29 A 100 100 0 0 1 170.71 170.71 Z" fill="url(#ethGradient)" />
                  <path d="M 100 100 L 170.71 170.71 A 100 100 0 0 1 29.29 170.71 Z" fill="url(#bnbGradient)" />
                  <path d="M 100 100 L 29.29 170.71 A 100 100 0 0 1 29.29 29.29 Z" fill="url(#solGradient)" />
                  <path d="M 100 100 L 29.29 29.29 A 100 100 0 0 1 100 0 Z" fill="url(#xrpGradient)" />
                  
                  {/* Center Circle */}
                  <circle cx="100" cy="100" r="40" fill="#1f2937" />
                  <text x="100" y="95" textAnchor="middle" className="text-white text-xs font-bold">TOTAL</text>
                  <text x="100" y="110" textAnchor="middle" className="text-crypto-gold text-xs font-bold">$2.1T</text>
                </svg>
                
                {/* Legend */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-300">Bitcoin</span>
                    </div>
                    <span className="text-white font-semibold">42.5%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Ethereum</span>
                    </div>
                    <span className="text-white font-semibold">18.4%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-300">BNB</span>
                    </div>
                    <span className="text-white font-semibold">4.2%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">Solana</span>
                    </div>
                    <span className="text-white font-semibold">3.8%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-300">Others</span>
                    </div>
                    <span className="text-white font-semibold">31.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700/50 text-center">
              <div className="w-12 h-12 bg-crypto-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-black" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">$2.1T</div>
              <div className="text-xs text-gray-400 font-mono">TOTAL MARKET CAP</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700/50 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">$120B</div>
              <div className="text-xs text-gray-400 font-mono">24H VOLUME</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700/50 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">13.5K</div>
              <div className="text-xs text-gray-400 font-mono">ACTIVE COINS</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700/50 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">875</div>
              <div className="text-xs text-gray-400 font-mono">EXCHANGES</div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section - Mobile Optimized */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
          
          {/* Article 1 - Bitcoin - Mobile Optimized */}
          <article className="group">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700/50 hover:border-crypto-gold/50 transition-all duration-500 shadow-xl hover:shadow-crypto-gold/20">
              
              {/* Featured Image - Mobile Optimized */}
              <div className="relative h-[200px] sm:h-[280px] md:h-[350px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1400&h=800&fit=crop" 
                  alt="Bitcoin Future"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"></div>
                
                {/* Floating Badge - Mobile Optimized */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <div className="bg-orange-500/95 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-bold font-mono shadow-lg">
                    BITCOIN
                  </div>
                </div>
                
                {/* Overlay Content - Mobile Optimized */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                  <div className="max-w-4xl">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 font-mono tracking-wide leading-tight" style={{
                      textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                      filter: 'contrast(1.2)'
                    }}>
                      THE FUTURE OF BITCOIN: INSTITUTIONAL ADOPTION & $200K PREDICTIONS
                    </h2>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs text-gray-300 font-mono">
                      <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                        <Calendar className="w-3 h-3 text-crypto-gold" />
                        <span>OCT 23</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3 text-crypto-gold" />
                        <span>8 MIN</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                        <Eye className="w-3 h-3 text-crypto-gold" />
                        <span>45K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content - Mobile Optimized */}
              <div className="p-3 sm:p-4 md:p-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
                    Bitcoin has entered a new phase of maturity as institutional investors increasingly recognize its value as a store of wealth and hedge against inflation. Major financial institutions, including BlackRock, Fidelity, and JPMorgan, have launched Bitcoin investment products, signaling a fundamental shift in how traditional finance views digital assets.
                  </p>

                  <div className="bg-gradient-to-r from-orange-500/5 to-crypto-gold/5 border-l-4 border-orange-500 p-3 sm:p-4 rounded-r-lg mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-crypto-gold mb-2 sm:mb-3 font-mono tracking-wider" style={{
                      textShadow: '1.5px 0 0 #ff0000, -1.5px 0 0 #0000ff',
                      filter: 'contrast(1.1)'
                    }}>INSTITUTIONAL ADOPTION ACCELERATES</h3>
                  </div>
                
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed">
                    The approval of Bitcoin ETFs in multiple jurisdictions has opened the floodgates for institutional capital. With over $50 billion in assets under management across various Bitcoin investment vehicles, institutional adoption validates Bitcoin's role in modern portfolios. This represents a seismic shift from Bitcoin's early days as a fringe digital currency to its current status as a legitimate asset class.
                  </p>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed">
                    Corporate treasuries are increasingly allocating portions of their cash reserves to Bitcoin. Companies like MicroStrategy, Tesla, and Block have made significant Bitcoin purchases, with MicroStrategy alone holding over 150,000 BTC worth billions of dollars. This corporate adoption creates a new demand source that didn't exist in previous market cycles.
                  </p>

                  <div className="bg-gradient-to-r from-crypto-gold/5 to-yellow-500/5 border-l-4 border-crypto-gold p-3 sm:p-4 rounded-r-lg mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-crypto-gold mb-2 sm:mb-3 font-mono tracking-wider" style={{
                      textShadow: '1.5px 0 0 #ff0000, -1.5px 0 0 #0000ff',
                      filter: 'contrast(1.1)'
                    }}>PRICE PREDICTIONS AND MARKET DYNAMICS</h3>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed">
                    Leading analysts project Bitcoin could reach $200,000 driven by the 2024 halving, increasing institutional demand, and growing adoption in emerging markets. The halving event, which occurs approximately every four years, reduces the rate of new Bitcoin creation by 50%, creating a supply shock that historically leads to significant price appreciation.
                  </p>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed">
                    The scarcity model, combined with expanding utility, creates a powerful upward pressure on Bitcoin's value. With only 21 million Bitcoin ever to be created and over 19 million already in circulation, the remaining supply becomes increasingly scarce. This digital scarcity, combined with growing global adoption, forms the foundation for long-term price appreciation.
                  </p>

                  <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-crypto-gold mb-2 sm:mb-3 font-mono tracking-wider" style={{
                      textShadow: '1.5px 0 0 #ff0000, -1.5px 0 0 #0000ff',
                      filter: 'contrast(1.1)'
                    }}>TECHNOLOGICAL IMPROVEMENTS</h3>
                  </div>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed">
                    Beyond its monetary aspects, the Bitcoin network continues to evolve. The Lightning Network, a Layer 2 scaling solution, is enhancing Bitcoin's transaction speed and reducing fees, making it more practical for everyday use. This development addresses one of Bitcoin's primary criticisms while maintaining its decentralized nature.
                  </p>

                  <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-relaxed">
                    Developments in sidechains and other scaling technologies are also contributing to Bitcoin's efficiency and broader applicability. These innovations are crucial for Bitcoin to handle a larger volume of transactions and maintain its competitive edge in the rapidly advancing blockchain ecosystem.
                  </p>

                  <div className="bg-gradient-to-r from-orange-500/10 to-crypto-gold/10 border-l-4 border-orange-500 p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-crypto-gold rounded-full"></div>
                      <p className="text-crypto-gold font-bold font-mono text-sm sm:text-base md:text-lg" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff'
                      }}>KEY INSIGHT: BITCOIN'S FUTURE IS BRIGHT</p>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                      Bitcoin's future is bright, driven by accelerating institutional adoption, strong price predictions, and continuous technological advancements. It's poised to become a cornerstone of the global financial system, offering a hedge against inflation and economic uncertainty while providing a decentralized alternative to traditional banking systems.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </article>

          {/* Article 2 - Ethereum */}
          <article className="group">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700/50 hover:border-crypto-gold/50 transition-all duration-500 shadow-2xl hover:shadow-crypto-gold/20">
              
              {/* Featured Image */}
              <div className="relative h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&h=800&fit=crop" 
                  alt="Ethereum Future"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold font-mono shadow-lg">
                    ETHEREUM ANALYSIS
                  </div>
                </div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <div className="max-w-4xl">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 font-mono tracking-wide leading-tight" style={{
                      textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                      filter: 'contrast(1.2)'
                    }}>
                      ETHEREUM 2.0: SMART CONTRACTS REVOLUTION & INFINITE SCALABILITY
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 font-mono">
                      <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Calendar className="w-3 h-3 text-crypto-gold" />
                        <span>OCT 22, 2025</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Clock className="w-3 h-3 text-crypto-gold" />
                        <span>10 MIN READ</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Eye className="w-3 h-3 text-crypto-gold" />
                        <span>38K VIEWS</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <MessageCircle className="w-3 h-3 text-crypto-gold" />
                        <span>189 COMMENTS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                    Ethereum's transition to proof-of-stake through "The Merge" represents one of the most significant upgrades in cryptocurrency history. This shift has reduced energy consumption by 99.95% while laying the foundation for unprecedented scalability and efficiency in blockchain technology.
                  </p>

                  <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-l-4 border-blue-500 p-4 sm:p-6 rounded-r-lg mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-crypto-gold mb-3 font-mono tracking-wider" style={{
                      textShadow: '1.5px 0 0 #ff0000, -1.5px 0 0 #0000ff',
                      filter: 'contrast(1.1)'
                    }}>THE PROOF-OF-STAKE REVOLUTION</h3>
                  </div>
                
                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    Ethereum 2.0's proof-of-stake consensus mechanism has transformed the network from energy-intensive mining to validator-based security. Validators stake ETH to secure the network, earning rewards while dramatically reducing environmental impact. This transition represents a fundamental shift in how blockchain networks achieve consensus.
                  </p>

                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    The move to Proof-of-Stake has democratized network participation, allowing more users to contribute to and secure the blockchain without expensive mining equipment. This accessibility has led to increased decentralization and network security, as the cost of attacking the network has significantly increased.
                  </p>

                  <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-l-4 border-purple-500 p-4 sm:p-6 rounded-r-lg mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-crypto-gold mb-3 font-mono tracking-wider" style={{
                      textShadow: '1.5px 0 0 #ff0000, -1.5px 0 0 #0000ff',
                      filter: 'contrast(1.1)'
                    }}>SCALABILITY THROUGH SHARDING</h3>
                  </div>
                
                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    The upcoming implementation of sharding will enable Ethereum to process up to 100,000 transactions per second. This scalability breakthrough will make Ethereum competitive with traditional payment networks while maintaining decentralization. Sharding splits the Ethereum blockchain into multiple "shards" that can process transactions in parallel.
                  </p>

                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    Combined with Layer 2 scaling solutions like rollups (Optimistic and ZK-Rollups), sharding will create a multi-layered scaling architecture that positions Ethereum to support a global user base and a vast array of decentralized applications, from gaming to enterprise solutions.
                  </p>

                  <div className="bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-l-4 border-green-500 p-4 sm:p-6 rounded-r-lg mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-crypto-gold mb-3 font-mono tracking-wider" style={{
                      textShadow: '1.5px 0 0 #ff0000, -1.5px 0 0 #0000ff',
                      filter: 'contrast(1.1)'
                    }}>SMART CONTRACT DOMINANCE</h3>
                  </div>

                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    Ethereum's robust smart contract capabilities remain its core strength. The upgrade to Ethereum 2.0 further solidifies its position as the go-to platform for developers building innovative dApps, NFTs, and DeFi protocols. The enhanced scalability and security will attract even more talent and capital, fostering a virtuous cycle of innovation and growth.
                  </p>

                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    The DeFi ecosystem built on Ethereum has grown to over $100 billion in total value locked, demonstrating the platform's ability to support complex financial applications. This growth has been driven by innovative protocols like Uniswap, Aave, and Compound, which have revolutionized how we think about lending, borrowing, and trading.
                  </p>

                  <div className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-l-4 border-cyan-500 p-4 sm:p-6 rounded-r-lg mb-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-crypto-gold mb-3 font-mono tracking-wider" style={{
                      textShadow: '1.5px 0 0 #ff0000, -1.5px 0 0 #0000ff',
                      filter: 'contrast(1.1)'
                    }}>THE FUTURE OF WEB3</h3>
                  </div>

                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    As the ecosystem matures, Ethereum is set to become an even more integral part of the digital economy, driving the next wave of blockchain adoption. The platform's ability to support complex applications while maintaining security and decentralization makes it the foundation for the next generation of internet applications.
                  </p>

                  <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                    The integration of artificial intelligence, machine learning, and other emerging technologies with Ethereum's smart contract capabilities opens up new possibilities for innovation. This convergence of technologies will likely drive the next major wave of adoption and use cases for blockchain technology.
                  </p>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500 p-4 sm:p-6 rounded-2xl mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <p className="text-blue-400 font-bold font-mono text-lg sm:text-xl" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff'
                      }}>KEY INSIGHT: ETHEREUM 2.0'S IMPACT</p>
                    </div>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      Ethereum 2.0's transition to Proof-of-Stake and future sharding upgrades are set to revolutionize its scalability, security, and sustainability, cementing its role as the leading smart contract platform and the foundation of the decentralized web.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </article>

        </div>
      </div>

      <Footer />
    </>
  )
}
