import { useState, useEffect } from 'react'
import type { Pin } from '@/types'

const STORAGE_KEY = 'location-tagger-pins'

export function usePins() {
  const [pins, setPins] = useState<Pin[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setPins(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to load pins:', error)
      }
    }
  }, [])

  const savePins = (newPins: Pin[]) => {
    setPins(newPins)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPins))
  }

  const addPin = (lat: number, lng: number) => {
    const newPin: Pin = {
      id: Date.now().toString(),
      lat,
      lng,
    }
    savePins([...pins, newPin])
  }

  const deletePin = (id: string) => {
    savePins(pins.filter(pin => pin.id !== id))
  }

  const updatePin = (id: string, lat: number, lng: number) => {
    savePins(pins.map(pin =>
      pin.id === id ? { ...pin, lat, lng } : pin
    ))
  }

  const exportToCSV = () => {
    const csv = 'latitude,longitude\n' +
      pins.map(pin => `${pin.lat},${pin.lng}`).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `pins-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    pins,
    addPin,
    deletePin,
    updatePin,
    exportToCSV,
  }
}
