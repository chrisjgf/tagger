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
      className="absolute z-[1000] bg-blue-500 text-white rounded-full shadow-2xl hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all active:scale-95"
      style={{
        bottom: 'calc(5rem + env(safe-area-inset-bottom))',
        right: '2.5rem',
        width: '96px',
        height: '96px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <MapPin className="w-8 h-8" />
    </button>
  )
}
