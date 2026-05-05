import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const severityColors = {
  Critical: '#ef4444', // red
  High: '#f97316',     // orange
  Medium: '#eab308',   // yellow
  Low: '#22c55e'       // green
};

const MapView = ({ reports }) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const center = [28.3949, 84.1240]; // Nepal Center

  // Custom marker creator
  const createCustomIcon = (severity) => {
    return new L.DivIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${severityColors[severity]}; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  };

  return (
    <div className="h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 relative z-10">
      <MapContainer 
        center={center} 
        zoom={7} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={isDark 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' 
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        />
        
        {reports.map((report) => (
          <React.Fragment key={report.id}>
            <Marker 
              position={[report.lat, report.lng]} 
              icon={createCustomIcon(report.severity)}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400">{report.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white`} style={{ backgroundColor: severityColors[report.severity] }}>
                      {t(report.severity.toLowerCase())}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{report.district}</h3>
                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p><span className="font-semibold">{t('status')}:</span> {t(report.status.toLowerCase().replace(' ', ''))}</p>
                    <p><span className="font-semibold">{t('date')}:</span> {report.createdAt}</p>
                    <p><span className="font-semibold">{t('clusterId')}:</span> {report.clusterId}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Cluster visualization (simplified as circles for demo) */}
            <Circle 
              center={[report.lat, report.lng]}
              radius={2000}
              pathOptions={{ 
                fillColor: severityColors[report.severity], 
                color: severityColors[report.severity],
                fillOpacity: 0.1,
                weight: 1
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-[1000] space-y-2">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase">{t('severity')}</h4>
        {Object.entries(severityColors).map(([level, color]) => (
          <div key={level} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">{t(level.toLowerCase())}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapView;
