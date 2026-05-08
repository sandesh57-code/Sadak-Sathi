import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Navigation, MapPin } from 'lucide-react';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Inner component: listens for map clicks and moves marker
const MapClickHandler = ({ lat, lng, onChange }) => {
  useMapEvents({
    click(e) {
      onChange(e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6));
    },
  });

  const hasPosition = lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
  return hasPosition ? <Marker position={[parseFloat(lat), parseFloat(lng)]} /> : null;
};

const LocationPicker = ({ lat, lng, onChange, error }) => {
  const [locating, setLocating] = React.useState(false);
  const [locError, setLocError] = React.useState('');

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    setLocError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange(pos.coords.latitude.toFixed(6), pos.coords.longitude.toFixed(6));
        setLocating(false);
      },
      () => {
        setLocError('Unable to retrieve your location. Please enter manually.');
        setLocating(false);
      }
    );
  };

  const hasPosition = lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng));
  const mapCenter   = hasPosition ? [parseFloat(lat), parseFloat(lng)] : [27.7172, 85.3240];

  return (
    <div className="space-y-4">
      {/* Lat / Lng inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g. 27.7172"
            value={lat}
            onChange={(e) => onChange(e.target.value, lng)}
            className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all ${
              error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'
            }`}
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            placeholder="e.g. 85.3240"
            value={lng}
            onChange={(e) => onChange(lat, e.target.value)}
            className={`w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all ${
              error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'
            }`}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}

      {/* Use current location button */}
      <button
        type="button"
        onClick={handleCurrentLocation}
        disabled={locating}
        className="flex items-center space-x-2 px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold text-sm rounded-2xl transition-all disabled:opacity-60"
      >
        <Navigation size={16} className={locating ? 'animate-spin' : ''} />
        <span>{locating ? 'Detecting location...' : 'Use Current Location'}</span>
      </button>

      {locError && <p className="text-orange-500 text-xs font-semibold">{locError}</p>}

      {/* Leaflet Mini Map */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md" style={{ height: 280 }}>
        <MapContainer
          key={`${mapCenter[0]}-${mapCenter[1]}`}
          center={mapCenter}
          zoom={hasPosition ? 15 : 12}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapClickHandler lat={lat} lng={lng} onChange={onChange} />
        </MapContainer>
      </div>
      <p className="text-[11px] text-slate-400 font-medium flex items-center space-x-1">
        <MapPin size={12} />
        <span>Click on the map to pin your exact location</span>
      </p>
    </div>
  );
};

export default LocationPicker;
