export interface Pin {
  id: string
  lat: number
  lng: number
}

export interface GeolocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: string | null
  loading: boolean
}
