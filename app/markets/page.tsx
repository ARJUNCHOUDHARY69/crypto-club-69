'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/Footer'
import { TrendingUp, TrendingDown, Search, Star, BarChart3, DollarSign, Activity } from 'lucide-react'

interface CryptoMarket {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  circulating_supply: number
  high_24h: number
  low_24h: number
  image: string
  market_cap_rank: number
}

export default function MarketsPage() {
  const [cryptoData, setCryptoData] = useState<CryptoMarket[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('market_cap_rank')
  const [globalData, setGlobalData] = useState<any>(null)
  const [marketStats, setMarketStats] = useState({
    totalMarketCap: 0,
    totalVolume: 0,
    activeCryptocurrencies: 0,
    marketCapChange: 0,
    bitcoinDominance: 0,
    ethereumDominance: 0,
    gainers: 0,
    losers: 0
  })

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true)
        
        // Fetch multiple data sources in parallel
        const [marketsResponse, globalResponse] = await Promise.all([
          fetch('/api/crypto?endpoint=coins/markets&vs_currency=usd&per_page=50'),
          fetch('/api/crypto?endpoint=global')
        ])
        
        if (marketsResponse.ok && globalResponse.ok) {
          const [marketsData, globalData] = await Promise.all([
            marketsResponse.json(),
            globalResponse.json()
          ])
          
          setCryptoData(marketsData)
          setGlobalData(globalData.data)
          
          // Calculate market stats
          if (globalData.data) {
            const gainers = marketsData.filter((coin: any) => coin.price_change_percentage_24h > 0).length
            const losers = marketsData.filter((coin: any) => coin.price_change_percentage_24h < 0).length
            
            setMarketStats({
              totalMarketCap: globalData.data.total_market_cap?.usd || 0,
              totalVolume: globalData.data.total_volume?.usd || 0,
              activeCryptocurrencies: globalData.data.active_cryptocurrencies || 0,
              marketCapChange: globalData.data.market_cap_change_percentage_24h_usd || 0,
              bitcoinDominance: globalData.data.market_cap_percentage?.btc || 0,
              ethereumDominance: globalData.data.market_cap_percentage?.eth || 0,
              gainers,
              losers
            })
          }
        } else {
          // Fallback data - 10 coins
          const fallbackData: CryptoMarket[] = [
            { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 107916, price_change_percentage_24h: 0.13, market_cap: 2100000000000, total_volume: 45000000000, circulating_supply: 19500000, high_24h: 108500, low_24h: 106800, image: '', market_cap_rank: 1 },
            { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3839.63, price_change_percentage_24h: -1.09, market_cap: 461000000000, total_volume: 20000000000, circulating_supply: 120000000, high_24h: 3920, low_24h: 3810, image: '', market_cap_rank: 2 },
            { id: 'binancecoin', symbol: 'BNB', name: 'BNB', current_price: 612.45, price_change_percentage_24h: 1.36, market_cap: 89000000000, total_volume: 1800000000, circulating_supply: 145000000, high_24h: 625, low_24h: 598, image: '', market_cap_rank: 3 },
            { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 198.32, price_change_percentage_24h: -1.07, market_cap: 78000000000, total_volume: 4200000000, circulating_supply: 393000000, high_24h: 205, low_24h: 195, image: '', market_cap_rank: 4 },
            { id: 'ripple', symbol: 'XRP', name: 'XRP', current_price: 2.39, price_change_percentage_24h: -2.07, market_cap: 67000000000, total_volume: 2100000000, circulating_supply: 28000000000, high_24h: 2.48, low_24h: 2.35, image: '', market_cap_rank: 5 },
            { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.48, price_change_percentage_24h: 4.35, market_cap: 17000000000, total_volume: 890000000, circulating_supply: 35000000000, high_24h: 0.51, low_24h: 0.45, image: '', market_cap_rank: 6 },
            { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', current_price: 0.15, price_change_percentage_24h: 6.67, market_cap: 22000000000, total_volume: 1200000000, circulating_supply: 146000000000, high_24h: 0.16, low_24h: 0.14, image: '', market_cap_rank: 7 },
            { id: 'avalanche', symbol: 'AVAX', name: 'Avalanche', current_price: 28.45, price_change_percentage_24h: -2.90, market_cap: 11000000000, total_volume: 450000000, circulating_supply: 387000000, high_24h: 29.8, low_24h: 27.5, image: '', market_cap_rank: 8 },
            { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', current_price: 14.23, price_change_percentage_24h: 3.26, market_cap: 8900000000, total_volume: 320000000, circulating_supply: 625000000, high_24h: 14.8, low_24h: 13.9, image: '', market_cap_rank: 9 },
            { id: 'polygon', symbol: 'MATIC', name: 'Polygon', current_price: 0.89, price_change_percentage_24h: -2.20, market_cap: 8200000000, total_volume: 280000000, circulating_supply: 9200000000, high_24h: 0.93, low_24h: 0.86, image: '', market_cap_rank: 10 }
          ]
          setCryptoData(fallbackData)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching market data:', error)
        setLoading(false)
      }
    }

    fetchMarketData()
    const interval = setInterval(fetchMarketData, 60000)
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

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    return `$${num.toFixed(2)}`
  }

  const filteredData = cryptoData.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-8 sm:py-12 border-b-4 border-crypto-gold">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-crypto-gold mb-4 font-mono tracking-wider" style={{
              textShadow: '3px 0 0 #ff0000, -3px 0 0 #0000ff, 0 3px 0 #ff0000, 0 -3px 0 #0000ff',
              filter: 'contrast(1.3)'
            }}>CRYPTO MARKETS</h1>
            <p className="text-lg sm:text-xl text-gray-300 font-mono tracking-wider">LIVE CRYPTOCURRENCY MARKET DATA POWERED BY COINGECKO</p>
          </div>

          {/* Enhanced Market Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-crypto-gold/30 hover:border-crypto-gold transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-crypto-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">MARKET CAP</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">
                  {marketStats.totalMarketCap >= 1e12 ? `$${(marketStats.totalMarketCap / 1e12).toFixed(2)}T` : `$${(marketStats.totalMarketCap / 1e9).toFixed(2)}B`}
                </p>
                <p className={`text-xs font-mono ${marketStats.marketCapChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketStats.marketCapChange >= 0 ? '+' : ''}{marketStats.marketCapChange.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-green-500/30 hover:border-green-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">24H VOLUME</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">
                  {marketStats.totalVolume >= 1e9 ? `$${(marketStats.totalVolume / 1e9).toFixed(2)}B` : `$${(marketStats.totalVolume / 1e6).toFixed(2)}M`}
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-blue-500/30 hover:border-blue-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">BTC DOM</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">{marketStats.bitcoinDominance.toFixed(1)}%</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-purple-500/30 hover:border-purple-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">GAINERS</p>
                <p className="text-xs sm:text-sm font-bold text-green-400 font-mono">+{marketStats.gainers}</p>
              </div>
            </div>


            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-orange-500/30 hover:border-orange-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">COINS</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">{marketStats.activeCryptocurrencies.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-pink-500/30 hover:border-pink-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">ETH DOM</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">{marketStats.ethereumDominance.toFixed(1)}%</p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border-2 border-yellow-500/30 hover:border-yellow-500 transition-colors">
              <div className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <p className="text-gray-400 text-xs font-mono mb-1">EXCHANGES</p>
                <p className="text-xs sm:text-sm font-bold text-white font-mono">875</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Market Overview Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Market Performance Summary */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 mb-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 text-center font-mono tracking-wider" style={{
              textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>MARKET PERFORMANCE SUMMARY</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-green-500/20">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {marketStats.gainers} GAINERS
                </div>
                <div className="text-sm text-gray-400 font-mono">
                  Coins in positive territory
                </div>
                <div className="text-xs text-green-400 font-mono mt-2">
                  {((marketStats.gainers / (marketStats.gainers + marketStats.losers)) * 100).toFixed(1)}% of market
                </div>
              </div>
              
              <div className="bg-gray-700/50 rounded-xl p-6 text-center border border-crypto-gold/20">
                <div className="w-16 h-16 bg-crypto-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-black" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {marketStats.activeCryptocurrencies.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400 font-mono">
                  Active cryptocurrencies
                </div>
                <div className="text-xs text-crypto-gold font-mono mt-2">
                  Global market coverage
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers Section */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 mb-8 border border-gray-700/50">
            <h3 className="text-xl font-bold text-white mb-6 font-mono tracking-wider text-center" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>TOP PERFORMERS</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {/* Top Gainers */}
              <div>
                <h4 className="text-lg font-bold text-green-400 mb-4 font-mono">TOP GAINERS (24H)</h4>
                <div className="space-y-3">
                  {cryptoData
                    .filter(coin => coin.price_change_percentage_24h > 0)
                    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                    .slice(0, 10)
                    .map((coin, index) => (
                      <div key={coin.id} className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-white text-sm">{coin.name}</div>
                            <div className="text-xs text-gray-400">{coin.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-400 text-sm">
                            +{coin.price_change_percentage_24h.toFixed(2)}%
                          </div>
                          <div className="text-xs text-gray-400">${coin.current_price.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Table */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-6 border-2 border-gray-700/50">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-gold mx-auto mb-4"></div>
              <p className="text-gray-400 font-mono">LOADING MARKET DATA...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-crypto-gold">
                    <th className="text-left py-4 px-4 text-crypto-gold font-mono tracking-wider">#</th>
                    <th className="text-left py-4 px-4 text-crypto-gold font-mono tracking-wider">COIN</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">PRICE</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">24H %</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">MARKET CAP</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">VOLUME (24H)</th>
                    <th className="text-right py-4 px-4 text-crypto-gold font-mono tracking-wider">SUPPLY</th>
                    <th className="text-center py-4 px-4 text-crypto-gold font-mono tracking-wider">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((crypto, index) => (
                    <tr 
                      key={crypto.id} 
                      className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-300 font-mono">{crypto.market_cap_rank || index + 1}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          {crypto.image && (
                            <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                          )}
                          <div>
                            <p className="text-white font-semibold font-mono">{crypto.name}</p>
                            <p className="text-gray-400 text-sm font-mono">{crypto.symbol.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-white font-mono">{formatPrice(crypto.current_price)}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={`flex items-center justify-end space-x-1 font-mono ${
                          crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>{Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-white font-mono">{formatNumber(crypto.market_cap)}</td>
                      <td className="py-4 px-4 text-right text-white font-mono">{formatNumber(crypto.total_volume)}</td>
                      <td className="py-4 px-4 text-right text-gray-300 font-mono">
                        {crypto.circulating_supply ? (crypto.circulating_supply / 1e6).toFixed(2) + 'M' : 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button className="text-crypto-gold hover:text-yellow-300 transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

