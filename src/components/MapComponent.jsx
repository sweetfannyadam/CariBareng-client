import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ lat, lng }) => {
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
