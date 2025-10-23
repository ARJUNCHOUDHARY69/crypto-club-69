import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, validateEndpoint, getSecurityHeaders } from '../security'

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'
const API_KEY = process.env.COINGECKO_API_KEY

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 3600000 // 1 hour cache for speed

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CRYPTO-CLUB-69/1.0',
          ...(API_KEY && { 'x-cg-demo-api-key': API_KEY })
        }
      })
      
      if (response.ok) {
        return response
      }
      
      if (response.status === 429) {
        // Rate limited, wait and retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
        continue
      }
      
      throw new Error(`HTTP ${response.status}`)
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
  
  throw new Error('Max retries exceeded')
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(ip)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get('endpoint')
    const coin = searchParams.get('coin')
    const days = searchParams.get('days')
    const vs_currency = searchParams.get('vs_currency') || 'usd'
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter is required' },
        { status: 400 }
      )
    }
    
    // Validate endpoint to prevent abuse
    if (!validateEndpoint(endpoint)) {
      return NextResponse.json(
        { error: 'Invalid endpoint' },
        { status: 400 }
      )
    }
    
    // Create cache key
    const cacheKey = `${endpoint}-${coin || ''}-${days || ''}-${vs_currency}`
    const now = Date.now()
    
    // Check cache first
    const cached = cache.get(cacheKey)
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      console.log(`Cache hit for ${cacheKey}`)
      return NextResponse.json(cached.data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
          'X-Cache-Age': Math.floor((now - cached.timestamp) / 1000).toString(),
          ...getSecurityHeaders()
        }
      })
    }
    
    // Build URL based on endpoint
    let url = `${COINGECKO_API_BASE}/${endpoint}`
    const urlParams = new URLSearchParams()
    
    if (endpoint === 'simple/price') {
      urlParams.append('ids', coin || 'bitcoin')
      urlParams.append('vs_currencies', vs_currency)
    } else if (endpoint === 'coins/markets') {
      urlParams.append('vs_currency', vs_currency)
      urlParams.append('order', 'market_cap_desc')
      urlParams.append('per_page', '5')
      urlParams.append('page', '1')
      urlParams.append('sparkline', 'true')
    } else if (endpoint.includes('market_chart')) {
      urlParams.append('vs_currency', vs_currency)
      urlParams.append('days', days || '7')
      if (endpoint.includes('bitcoin') || endpoint.includes('ethereum')) {
        urlParams.append('interval', 'hourly')
      } else {
        urlParams.append('interval', 'daily')
      }
    }
    
    if (urlParams.toString()) {
      url += `?${urlParams.toString()}`
    }
    
    // Add API key if available
    if (API_KEY) {
      url += (url.includes('?') ? '&' : '?') + `x_cg_demo_api_key=${API_KEY}`
    }
    
    console.log(`Fetching from CoinGecko: ${url}`)
    
    const response = await fetchWithRetry(url)
    const data = await response.json()
    
    // Cache the response
    cache.set(cacheKey, { data, timestamp: now })
    
    // Add CDN caching headers for Vercel
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      'X-RateLimit-Limit': '50',
      'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      'X-Cache': 'MISS',
      'Cache-Control': 'public, max-age=7200, s-maxage=7200, stale-while-revalidate=3600',
      'CDN-Cache-Control': 'max-age=7200',
      'Vercel-CDN-Cache-Control': 'max-age=7200',
      ...getSecurityHeaders()
    })
    
    return NextResponse.json(data, { headers: responseHeaders })
    
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch cryptocurrency data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
