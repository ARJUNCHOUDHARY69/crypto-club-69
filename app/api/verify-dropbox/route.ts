import { NextRequest, NextResponse } from 'next/server'
import { initializeDropboxCache, getCacheStatus } from '@/lib/dropbox-cache'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Vercel: Verifying Dropbox integration...')
    
    // Initialize Dropbox cache
    await initializeDropboxCache()
    
    // Get cache status
    const status = getCacheStatus()
    
    console.log('📊 Vercel: Cache status:', status)
    
    return NextResponse.json({
      success: true,
      message: 'Dropbox integration verified on Vercel',
      status: status,
      environment: {
        node_env: process.env.NODE_ENV,
        vercel: process.env.VERCEL,
        dropbox_token: !!process.env.DROPBOX_ACCESS_TOKEN
      }
    })
  } catch (error) {
    console.error('❌ Vercel: Dropbox verification failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Dropbox verification failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        node_env: process.env.NODE_ENV,
        vercel: process.env.VERCEL,
        dropbox_token: !!process.env.DROPBOX_ACCESS_TOKEN
      }
    }, { status: 500 })
  }
}
