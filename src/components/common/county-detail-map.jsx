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

const CountyDetailMap = () => {
  return (
    <MapContainer
      className="rounded-md shadow-lg "
      bounds={texasBounds}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
      zoomControl={false}
    >
      {/* Tile layer for the map */}
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
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

export default CountyDetailMap;
