'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, Zap, Users, Globe } from 'lucide-react'

interface ActivityData {
  activeUsers: number
  transactions: number
  marketCap: number
  volume: number
}

export default function ActivityWidget() {
  const [activityData, setActivityData] = useState<ActivityData>({
    activeUsers: 0,
    transactions: 0,
    marketCap: 0,
    volume: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true)
        
        // Simulate real-time activity data
        const mockData = {
          activeUsers: Math.floor(Math.random() * 50000) + 100000,
          transactions: Math.floor(Math.random() * 1000000) + 5000000,
          marketCap: Math.floor(Math.random() * 500000000000) + 2000000000000,
          volume: Math.floor(Math.random() * 100000000000) + 50000000000
        }
        
        setActivityData(mockData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching activity data:', error)
        setLoading(false)
      }
    }

    fetchActivityData()
    
    // Update every 30 seconds
    const interval = setInterval(fetchActivityData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-xl"></div>
          <div className="h-6 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 hover:border-crypto-gold/30 transition-all duration-300 group">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-crypto-gold to-yellow-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Activity className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white font-mono tracking-wider" style={{
            textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
            filter: 'contrast(1.1)'
          }}>LIVE ACTIVITY</h3>
          <p className="text-sm text-gray-400">Real-time market pulse</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Active Users */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">Active Users</span>
          </div>
          <span className="text-white font-semibold">{formatNumber(activityData.activeUsers)}</span>
        </div>

        {/* Transactions */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">Transactions</span>
          </div>
          <span className="text-white font-semibold">{formatNumber(activityData.transactions)}</span>
        </div>

        {/* Market Cap */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">Market Cap</span>
          </div>
          <span className="text-white font-semibold">${formatNumber(activityData.marketCap)}</span>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-crypto-gold" />
            <span className="text-sm text-gray-300">24h Volume</span>
          </div>
          <span className="text-white font-semibold">${formatNumber(activityData.volume)}</span>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-400">Live • Updated {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}
