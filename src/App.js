import { MapContainer } from 'react-leaflet';
import { Map } from './Map';

function App() {
  return (
    <div className="App">
      <MapContainer center={[45.505, 10.09]} zoom={5} scrollWheelZoom={true}>
        <Map />
      </MapContainer>
    </div>
  );
}

export default App;
