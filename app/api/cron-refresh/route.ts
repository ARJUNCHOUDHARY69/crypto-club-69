import { NextRequest, NextResponse } from 'next/server'
import { initializeDropboxCache } from '@/lib/dropbox-cache'

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Cron: 2-minute refresh triggered')
    
    // Initialize/refresh Dropbox cache
    await initializeDropboxCache()
    
    console.log('✅ Cron: 2-minute refresh completed')
    
    return NextResponse.json({
      success: true,
      message: '2-minute refresh completed',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Cron: 2-minute refresh failed:', error)
    return NextResponse.json({
      success: false,
      error: '2-minute refresh failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
