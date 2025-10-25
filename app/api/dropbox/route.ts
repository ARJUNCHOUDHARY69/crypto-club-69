import { NextRequest, NextResponse } from 'next/server'
import { getCachedFiles, getCachedFile, downloadDropboxFiles, getCacheStatus, initializeDropboxCache } from '@/lib/dropbox-cache'

// Initialize Dropbox cache on first API call (Vercel serverless)
let isInitialized = false

export async function GET(request: NextRequest) {
  try {
    // Initialize Dropbox cache on first API call (Vercel serverless)
    if (!isInitialized) {
      console.log('🔄 Vercel: Initializing Dropbox cache on first API call...')
      await initializeDropboxCache()
      isInitialized = true
      console.log('✅ Vercel: Dropbox cache initialized')
    }
    
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'status'
    const fileName = searchParams.get('file')
    
    switch (action) {
      case 'download':
        if (!fileName) {
          return NextResponse.json({ error: 'File name is required' }, { status: 400 })
        }
        
        const file = await getCachedFile(fileName)
        if (!file) {
          return NextResponse.json({ error: 'File not found' }, { status: 404 })
        }
        
        // Try to read from local file first
        try {
          const fs = require('fs')
          const path = require('path')
          const localPath = path.join(process.cwd(), 'cache', 'dropbox', 'files', fileName)
          
          if (fs.existsSync(localPath)) {
            const fileContent = fs.readFileSync(localPath)
            return new NextResponse(fileContent, {
              headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${file.name}"`,
                'Content-Length': file.size.toString(),
                'Cache-Control': 'public, max-age=3600'
              }
            })
          }
        } catch (error) {
          console.log('Reading from cache content instead of file')
        }
        
        // Fallback to cache content
        return new NextResponse(file.content as any, {
          headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${file.name}"`,
            'Content-Length': file.size.toString(),
            'Cache-Control': 'public, max-age=3600'
          }
        })
        
      case 'status':
        const status = getCacheStatus()
        return NextResponse.json({
          success: true,
          status
        })
        
      case 'refresh':
        console.log('🔄 Manual refresh triggered via API')
        await downloadDropboxFiles()
        const refreshedStatus = getCacheStatus()
        return NextResponse.json({
          success: true,
          message: 'Cache refreshed successfully',
          status: refreshedStatus
        })
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Service unavailable'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Dropbox cache on first API call (Vercel serverless)
    if (!isInitialized) {
      console.log('🔄 Vercel: Initializing Dropbox cache on first API call...')
      await initializeDropboxCache()
      isInitialized = true
      console.log('✅ Vercel: Dropbox cache initialized')
    }
    
    const body = await request.json()
    const { action } = body
    
    if (action === 'refresh') {
      await downloadDropboxFiles()
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Service unavailable'
    }, { status: 500 })
  }
}
