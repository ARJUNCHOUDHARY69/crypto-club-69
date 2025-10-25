import { NextRequest, NextResponse } from 'next/server'
import { initializeDropboxCache, getCacheStatus } from '@/lib/dropbox-cache'

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 CRON: Dropbox cache refresh triggered by Vercel cron job (every 10 hours)')
    
    // Initialize/refresh Dropbox cache
    await initializeDropboxCache()
    
    const status = getCacheStatus()
    console.log('✅ CRON: Dropbox cache refresh completed. Files:', status.files_count)
    console.log('⏰ CRON: Cache expires in:', status.time_remaining, `(${Math.round(status.expires_in / 1000)} seconds)`)
    
    return NextResponse.json({
      success: true,
      message: 'Dropbox cache refreshed by Vercel cron job (every 10 hours)',
      timestamp: new Date().toISOString(),
      status
    })
  } catch (error) {
    console.error('❌ CRON: Dropbox cache refresh failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to refresh Dropbox cache via Vercel cron job',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
