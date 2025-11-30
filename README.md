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

### Installing as a Home Screen App (iOS)

For the best experience on iOS:

1. Open the app in **Safari** (not other browsers)
2. Tap the Share button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap "Add" to confirm
5. The app will now open in full-screen mode without Safari UI

### Using the App

1. **Enable location**: Open settings (gear icon, top-right) and tap "Enable Location"
2. **Grant permissions**: Allow the app to access your device location when prompted
3. **Place a pin**: Tap the large blue floating button in the bottom-right to save your current location
4. **View pins**: Open settings to see all saved pins
5. **Edit pins**: Click "Edit" on any pin to modify name and coordinates
6. **Delete pins**: Click "Delete" to remove unwanted pins
7. **Export data**: Click "Export to CSV" to download all pins as a CSV file

## Location Accuracy

The app uses `enableHighAccuracy: true` for the Geolocation API, which:
- Requests the most accurate position available
- Uses GPS on mobile devices (including iOS)
- May take longer and consume more battery
- Provides accuracy information in meters

### iOS Location Permissions

If location access is denied:

1. **Check Location Services**: Settings → Privacy & Security → Location Services (must be ON)
2. **Safari Permission**: Settings → Privacy & Security → Location Services → Safari Websites
   - Set to "Ask Next Time" or "While Using the App"
3. **Reset if needed**: Settings → Safari → Clear History and Website Data
4. **HTTPS Required**: The app must be accessed via HTTPS (Vercel provides this automatically)
5. **User Gesture**: On iOS Safari, location must be requested from a button click, not on page load

## Data Storage

All pins are stored locally in your browser's localStorage. Data persists between sessions but is device-specific. Export regularly to back up your data.

## CSV Format

Exported CSV files contain three columns:
```
name,latitude,longitude
Coffee Shop,37.774929,-122.419418
Park,37.775432,-122.418912
,37.776012,-122.419823
```

The name column is optional and will be empty if no name was assigned to the pin.
