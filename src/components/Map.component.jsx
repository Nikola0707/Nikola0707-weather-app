import { MapContainer, TileLayer, Marker} from "react-leaflet";
import '../style/Map.style.css'

const Map = ({lat, long}) => {
  const position = [lat, long];
  return (
    <div id="mapid">
      <MapContainer center={position} zoom={10} scrollWheelZoom={true} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
