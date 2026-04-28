import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, ShieldAlert, Navigation2 } from 'lucide-react';

// Fix for default marker icon in React-Leaflet
const markerIcon = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const markerShadow = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapView: React.FC = () => {
  const [zones, setZones] = useState<any[]>([]);
  const center: [number, number] = [27.525, 84.341]; // Near Chitwan National Park

  useEffect(() => {
    fetch('/api/wildlife/zones')
      .then(res => res.json())
      .then(data => setZones(data));
  }, []);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-serif italic text-3xl font-bold uppercase tracking-tight">Geospatial Intelligence</h2>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            Current Overlays: Risk Corridors, Active Patrols, IoT Sensors
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Critical Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest">Active Movement</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white border border-[#141414] overflow-hidden relative group">
        {/* @ts-ignore */}
        <MapContainer 
          center={center} 
          zoom={13} 
          style={{ height: '100%', width: '100%', filter: 'grayscale(0.5) contrast(1.1)' }}
        >
          {/* @ts-ignore */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {zones.map((zone, i) => (
            <React.Fragment key={i}>
              {/* @ts-ignore */}
              <Circle
                center={[zone.lat, zone.lng]}
                radius={zone.radius}
                pathOptions={{
                  fillColor: zone.level === 'high' ? '#dc2626' : zone.level === 'medium' ? '#f59e0b' : '#3b82f6',
                  color: zone.level === 'high' ? '#dc2626' : zone.level === 'medium' ? '#f59e0b' : '#3b82f6',
                  weight: 1,
                  fillOpacity: 0.1
                }}
              />
              <Marker position={[zone.lat, zone.lng]}>
                <Popup>
                  <div className="font-mono text-[10px] uppercase tracking-widest">
                    <strong className="block mb-1">{zone.label}</strong>
                    Risk: <span className={zone.level === 'high' ? 'text-red-600 font-bold' : ''}>{zone.level.toUpperCase()}</span>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>

        {/* HUD Elements */}
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          <div className="bg-white border border-[#141414] p-4 p-space-y-3 shadow-xl">
             <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest">Telemetry</span>
                <span className="font-mono text-xs font-bold uppercase tracking-tighter italic">27.525°N 84.341°E</span>
             </div>
             <div className="h-px bg-gray-100 my-3" />
             <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] text-gray-400 uppercase tracking-widest">Alt Range</span>
                <span className="font-mono text-xs font-bold uppercase tracking-tighter italic">142m - 186m</span>
             </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 z-[1000] ">
           <div className="bg-[#141414] text-white p-4 flex items-center gap-4">
              <Navigation2 className="w-5 h-5 text-[#60bb46] rotate-45" />
              <div>
                <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest leading-none">Last Patrol Sync</p>
                <p className="font-mono text-xs font-bold uppercase tracking-tighter">Alpha Unit - 09:42:00</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
