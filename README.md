# Location Tagger

A mobile-first web app for tagging and saving locations using OpenStreetMap.

## Features

- 📍 Real-time location tracking with high accuracy (optimized for iOS)
- 🗺️ Interactive OpenStreetMap with auto-follow functionality
- 📌 Pin placement at current location with one tap
- 💾 Local data persistence using localStorage
- 📊 Export pins to CSV format
- ✏️ Edit and delete saved pins
- 📱 Mobile-responsive design

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- React Leaflet for maps
- Tailwind CSS for styling
- Lucide React for icons

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment to Vercel

1. Install Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Usage

1. **Grant location permissions**: Allow the app to access your device location for accurate tracking
2. **Place a pin**: Tap the blue floating button in the bottom-right to save your current location
3. **View pins**: Open settings (gear icon, top-right) to see all saved pins
4. **Edit pins**: Click "Edit" on any pin to modify coordinates
5. **Delete pins**: Click "Delete" to remove unwanted pins
6. **Export data**: Click "Export to CSV" to download all pins as a CSV file

## Location Accuracy

The app uses `enableHighAccuracy: true` for the Geolocation API, which:
- Requests the most accurate position available
- Uses GPS on mobile devices (including iOS)
- May take longer and consume more battery
- Provides accuracy information in meters

## Data Storage

All pins are stored locally in your browser's localStorage. Data persists between sessions but is device-specific. Export regularly to back up your data.

## CSV Format

Exported CSV files contain two columns:
```
latitude,longitude
37.774929,-122.419418
37.775432,-122.418912
```
