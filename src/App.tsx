import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Define 15 distinct colors for markers
const markerColors = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
  '#008000', // Dark Green
  '#000080', // Navy
  '#FFC0CB', // Pink
  '#8B4513', // Saddle Brown
  '#FFD700', // Gold
  '#4B0082', // Indigo
  '#40E0D0', // Turquoise
];

interface MarkerData {
  id: string;
  position: [number, number];
  color: string;
}

function App() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedColor] = useState(markerColors[Math.floor(Math.random() * markerColors.length)]);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      position: [e.latlng.lat, e.latlng.lng],
      color: selectedColor,
    };

    setMarkers([...markers, newMarker]);
  };

  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: 'custom-pin',
      html: `<svg width="20" height="20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="${color}" stroke="black" stroke-width="3"/>
      </svg>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="app">
      <div className="map-container">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100vh', width: '100%' }}
          onClick={handleMapClick}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={createCustomIcon(marker.color)}
            >
              <Popup>
                Je bent hier geweest!
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App; 