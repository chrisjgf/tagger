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
      className="absolute z-[1000] bg-blue-500 text-white rounded-full p-8 shadow-2xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all active:scale-95"
      style={{
        bottom: 'calc(5rem + env(safe-area-inset-bottom))',
        right: '2.5rem'
      }}
    >
      <MapPin className="w-8 h-8" />
    </button>
  )
}
