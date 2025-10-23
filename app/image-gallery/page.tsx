'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Download, Eye, RefreshCw } from 'lucide-react'
import Footer from '@/components/Footer'

interface LocalImage {
  id: number
  name: string
  url: string
  size: number
  uploaded: string
}

interface ApiResponse {
  success: boolean
  count: number
  images: LocalImage[]
  message: string
}

export default function ImageGalleryPage() {
  const [images, setImages] = useState<LocalImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<LocalImage | null>(null)
  const [displayedImages, setDisplayedImages] = useState<LocalImage[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [imagesPerPage, setImagesPerPage] = useState(100) // Show 100 images per page
  const [showAll, setShowAll] = useState(false)
  const [downloadMessage, setDownloadMessage] = useState('')
  const [apiStatus, setApiStatus] = useState<{
    status: 'loading' | 'success' | 'error' | 'empty'
    message: string
    responseTime?: number
    cached?: boolean
  }>({ status: 'loading', message: 'Loading...' })

  const fetchImages = async (refresh = false) => {
    try {
      setLoading(true)
      setApiStatus({ status: 'loading', message: 'Loading local images...' })
      
      console.log('🚀 Fetching local images...')
      const startTime = Date.now()
      
      const response = await fetch(`/api/images${refresh ? '?refresh=true' : ''}`)
      const responseTime = Date.now() - startTime
      
      if (response.ok) {
        const data: ApiResponse = await response.json()
        console.log('✅ API Response:', data)
        
        if (data.success && data.images && data.images.length > 0) {
          setImages(data.images)
          // Initialize pagination
          const startIndex = 0
          const endIndex = Math.min(imagesPerPage, data.images.length)
          setDisplayedImages(data.images.slice(startIndex, endIndex))
          setCurrentPage(1)
          setApiStatus({
            status: 'success',
            message: `Loaded ${data.count} local images`,
            responseTime: responseTime
          })
          console.log(`✅ Successfully loaded ${data.images.length} local images`)
        } else {
          setImages([])
          setApiStatus({
            status: 'empty',
            message: data.message || 'No local images found'
          })
          console.log('📁 No local images found')
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        setImages([])
        setApiStatus({
          status: 'error',
          message: errorData.message || 'Failed to load images'
        })
        console.error('❌ API Error:', errorData)
      }
    } catch (error) {
      console.error('❌ Fetch Error:', error)
      setImages([])
      setApiStatus({
        status: 'error',
        message: 'Network error loading images'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    fetchImages(true)
  }

  // Update displayed images when images change
  useEffect(() => {
    if (showAll) {
      setDisplayedImages(images)
    } else {
      const startIndex = (currentPage - 1) * imagesPerPage
      const endIndex = Math.min(startIndex + imagesPerPage, images.length)
      setDisplayedImages(images.slice(startIndex, endIndex))
    }
  }, [images, currentPage, imagesPerPage, showAll])

  // Pagination functions
  const totalPages = Math.ceil(images.length / imagesPerPage)
  
  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const openModal = (image: LocalImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const handleDownload = (image: LocalImage) => {
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement('a')
      link.href = image.url
      link.download = image.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Show success message
      setDownloadMessage(`Downloaded ${image.name}`)
      setTimeout(() => setDownloadMessage(''), 3000)
    } catch (error) {
      console.error('Download failed:', error)
      setDownloadMessage('Download failed')
      setTimeout(() => setDownloadMessage(''), 3000)
    }
  }

  const handleViewFull = (image: LocalImage) => {
    // Open image in new tab for full screen viewing
    window.open(image.url, '_blank')
  }

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage) {
        if (event.key === 'Escape') {
          closeModal()
        } else if (event.key === 'd' || event.key === 'D') {
          handleDownload(selectedImage)
        } else if (event.key === 'f' || event.key === 'F') {
          handleViewFull(selectedImage)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 font-mono">
              <span className="text-crypto-gold">GEMINI AI</span> IMAGE GALLERY
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 font-mono mb-4 sm:mb-6">
              AI-GENERATED CRYPTOCURRENCY VISUAL ASSETS
            </p>
            <p className="text-sm sm:text-base text-gray-400 font-mono mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
              POWERED BY GOOGLE GEMINI AI MODEL • HIGH-QUALITY CRYPTO VISUALS • PROFESSIONAL AI-GENERATED CONTENT
            </p>
            
            {/* Gemini AI Status */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 max-w-2xl mx-auto border border-crypto-gold/20">
              <div className="flex items-center justify-center gap-3 text-sm sm:text-base">
                <div className="w-3 h-3 bg-crypto-gold rounded-full animate-pulse"></div>
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-crypto-gold" />
                <span className="text-white font-semibold">
                  {apiStatus.status === 'success' ? `GEMINI AI GALLERY: ${images.length} AI-GENERATED IMAGES` : apiStatus.message}
                </span>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-400 font-mono">
                  GOOGLE GEMINI AI • AI-GENERATED • HIGH-QUALITY • PROFESSIONAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-gold mx-auto mb-4"></div>
            <p className="text-gray-400 font-mono">LOADING ALL IMAGES...</p>
          </div>
        ) : !displayedImages || displayedImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-white mb-4 font-mono">NO IMAGES FOUND</h3>
            <p className="text-gray-400 font-mono mb-6">
              {apiStatus?.message || 'No images found in the local gallery folder'}
            </p>
            <p className="text-gray-500 font-mono text-sm mb-8">
              Upload images to /public/images/gallery/ folder
            </p>
            <button
              onClick={handleRetry}
              className="bg-crypto-gold text-black px-6 py-3 rounded-lg font-mono font-bold hover:bg-yellow-400 transition-colors"
            >
              REFRESH
            </button>
          </div>
        ) : (
          <>
            {/* Gemini AI Features */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-6 sm:p-8 mb-8 border border-crypto-gold/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-crypto-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-crypto-gold rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">AI</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-mono">GEMINI AI</h3>
                  <p className="text-gray-400 text-sm font-mono">GOOGLE GEMINI AI POWERED</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🎨</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-mono">AI GENERATED</h3>
                  <p className="text-gray-400 text-sm font-mono">HIGH-QUALITY VISUALS</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-mono">PROFESSIONAL</h3>
                  <p className="text-gray-400 text-sm font-mono">CRYPTO THEMED</p>
                </div>
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-1 sm:gap-2 mb-6 sm:mb-8">
              {displayedImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => openModal(image)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs font-mono truncate">{image.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View Options */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-mono transition-colors text-sm sm:text-base ${
                  showAll 
                    ? 'bg-crypto-gold text-black' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {showAll ? 'SHOW PAGES' : 'VIEW ALL'}
              </button>
              
              {!showAll && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 font-mono text-sm">PER PAGE:</span>
                  <select
                    value={imagesPerPage}
                    onChange={(e) => setImagesPerPage(Number(e.target.value))}
                    className="bg-gray-800 text-white px-2 py-1 rounded font-mono text-xs sm:text-sm"
                  >
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                  </select>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {!showAll && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
                >
                  ← PREV
                </button>
                
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                  <span className="text-gray-300 font-mono text-sm">
                    PAGE {currentPage} OF {totalPages}
                  </span>
                  <span className="text-crypto-gold font-mono text-sm">
                    ({images.length} TOTAL)
                  </span>
                </div>
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg font-mono disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
                >
                  NEXT →
                </button>
              </div>
            )}

            {/* Page Numbers */}
            {!showAll && (
              <div className="flex justify-center gap-1 sm:gap-2 mb-6 sm:mb-8 flex-wrap">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, currentPage - 2) + i
                if (pageNum > totalPages) return null
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-2 sm:px-3 py-1 rounded font-mono text-xs sm:text-sm transition-colors ${
                      currentPage === pageNum
                        ? 'bg-crypto-gold text-black'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              </div>
            )}

            {/* Image Count */}
            <div className="text-center">
            <p className="text-gray-400 font-mono text-xs sm:text-sm">
              GEMINI AI GALLERY: DISPLAYING {displayedImages.length} OF {images.length} AI-GENERATED CRYPTO VISUALS
            </p>
            <p className="text-gray-500 font-mono text-xs mt-2">
              POWERED BY GOOGLE GEMINI AI • AI-GENERATED CONTENT • HIGH-QUALITY CRYPTO IMAGES
            </p>
            </div>
          </>
        )}
      </div>

      {/* Download Message */}
      {downloadMessage && (
        <div className="fixed top-4 right-4 z-50 bg-crypto-gold text-black px-4 py-2 rounded-lg font-mono font-bold shadow-lg">
          {downloadMessage}
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors text-xl font-bold"
              title="Close (ESC)"
            >
              ✕
            </button>
            <div className="relative">
              <Image
                src={selectedImage.url}
                alt={selectedImage.name}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain"
                unoptimized={true}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h3 className="text-white text-xl font-mono mb-2">{selectedImage.name}</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleDownload(selectedImage)}
                    className="bg-crypto-gold text-black px-4 py-2 rounded-lg font-mono font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2"
                    title="Download image (D key)"
                  >
                    <Download className="w-4 h-4" />
                    DOWNLOAD
                  </button>
                  <button 
                    onClick={() => handleViewFull(selectedImage)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-mono hover:bg-gray-500 transition-colors flex items-center gap-2"
                    title="View full screen (F key)"
                  >
                    <Eye className="w-4 h-4" />
                    VIEW FULL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}