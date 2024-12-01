import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ setLat, setLng }) => {
  // State untuk latitude dan longitude
  const [lat, setLocalLat] = useState(-6.1751); // Default: Jakarta
  const [lng, setLocalLng] = useState(106.865);

  // Fungsi untuk mengubah state internal dan memanggil setLat, setLng dari props
  const handleLatChange = (e) => {
    const newLat = parseFloat(e.target.value);
    setLocalLat(newLat);
    setLat(newLat); // Mengupdate lat di komponen induk
  };

  const handleLngChange = (e) => {
    const newLng = parseFloat(e.target.value);
    setLocalLng(newLng);
    setLng(newLng); // Mengupdate lng di komponen induk
  };

  return (
    <div>
      {/* Peta */}
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        className="w-full h-[200px]"
      >
        {/* Lapisan Peta */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker */}
        <Marker position={[lat, lng]}>
          <Popup>
            Lokasi: {lat}, {lng}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
