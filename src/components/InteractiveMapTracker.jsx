import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button"; // Sesuaikan dengan komponen button Anda

// Atur ikon default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Utility untuk memvalidasi posisi marker
const isValidPosition = (position) =>
  typeof position === "object" &&
  position !== null &&
  typeof position.lat === "number" &&
  typeof position.lng === "number";

const InteractiveMap = ({ location, setLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(location || { lat: 0, lng: 0 }); // Default ke { lat: 0, lng: 0 }

  // Event handler untuk klik pada peta
  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const newLocation = { lat, lng };
        setMarkerPosition(newLocation); // Set marker di lokasi yang diklik
        setLocation(newLocation); // Update lokasi yang dipilih ke parent
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
          const newLocation = { lat: latitude, lng: longitude };
          setMarkerPosition(newLocation);
          setLocation(newLocation);
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
      if (isValidPosition(markerPosition)) {
        map.setView([markerPosition.lat, markerPosition.lng], 15); // Pindahkan peta ke marker baru dengan zoom level 15
      }
    }, [markerPosition, map]);

    return null;
  };

  return (
    <div>
      <MapContainer
        center={isValidPosition(markerPosition) ? [markerPosition.lat, markerPosition.lng] : [0, 0]} // Default ke [0, 0] jika markerPosition tidak valid
        zoom={isValidPosition(markerPosition) ? 15 : 2} // Zoom default
        style={{ height: "300px", width: "100%" }} // Ukuran peta
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {isValidPosition(markerPosition) && (
          <Marker position={[markerPosition.lat, markerPosition.lng]}>
            <Popup>
              Lokasi dipilih: {markerPosition.lat.toFixed(4)}, {markerPosition.lng.toFixed(4)}
            </Popup>
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
