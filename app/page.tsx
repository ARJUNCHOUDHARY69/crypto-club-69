import Hero from '@/components/Hero'
import NewsGrid from '@/components/NewsGrid'
import TrendingSection from '@/components/TrendingSection'
import PriceChart from '@/components/PriceChart'
import MarketOverview from '@/components/MarketOverview'
import VolumeChart from '@/components/VolumeChart'
import ActivityWidget from '@/components/ActivityWidget'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
        <Hero />
        <div className="container mx-auto px-4 py-8">
          {/* Charts Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-crypto-gold/10 px-4 py-2 rounded-full mb-4">
                <span className="text-crypto-gold font-semibold font-mono tracking-wider" style={{
                  textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                  filter: 'contrast(1.1)'
                }}>📊 LIVE CHARTS</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                REAL-TIME <span className="text-crypto-gold">MARKET DATA</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Interactive charts and analytics to track cryptocurrency performance and market trends.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <PriceChart />
              <VolumeChart />
            </div>
            
            <div className="mb-8">
              <MarketOverview />
            </div>
            
            {/* Charts Footer Section */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2" style={{
                  textShadow: '0 0 5px #ff00ff, 0 0 10px #ff00ff',
                  filter: 'contrast(1.1)'
                }}>MARKET INSIGHTS</h3>
                <p className="text-gray-400">Stay informed with real-time crypto market data and analysis</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2" style={{
                    textShadow: '0 0 3px #ff00ff, 0 0 6px #ff00ff',
                    filter: 'contrast(1.05)'
                  }}>REAL-TIME DATA</h4>
                  <p className="text-gray-400 text-sm">Live cryptocurrency prices and market movements updated every second</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2" style={{
                    textShadow: '0 0 3px #ff00ff, 0 0 6px #ff00ff',
                    filter: 'contrast(1.05)'
                  }}>ADVANCED ANALYTICS</h4>
                  <p className="text-gray-400 text-sm">Comprehensive charts and technical analysis tools for informed trading</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2" style={{
                    textShadow: '0 0 3px #ff00ff, 0 0 6px #ff00ff',
                    filter: 'contrast(1.05)'
                  }}>FAST UPDATES</h4>
                  <p className="text-gray-400 text-sm">Lightning-fast data refresh and instant notifications for market changes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsGrid />
            </div>
            <div className="lg:col-span-1 space-y-8">
              <TrendingSection />
              <ActivityWidget />
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}
