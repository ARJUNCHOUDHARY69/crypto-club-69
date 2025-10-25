import { initializeDropboxCache } from './dropbox-cache'

let isInitialized = false

export async function initializeApp() {
  if (isInitialized) {
    console.log('🔄 Background Dropbox service already initialized')
    return
  }

  console.log('🔄 Background Dropbox service starting...')
  console.log('🔍 DEBUG: Environment check - DROPBOX_ACCESS_TOKEN exists:', !!process.env.DROPBOX_ACCESS_TOKEN)
  
  try {
    // Initialize Dropbox cache system with full logging
    console.log('🔍 DEBUG: Calling initializeDropboxCache...')
    await initializeDropboxCache()
    console.log('🔍 DEBUG: initializeDropboxCache completed')
    
    // Set up periodic cache refresh (every 2 minutes) - with logging
    setInterval(async () => {
      console.log('🔄 DEBUG: Periodic cache refresh triggered (every 2 minutes)')
      try {
        await initializeDropboxCache()
        console.log('✅ DEBUG: Periodic cache refresh completed')
      } catch (error) {
        console.error('❌ DEBUG: Periodic cache refresh failed:', error)
      }
    }, 2 * 60 * 1000) // 2 minutes
    
    isInitialized = true
    console.log('✅ Background Dropbox service active')
  } catch (error) {
    console.error('❌ DEBUG: Dropbox service initialization failed:', error)
    console.error('❌ DEBUG: Error details:', JSON.stringify(error, null, 2))
  }
}

// Auto-initialize silently in background
if (typeof window === 'undefined') {
  // Only run on server side - silent background service
  initializeApp().catch(() => {
    // Silent error handling
  })
}
