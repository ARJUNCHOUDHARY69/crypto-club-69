import { Twitter, Linkedin, Mail, Phone, MapPin, MessageCircle, Square, Github } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo.png"
                  alt="CRYPTO CLUB 69 Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold font-mono tracking-wider" style={{
                  textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                  filter: 'contrast(1.1)'
                }}>CRYPTO CLUB 69</h3>
                <p className="text-sm text-gray-400 font-mono tracking-wider" style={{
                  textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                  filter: 'contrast(1.1)'
                }}>CRYPTO NEWS HUB</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>
              PROFESSIONAL CRYPTOCURRENCY INTELLIGENCE PLATFORM. AI-GENERATED VISUAL ASSETS BY GOOGLE GEMINI AI. 
              HIGH-QUALITY CONTENT • PROFESSIONAL DESIGN • CRYPTO CLUB 69.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="https://x.com/choudhary00070" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-all duration-300 flex flex-col items-center space-y-2 group relative" title="X (Twitter)">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-crypto-gold/20 transition-colors duration-300">
                  <Twitter className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{
                  textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                  filter: 'contrast(1.05)'
                }}>X (TWITTER)</span>
              </a>
              <a href="https://www.linkedin.com/in/arjunchoudhary69/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-all duration-300 flex flex-col items-center space-y-2 group relative" title="LinkedIn">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-crypto-gold/20 transition-colors duration-300">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{
                  textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                  filter: 'contrast(1.05)'
                }}>LINKEDIN</span>
              </a>
              <a href="https://t.me/CRYPTOCLUB69BINANCE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-all duration-300 flex flex-col items-center space-y-2 group relative" title="Telegram">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-crypto-gold/20 transition-colors duration-300">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center p-1">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                      alt="Telegram" 
                      className="w-4 h-4"
                    />
                  </div>
                </div>
                <span className="text-xs font-medium font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{
                  textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                  filter: 'contrast(1.05)'
                }}>TELEGRAM</span>
              </a>
              <a href="https://www.binance.com/en-IN/square/profile/cryptoclub69" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-all duration-300 flex flex-col items-center space-y-2 group relative" title="Binance Square">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-crypto-gold/20 transition-colors duration-300">
                  <img 
                    src="/Screenshot 2025-10-23 092443-removebg-preview.jpg" 
                    alt="Binance Square" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xs font-medium font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{
                  textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                  filter: 'contrast(1.05)'
                }}>BINANCE SQUARE</span>
              </a>
              <a href="https://github.com/ARJUNCHOUDHARY69" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-crypto-gold transition-all duration-300 flex flex-col items-center space-y-2 group relative" title="GitHub">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-crypto-gold/20 transition-colors duration-300">
                  <Github className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" style={{
                  textShadow: '0.5px 0 0 #ff0000, -0.5px 0 0 #0000ff',
                  filter: 'contrast(1.05)'
                }}>GITHUB</span>
              </a>
            </div>
          </div>


          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>NAVIGATION</h4>
            <ul className="space-y-2">
              <li><a href="/news" className="text-gray-400 hover:text-crypto-gold transition-colors font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>CRYPTO NEWS</a></li>
              <li><a href="/markets" className="text-gray-400 hover:text-crypto-gold transition-colors font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>LIVE MARKETS</a></li>
              <li><a href="/analysis" className="text-gray-400 hover:text-crypto-gold transition-colors font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>MARKET ANALYSIS</a></li>
              <li><a href="/article" className="text-gray-400 hover:text-crypto-gold transition-colors font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>CRYPTO ARTICLES</a></li>
              <li><a href="/image-gallery" className="text-gray-400 hover:text-crypto-gold transition-colors font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>AI IMAGE GALLERY</a></li>
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.1)'
            }}>CONTACT US</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-crypto-gold" />
                <a 
                  href="mailto:arjun.choudhary00070@gmail.com" 
                  className="text-gray-400 hover:text-crypto-gold transition-colors text-sm font-mono tracking-wider" 
                  style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}
                >
                  ARJUN.CHOUDHARY00070@GMAIL.COM
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-crypto-gold" />
                <a 
                  href="https://www.google.com/maps/place/Mumbai,+Maharashtra,+India" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-crypto-gold transition-colors text-sm font-mono tracking-wider" 
                  style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}
                >
                  MUMBAI, INDIA
                </a>
              </div>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center space-y-4">
            <div className="text-gray-400 text-sm font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.2)'
            }}>
              © 2025 CRYPTO CLUB 69. ALL RIGHTS RESERVED.
            </div>
            
                <div className="text-gray-400 text-sm font-mono tracking-wider" style={{
                  textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                  filter: 'contrast(1.2)'
                }}>
                  <a href="/privacy" className="hover:text-crypto-gold transition-colors">PRIVACY POLICY</a>
                  <span className="mx-2">•</span>
                  <a href="/terms" className="hover:text-crypto-gold transition-colors">TERMS OF SERVICE</a>
                  <span className="mx-2">•</span>
                  <a href="/cookies" className="hover:text-crypto-gold transition-colors">COOKIE SETTINGS</a>
                  <span className="mx-2">•</span>
                  <a href="/security" className="hover:text-crypto-gold transition-colors">SECURITY</a>
                </div>
            
            <div className="text-gray-400 text-sm font-mono tracking-wider" style={{
              textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
              filter: 'contrast(1.2)'
            }}>
              DO NOT SELL OR SHARE MY PERSONAL INFORMATION
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

