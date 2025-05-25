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
  const map = useMapEvents({
    click: (e) => {
      console.log('Map clicked at:', e.latlng);
      if (map) {
        const container = map.getContainer();
        container.style.cursor = 'crosshair';
        onMapClick(e);
      }
    },
    mouseover: () => {
      if (map) {
        const container = map.getContainer();
        container.style.cursor = 'crosshair';
      }
    },
    mouseout: () => {
      if (map) {
        const container = map.getContainer();
        container.style.cursor = 'grab';
      }
    },
    mousedown: () => {
      if (map) {
        const container = map.getContainer();
        container.style.cursor = 'grabbing';
      }
    },
    mouseup: () => {
      if (map) {
        const container = map.getContainer();
        container.style.cursor = 'crosshair';
      }
    }
  });
  return null;
};

const App: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [selectedColor] = useState(markerColors[Math.floor(Math.random() * markerColors.length)]);

  // Subscribe to real-time updates
  useEffect(() => {
    console.log('Setting up Firebase listener');
    const markersRef = ref(database, 'markers');
    
    const unsubscribe = onValue(markersRef, (snapshot) => {
      console.log('Received Firebase update:', snapshot.val());
      const data = snapshot.val();
      if (data) {
        const markersArray = Object.values(data) as MarkerData[];
        console.log('Setting markers:', markersArray);
        setMarkers(markersArray);
      } else {
        console.log('No markers in database, setting empty array');
        setMarkers([]);
      }
    }, (error) => {
      console.error('Firebase error:', error);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    console.log('Handling map click:', e.latlng);
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      position: [e.latlng.lat, e.latlng.lng],
      color: selectedColor,
    };

    console.log('Creating new marker:', newMarker);
    
    // Save to Firebase
    set(ref(database, `markers/${newMarker.id}`), newMarker)
      .then(() => {
        console.log('Marker saved successfully to Firebase');
      })
      .catch((error) => {
        console.error('Error saving marker to Firebase:', error);
      });
  };

  const handleDeleteMarker = (markerId: string) => {
    console.log('Deleting marker:', markerId);
    // Remove from Firebase
    remove(ref(database, `markers/${markerId}`))
      .then(() => {
        console.log('Marker deleted successfully from Firebase');
      })
      .catch((error) => {
        console.error('Error deleting marker from Firebase:', error);
      });
  };

  console.log('Current markers:', markers);

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
          style={{ height: '100vh', width: '100%', cursor: 'crosshair' }}
          doubleClickZoom={false}
          dragging={true}
          scrollWheelZoom={true}
        >
          <MapEvents onMapClick={handleMapClick} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers && markers.length > 0 && markers.map((marker) => {
            console.log('Rendering marker:', marker);
            return (
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
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default App; 