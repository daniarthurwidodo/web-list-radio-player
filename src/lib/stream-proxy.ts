export function getProxiedStreamUrl(originalUrl: string): string {
  // If the URL is already HTTPS, return as-is
  if (originalUrl.startsWith('https://')) {
    return originalUrl
  }

  // For HTTP URLs, use a CORS proxy service
  const proxies = [
    'https://cors-anywhere.herokuapp.com/',
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?'
  ]

  // Use the first available proxy
  return `${proxies[0]}${encodeURIComponent(originalUrl)}`
}

export function getStreamUrlWithFallbacks(originalUrl: string): string[] {
  const urls: string[] = []

  // Try original URL first (in case it works)
  urls.push(originalUrl)

  // If HTTP, add HTTPS version attempt
  if (originalUrl.startsWith('http://')) {
    urls.push(originalUrl.replace('http://', 'https://'))
  }

  // Add proxy versions
  if (originalUrl.startsWith('http://')) {
    const proxies = [
      'https://cors-anywhere.herokuapp.com/',
      'https://api.allorigins.win/raw?url=',
      'https://corsproxy.io/?'
    ]
    
    proxies.forEach(proxy => {
      urls.push(`${proxy}${encodeURIComponent(originalUrl)}`)
    })
  }

  return urls
}