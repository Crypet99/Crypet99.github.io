import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix für fehlende Marker-Icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function HeadingArrow({ position, heading }) {
  const map = useMap();

  useEffect(() => {
    if (!heading || !position) return;

    // Erstelle ein einfaches SVG als Richtungspfeil
    const arrowIcon = L.divIcon({
      className: 'heading-arrow',
      html: `<svg width="40" height="40" style="transform: rotate(${heading}deg);">
        <polygon points="20,5 30,35 20,28 10,35" fill="red" />
      </svg>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    const arrowMarker = L.marker(position, { icon: arrowIcon, interactive: false }).addTo(map);

    return () => {
      map.removeLayer(arrowMarker);
    };
  }, [position, heading, map]);

  return null;
}

function MapCoordinates() {
  const defaultPosition = [48.2082, 16.3738]; // Wien als Fallback
  const [position, setPosition] = useState(defaultPosition);
  const [heading, setHeading] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          if (typeof pos.coords.heading === 'number' && !isNaN(pos.coords.heading)) {
            setHeading(pos.coords.heading);
          }
        },
        (err) => {
          console.error('Geolocation error:', err);
        }
      );
    }
  }, []);

  // DeviceOrientation für Heading (Kompass) auf mobilen Geräten
  useEffect(() => {
    function handleOrientation(event) {
      if (event.absolute && typeof event.alpha === 'number') {
        setHeading(event.alpha); // alpha ist die Kompassrichtung in Grad
      }
    }
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {position === defaultPosition ? 'Standardposition (Wien)' : 'Deine aktuelle Position'}
          {heading !== null && (
            <div>
              <br />
              Blickrichtung: {Math.round(heading)}°
            </div>
          )}
        </Popup>
      </Marker>
      {heading !== null && <HeadingArrow position={position} heading={heading} />}
    </MapContainer>
  );
}

export default MapCoordinates;
