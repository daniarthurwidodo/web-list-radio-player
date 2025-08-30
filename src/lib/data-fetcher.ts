import { RadioStation } from '@/types/radio'

const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1D-bUxg4F7yM5S8KyfTUz0M6ho1e1qyhjoXu7MttzyK0/export?format=csv&gid=0'

export async function fetchRadioStations(): Promise<RadioStation[]> {
  try {
    const response = await fetch(SHEETS_CSV_URL)
    const csvText = await response.text()
    
    const lines = csvText.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').toLowerCase())
    
    const stations: RadioStation[] = []
    const seenStations = new Set<string>()
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.replace(/"/g, ''))
      
      if (values.length >= 3 && values[0] && values[1] && values[2]) {
        const stationKey = `${values[0]}-${values[1]}`
        
        if (!seenStations.has(stationKey)) {
          seenStations.add(stationKey)
          
          stations.push({
            id: `station-${i}`,
            name: values[0] || 'Unknown Station',
            frequency: values[1] || 'Unknown Frequency',
            link: values[2] || '',
            image: values[3] || undefined,
            genre: 'Radio',
            country: values[1]?.includes('Makassar') ? 'Indonesia' : 'Unknown'
          })
        }
      }
    }
    
    return stations
  } catch (error) {
    console.error('Error fetching radio stations:', error)
    return []
  }
}