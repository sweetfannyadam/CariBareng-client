import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button"; // Import jika Anda menggunakan Button komponen dari UI Anda

// Atur ikon default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const InteractiveMap = ({ location, setLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(location);

  // Event handler untuk klik pada peta
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]); // Set marker di lokasi yang diklik
        setLocation([lat, lng]); // Update lokasi yang dipilih ke parent
      },
    });
    return null;
  };

  // Fungsi untuk mendapatkan lokasi pengguna saat ini
  const trackUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition([latitude, longitude]);
          setLocation([latitude, longitude]);
        },
        (error) => {
          alert("Gagal mendapatkan lokasi Anda: " + error.message);
        }
      );
    } else {
      alert("Geolocation tidak didukung di browser ini.");
    }
  };

  // Hook untuk memperbarui center dan zoom peta
  const MapCenterAndZoom = () => {
    const map = useMap();
    useEffect(() => {
      if (markerPosition) {
        // Pindahkan peta ke marker baru dengan zoom level yang lebih tinggi
        map.setView(markerPosition, 15); // Zoom level 15 untuk lebih dekat ke lokasi
      }
    }, [markerPosition, map]);

    return null;
  };

  return (
    <div>
      <MapContainer
        center={location || [0, 0]} // Default ke [0, 0] jika lokasi belum tersedia
        zoom={2} // Zoom awal
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>Lokasi dipilih: {markerPosition.join(", ")}</Popup>
          </Marker>
        )}
        <MapEvents />
        <MapCenterAndZoom />
      </MapContainer>
      <Button onClick={trackUserLocation} className="mt-3 w-full">
        Track My Location
      </Button>
    </div>
  );
};

export default InteractiveMap;
