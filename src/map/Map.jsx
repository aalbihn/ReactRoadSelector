import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Roads from './roads/Roads.jsx';
import './Map.css';
import 'leaflet-area-select';
import Toolbar from './maptools/Toolbar.jsx';

export default function Map () {

  const [mapStyle, setMapStyle] = useState('mapbox/dark-v10')  

  function mapToolFunctions(controlName, data) {
    switch(controlName) {
      case 'StyleControl' : setMapStyle(data);
        break;
      default:
        break;
    }
  }

  useEffect(() => {})

  return (
    <div className="mapGrid">
      <MapContainer className="Map"
        center={[57.495321, 12.076756]} 
        zoom={15} 
        scrollWheelZoom={true}>
        <TileLayer key={Math.floor(Math.random() * 999999)}
          attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
          url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
          id={mapStyle}
        /> 
        <Roads />
      </MapContainer>
      <Toolbar mapToolFunctions={mapToolFunctions}/>
    </div>
     
  )
}