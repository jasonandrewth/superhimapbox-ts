import { useState } from "react";

import { Map } from "mapbox-gl";

import MapMain from "./components/Map";
import StyleControls from "./components/StyleControls";
import SearchBox from "./components/SearchBox";
import PlacesPanel from "./components/PlacesPanel";

//types
import { IPlace } from "./schema/types";
import { ILatLong } from "./schema/types";

import "./App.css";
// import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [map, setMap] = useState<null | Map>(null);
  const [mapStyle, setMapStyle] = useState<string>(
    "mapbox://styles/mapbox/satellite-v9"
  );
  // eslint-disable-next-line
  const [latLong, setLatLong] = useState<ILatLong>({
    latitude: 40.7128,
    longitude: -74.006,
  });

  const [places, setPlaces] = useState<IPlace[]>([]);

  const mapStyleHandler = (url: string) => {
    // console.log(mapStyle);
    setMapStyle(url);
  };

  return (
    <div>
      <PlacesPanel places={places} map={map} setPlaces={setPlaces} />
      <SearchBox places={places} setPlaces={setPlaces} />
      <StyleControls mapStyle={mapStyle} setStyle={mapStyleHandler} />
      <MapMain map={map} setMap={setMap} latLong={latLong} style={mapStyle} />
    </div>
  );
}

export default App;
