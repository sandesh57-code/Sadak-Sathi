import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { reports } from '../data/reports';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPreview = () => {
  // Take only the first 5 reports for the preview
  const previewReports = reports.slice(0, 5);
  const center = [27.7172, 85.3240]; // Kathmandu

  return (
    <div className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">
              Live Issue Tracking Map
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-8 leading-relaxed">
              Explore real-time reports across Nepal. Our AI analyzes each submission to provide precise geolocation and severity metrics.
            </p>
            
            <div className="space-y-6">
              {['Real-time GPS Tracking', 'Severity Color Coding', 'Recent Activity Feed'].map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 px-8 rounded-2xl transition-all">
              Explore Global Map
            </button>
          </div>
          
          <div className="flex-[1.5] w-full h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-slate-50 dark:border-slate-900">
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {previewReports.map((report) => (
                <Marker key={report.id} position={[report.lat, report.lng]}>
                  <Popup>
                    <div className="p-1">
                      <p className="font-bold text-blue-600">{report.id}</p>
                      <p className="text-xs font-medium">{report.district}</p>
                      <p className="text-[10px] mt-1 bg-slate-100 px-2 py-0.5 rounded-full inline-block">{report.severity}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPreview;
