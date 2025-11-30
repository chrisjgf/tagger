import { Map } from '@/components/Map'
import { AddPinButton } from '@/components/AddPinButton'
import { SettingsPanel } from '@/components/SettingsPanel'
import { useGeolocation } from '@/hooks/useGeolocation'
import { usePins } from '@/hooks/usePins'

function App() {
  const { latitude, longitude, error, loading, startTracking } = useGeolocation()
  const { pins, addPin, deletePin, updatePin, exportToCSV } = usePins()

  const userLocation = latitude !== null && longitude !== null
    ? [latitude, longitude] as [number, number]
    : null

  const locationEnabled = userLocation !== null

  const handleAddPin = () => {
    if (userLocation) {
      addPin(userLocation[0], userLocation[1])
    }
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute top-0 left-0 right-0 z-[1000] bg-blue-500 text-white p-2 text-center text-sm">
          Getting your location...
        </div>
      )}

      <Map userLocation={userLocation} pins={pins} />

      <AddPinButton
        onClick={handleAddPin}
        disabled={!userLocation}
      />

      <SettingsPanel
        pins={pins}
        onExport={exportToCSV}
        onDelete={deletePin}
        onEdit={updatePin}
        locationEnabled={locationEnabled}
        locationError={error}
        onEnableLocation={startTracking}
      />
    </div>
  )
}

export default App
