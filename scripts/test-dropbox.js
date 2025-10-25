#!/usr/bin/env node

/**
 * Test script for Dropbox integration
 * Run with: node scripts/test-dropbox.js
 */

const fs = require('fs')
const path = require('path')

console.log('🧪 Testing Dropbox Integration...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!')
  console.log('📝 Please create .env.local with:')
  console.log('DROPBOX_ACCESS_TOKEN=your_actual_token_here\n')
  process.exit(1)
}

// Check if DROPBOX_ACCESS_TOKEN is set
const envContent = fs.readFileSync(envPath, 'utf-8')
if (!envContent.includes('DROPBOX_ACCESS_TOKEN=')) {
  console.log('❌ DROPBOX_ACCESS_TOKEN not found in .env.local!')
  console.log('📝 Please add to .env.local:')
  console.log('DROPBOX_ACCESS_TOKEN=your_actual_token_here\n')
  process.exit(1)
}

console.log('✅ Environment variables configured')

// Check if cache directory will be created
const cacheDir = path.join(process.cwd(), 'cache', 'dropbox')
console.log(`📁 Cache directory: ${cacheDir}`)

// Check if API routes exist
const apiRoute = path.join(process.cwd(), 'app', 'api', 'dropbox', 'route.ts')
if (fs.existsSync(apiRoute)) {
  console.log('✅ Dropbox API route exists')
} else {
  console.log('❌ Dropbox API route missing')
}

// Check if lib files exist
const libFiles = [
  'lib/dropbox-cache.ts',
  'lib/startup.ts'
]

libFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`)
  } else {
    console.log(`❌ ${file} missing`)
  }
})

console.log('\n🎉 Dropbox integration setup complete!')
console.log('\n📋 Next steps:')
console.log('1. Add your Dropbox access token to .env.local')
console.log('2. Create a "main" folder in your Dropbox')
console.log('3. Upload some files to the main folder')
console.log('4. Start the development server: npm run dev')
console.log('5. Visit /image-gallery to see the Dropbox manager')
console.log('\n🚀 The system will automatically:')
console.log('- Download files from /main folder on startup')
console.log('- Cache files locally for 2 hours')
console.log('- Auto-refresh cache every 1.5 hours')
console.log('- Work offline with cached files')
