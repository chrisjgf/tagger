import { Settings, X, Download, Trash2, Edit2, MapPin } from 'lucide-react'
import { useState } from 'react'
import type { Pin } from '@/types'

interface SettingsPanelProps {
  pins: Pin[]
  onExport: () => void
  onDelete: (id: string) => void
  onEdit: (id: string, lat: number, lng: number, name?: string) => void
  locationEnabled: boolean
  locationError: string | null
  onEnableLocation: () => void
}

export function SettingsPanel({ pins, onExport, onDelete, onEdit, locationEnabled, locationError, onEnableLocation }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editLat, setEditLat] = useState('')
  const [editLng, setEditLng] = useState('')

  const handleEdit = (pin: Pin) => {
    setEditingId(pin.id)
    setEditName(pin.name || '')
    setEditLat(pin.lat.toString())
    setEditLng(pin.lng.toString())
  }

  const handleSaveEdit = () => {
    if (editingId) {
      const lat = parseFloat(editLat)
      const lng = parseFloat(editLng)
      if (!isNaN(lat) && !isNaN(lng)) {
        onEdit(editingId, lat, lng, editName.trim() || undefined)
        setEditingId(null)
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute right-4 z-[1000] bg-white rounded-full p-3 shadow-lg hover:bg-gray-50"
        style={{
          top: 'calc(1rem + env(safe-area-inset-top))'
        }}
      >
        <Settings className="w-6 h-6 text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute inset-0 z-[2000] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b space-y-3">
              {!locationEnabled && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 mb-2">
                    {locationError || 'Location access not enabled'}
                  </p>
                  <button
                    onClick={onEnableLocation}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    <MapPin className="w-5 h-5" />
                    Enable Location
                  </button>
                </div>
              )}
              {locationEnabled && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    ✓ Location tracking active
                  </p>
                </div>
              )}
              <button
                onClick={onExport}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Download className="w-5 h-5" />
                Export to CSV
              </button>
              <p className="text-sm text-gray-500">
                {pins.length} pin{pins.length !== 1 ? 's' : ''} saved
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="font-semibold mb-3">Saved Pins</h3>
              {pins.length === 0 ? (
                <p className="text-gray-500 text-sm">No pins yet. Start tagging locations!</p>
              ) : (
                <div className="space-y-2">
                  {pins.map((pin) => (
                    <div key={pin.id} className="border rounded-lg p-3">
                      {editingId === pin.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="Pin name (optional)"
                          />
                          <input
                            type="number"
                            step="any"
                            value={editLat}
                            onChange={(e) => setEditLat(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="Latitude"
                          />
                          <input
                            type="number"
                            step="any"
                            value={editLng}
                            onChange={(e) => setEditLng(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                            placeholder="Longitude"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="flex-1 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex-1 bg-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {pin.name && (
                            <div className="text-sm font-semibold mb-1">
                              {pin.name}
                            </div>
                          )}
                          <div className="text-sm font-mono mb-2 text-gray-600">
                            <div>{pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(pin)}
                              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(pin.id)}
                              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
