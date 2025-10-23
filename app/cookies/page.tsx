import Footer from '@/components/Footer'

export default function CookieSettings() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 font-mono tracking-wider" style={{
                textShadow: '2px 0 0 #ff0000, -2px 0 0 #0000ff, 0 2px 0 #ff0000, 0 -2px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                COOKIE <span className="text-crypto-gold">SETTINGS</span>
              </h1>
              <p className="text-xl text-gray-400 font-mono tracking-wider" style={{
                textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                filter: 'contrast(1.1)'
              }}>
                MANAGE YOUR COOKIE PREFERENCES
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>WHAT ARE COOKIES?</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    COOKIES ARE SMALL TEXT FILES THAT ARE STORED ON YOUR DEVICE WHEN YOU VISIT OUR WEBSITE. THEY HELP US PROVIDE YOU WITH A BETTER EXPERIENCE BY REMEMBERING YOUR PREFERENCES AND ANALYZING HOW YOU USE OUR SITE.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>COOKIE TYPES</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-crypto-gold mb-2 font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>ESSENTIAL COOKIES</h3>
                      <p className="text-gray-300 font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>
                        THESE COOKIES ARE NECESSARY FOR THE WEBSITE TO FUNCTION PROPERLY. THEY CANNOT BE DISABLED.
                      </p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-crypto-gold mb-2 font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>ANALYTICS COOKIES</h3>
                      <p className="text-gray-300 font-mono tracking-wider" style={{
                        textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                        filter: 'contrast(1.1)'
                      }}>
                        THESE COOKIES HELP US UNDERSTAND HOW VISITORS INTERACT WITH OUR WEBSITE BY COLLECTING AND REPORTING INFORMATION ANONYMOUSLY.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>MANAGE YOUR PREFERENCES</h2>
                  <p className="text-gray-300 leading-relaxed font-mono tracking-wider" style={{
                    textShadow: '1px 0 0 #ff0000, -1px 0 0 #0000ff, 0 1px 0 #ff0000, 0 -1px 0 #0000ff',
                    filter: 'contrast(1.1)'
                  }}>
                    YOU CAN CONTROL AND/OR DELETE COOKIES AS YOU WISH. YOU CAN DELETE ALL COOKIES THAT ARE ALREADY ON YOUR COMPUTER AND YOU CAN SET MOST BROWSERS TO PREVENT THEM FROM BEING PLACED.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>

        <Footer />
    </>
  )
}
