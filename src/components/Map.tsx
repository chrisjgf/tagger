import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import type { Pin } from '@/types'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

const UserLocationIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

interface MapUpdaterProps {
  center: [number, number] | null
}

function MapUpdater({ center }: MapUpdaterProps) {
  const map = useMap()

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom())
    }
  }, [center, map])

  return null
}

interface MapViewProps {
  userLocation: [number, number] | null
  pins: Pin[]
}

export function Map({ userLocation, pins }: MapViewProps) {
  const defaultCenter: [number, number] = [37.7749, -122.4194] // San Francisco

  return (
    <MapContainer
      center={userLocation || defaultCenter}
      zoom={16}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <>
          <Marker position={userLocation} icon={UserLocationIcon} />
          <MapUpdater center={userLocation} />
        </>
      )}

      {pins.map((pin) => (
        <Marker key={pin.id} position={[pin.lat, pin.lng]} />
      ))}
    </MapContainer>
  )
}
