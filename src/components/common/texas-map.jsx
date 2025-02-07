import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

// Define Texas bounds (approximate)
const texasBounds = [
  [25.8371, -106.6456], // Southwest corner
  [36.5007, -93.5083], // Northeast corner
];

// Example marker position within Texas
const position = [31.9686, -99.9018]; // Central Texas coordinates

const TexasMap = () => {
  return (
    <MapContainer
      className="rounded-md shadow-lg"
      bounds={texasBounds}
      style={{ height: "500px", width: "800px" }}
      scrollWheelZoom={false}
      zoomControl={false} // Disable default zoom control to position it manually
    >
      {/* Tile layer for the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Add a marker with a popup */}
      <Marker position={position}>
        <Popup>
          84 Energy LLC Oil Wells and Leases <br /> Texas
        </Popup>
      </Marker>

      {/* Add zoom control */}
      <ZoomControl position="topright" />
    </MapContainer>
  );
};

export default TexasMap;
