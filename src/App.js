import './App.css';
import * as React from 'react';
import 'leaflet/dist/leaflet.css';
import Map from './map/Map.jsx';
import SelectedRoad from './selectedroads/SelectedRoad';
import Title from './title/Title'

export default function App() {

  return (
    <div className="App">
      <Title />
      <Map ></Map>
      <SelectedRoad />
    </div>
  )
  
}


