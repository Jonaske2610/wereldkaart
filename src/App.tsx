import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import { database } from './firebase';
import { ref, onValue, set, remove } from 'firebase/database';

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

interface MapEventsProps {
  onMapClick: (e: L.LeafletMouseEvent) => void;
}

const MapEvents: React.FC<MapEventsProps> = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });
  return null;
};

const App: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedColor] = useState(markerColors[Math.floor(Math.random() * markerColors.length)]);

  // Subscribe to real-time updates
  useEffect(() => {
    const markersRef = ref(database, 'markers');
    onValue(markersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMarkers(Object.values(data));
      } else {
        setMarkers([]);
      }
    });
  }, []);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      position: [e.latlng.lat, e.latlng.lng],
      color: selectedColor,
    };

    // Save to Firebase
    set(ref(database, `markers/${newMarker.id}`), newMarker);
  };

  const handleDeleteMarker = (markerId: string) => {
    // Remove from Firebase
    remove(ref(database, `markers/${markerId}`));
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
        >
          <MapEvents onMapClick={handleMapClick} />
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
                <div>
                  Je bent hier geweest!
                  <br />
                  <button 
                    onClick={() => handleDeleteMarker(marker.id)}
                    style={{ 
                      marginTop: '10px',
                      padding: '5px 10px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Verwijder pin
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default App; 