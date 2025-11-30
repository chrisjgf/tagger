import { MapPin } from 'lucide-react'

interface AddPinButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function AddPinButton({ onClick, disabled }: AddPinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="absolute right-6 z-[1000] bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom))'
      }}
    >
      <MapPin className="w-8 h-8" />
    </button>
  )
}
