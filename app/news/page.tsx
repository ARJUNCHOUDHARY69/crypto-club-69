import Footer from '@/components/Footer'

export default function NewsPage() {
  return (
    <>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-5xl mx-auto">
            {/* News Categories */}
            <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700/50">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center font-mono tracking-wider" style={{
                textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                filter: 'contrast(1.2)'
              }}>NEWS CATEGORIES</h3>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {/* Category 1 - Bitcoin */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-orange-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-orange-500 text-sm sm:text-base">₿</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">BITCOIN</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Latest BTC news</p>
                    </div>
                  </div>
                </div>

                {/* Category 2 - Ethereum */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-blue-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-blue-500 text-sm sm:text-base">Ξ</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">ETHEREUM</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">ETH ecosystem</p>
                    </div>
                  </div>
                </div>

                {/* Category 3 - DeFi */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-green-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-green-500 text-sm sm:text-base">D</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">DEFI</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">DeFi news</p>
                    </div>
                  </div>
                </div>

                {/* Category 4 - NFTs */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-purple-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-purple-500 text-sm sm:text-base">N</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">NFTS</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Digital collectibles</p>
                    </div>
                  </div>
                </div>

                {/* Category 5 - Regulation */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-red-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-red-500 text-sm sm:text-base">R</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">REGULATION</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Legal news</p>
                    </div>
                  </div>
                </div>

                {/* Category 6 - Trading */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-yellow-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-yellow-500 text-sm sm:text-base">T</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">TRADING</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Market analysis</p>
                    </div>
                  </div>
                </div>

                {/* Category 7 - Technology */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-cyan-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-cyan-500 text-sm sm:text-base">T</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">TECHNOLOGY</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Blockchain tech</p>
                    </div>
                  </div>
                </div>

                {/* Category 8 - Altcoins */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-pink-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-pink-500 text-sm sm:text-base">A</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">ALTCOINS</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Alternative coins</p>
                    </div>
                  </div>
                </div>

                {/* Category 9 - Markets */}
                <div className="group bg-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 hover:bg-indigo-500 transition-all duration-300 cursor-pointer border border-gray-600/50 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="text-white font-bold group-hover:text-indigo-500 text-sm sm:text-base">M</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs sm:text-sm">MARKETS</h4>
                      <p className="text-gray-400 text-xs group-hover:text-white/80 hidden sm:block">Market trends</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
    </>
  )
}
