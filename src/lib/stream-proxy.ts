export function getProxiedStreamUrl(originalUrl: string): string {
  // If the URL is already HTTPS, return as-is
  if (originalUrl.startsWith('https://')) {
    return originalUrl
  }

  // Use our server-side proxy for HTTP URLs
  return `/api/proxy?url=${encodeURIComponent(originalUrl)}`
}

export function getStreamUrlWithFallbacks(originalUrl: string): string[] {
  const urls: string[] = []

  // If HTTPS, try original first
  if (originalUrl.startsWith('https://')) {
    urls.push(originalUrl)
    return urls
  }

  // For HTTP URLs, use our server-side proxy first
  urls.push(`/api/proxy?url=${encodeURIComponent(originalUrl)}`)

  // Try HTTPS version as fallback
  if (originalUrl.startsWith('http://')) {
    const httpsUrl = originalUrl.replace('http://', 'https://')
    urls.push(httpsUrl)
  }

  // Add external CORS proxies as last resort
  const externalProxies = [
    'https://cors-anywhere.herokuapp.com/',
    'https://api.allorigins.win/raw?url='
  ]
  
  externalProxies.forEach(proxy => {
    urls.push(`${proxy}${encodeURIComponent(originalUrl)}`)
  })

  return urls
}