'use client'

import { useState } from 'react'
import { TrendingUp, AlertTriangle, Target, Globe, BarChart3, Shield, Zap, DollarSign, Users, Activity, ArrowRight, Star, Bitcoin, Lock, Network, Rocket } from 'lucide-react'

const futureOfCrypto = [
  {
    icon: Globe,
    title: "Global Financial Revolution",
    description: "Cryptocurrency is reshaping the global financial system, offering borderless transactions and financial inclusion for billions worldwide.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Zap,
    title: "Decentralized Finance (DeFi)",
    description: "DeFi protocols are creating a new financial ecosystem without traditional banks, offering lending, borrowing, and trading services.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Target,
    title: "Digital Asset Adoption",
    description: "Major corporations and institutions are adopting crypto as treasury reserves, signaling mainstream acceptance and long-term viability.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Users,
    title: "Web3 & Metaverse",
    description: "The next generation of the internet will be decentralized, with crypto powering virtual economies and digital ownership.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  }
]

const newsImportance = [
  {
    icon: TrendingUp,
    title: "Market Volatility Awareness",
    description: "Crypto markets are highly volatile and news can cause instant price swings of 10-50%. Staying informed helps you make better trading decisions and avoid sudden losses.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: AlertTriangle,
    title: "Regulatory Changes",
    description: "Government regulations can make or break crypto projects overnight. News about regulatory decisions can cause massive price movements and affect the entire market.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Target,
    title: "Investment Opportunities",
    description: "Early news about new projects, partnerships, or technological breakthroughs can reveal investment opportunities before they become mainstream and prices surge.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: BarChart3,
    title: "Technical Analysis Support",
    description: "News provides context for price movements. Understanding the 'why' behind market movements helps validate technical analysis and trading strategies.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Security breaches, exchange hacks, and project failures are common in crypto. News helps you identify risks early and protect your investments.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  },
  {
    icon: Globe,
    title: "Global Market Impact",
    description: "Crypto markets operate 24/7 globally. News from any timezone can affect prices worldwide. Understanding global events helps predict market movements.",
    gradient: "from-crypto-gold to-yellow-400",
    bgGradient: "from-gray-800 to-gray-900"
  }
]

export default function NewsGrid() {
  const [activeTab, setActiveTab] = useState<'future' | 'news'>('future')

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-crypto-gold/10 px-4 py-2 rounded-full mb-6">
          <Bitcoin className="w-5 h-5 text-crypto-gold" />
          <span className="text-crypto-gold font-semibold font-mono tracking-wider" style={{
            textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
            filter: 'contrast(1.1)'
          }}>CRYPTO CLUB 69</span>
        </div>
        <h2 className="text-5xl font-bold text-white mb-6 font-mono tracking-wider" style={{
          textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
          filter: 'contrast(1.1)'
        }}>
          THE FUTURE OF <span className="text-crypto-gold">CRYPTOCURRENCY</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-mono tracking-wider" style={{
          textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
          filter: 'contrast(1.1)'
        }}>
          UNDERSTANDING THE REVOLUTIONARY POTENTIAL OF BLOCKCHAIN TECHNOLOGY AND WHY STAYING INFORMED IS CRUCIAL FOR SUCCESS IN THE CRYPTO MARKET.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-2 flex border border-gray-700">
          <button
            onClick={() => setActiveTab('future')}
            className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'future'
                ? 'bg-crypto-gold text-black shadow-lg'
                : 'text-gray-400 hover:text-crypto-gold hover:bg-gray-800/50'
            }`}
          >
            <Rocket className="w-5 h-5" />
            <span className="font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>FUTURE OF CRYPTO</span>
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'news'
                ? 'bg-crypto-gold text-black shadow-lg'
                : 'text-gray-400 hover:text-crypto-gold hover:bg-gray-800/50'
            }`}
          >
            <Network className="w-5 h-5" />
            <span className="font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>WHY NEWS MATTERS</span>
          </button>
        </div>
      </div>

      {/* Future of Crypto Content */}
      {activeTab === 'future' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futureOfCrypto.map((item, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.bgGradient} border border-gray-700/50 group hover:border-crypto-gold/30 transition-all duration-500 animate-fadeInScale hover:shadow-lg hover:shadow-crypto-gold/20`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 animate-float`} style={{animationDelay: `${index * 0.2}s`}}>
                      <item.icon className="w-8 h-8 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-crypto-gold transition-colors font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>
                        {item.title.toUpperCase()}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>
                        {item.description.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Future Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-crypto-gold/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>$2.1T</h3>
              <p className="text-gray-400 text-lg font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>TOTAL MARKET CAP</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-crypto-gold/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>420M+</h3>
              <p className="text-gray-400 text-lg font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>GLOBAL USERS</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700 hover:border-crypto-gold/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>24/7</h3>
              <p className="text-gray-400 text-lg font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>MARKET ACTIVITY</p>
            </div>
          </div>
        </div>
      )}

      {/* News Importance Content */}
      {activeTab === 'news' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsImportance.map((item, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.bgGradient} border border-gray-700/50 group hover:border-crypto-gold/30 transition-all duration-500`}>
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-crypto-gold transition-colors font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>
                        {item.title.toUpperCase()}
                      </h3>
                      <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>
                        {item.description.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
