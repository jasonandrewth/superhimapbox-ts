import { useEffect } from "react";

import mapbox, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import env from "react-dotenv";

//Types
import { ILatLong } from "../schema/types";

//Css
import styles from "./map.module.css";

const MapMain: React.FC<{
  map: null | Map;
  style: string;
  setMap: (arg0: Map) => void;
  latLong: ILatLong;
}> = ({ map, style, setMap, latLong }) => {
  mapbox.accessToken = env.MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    const mainmap = new mapbox.Map({
      container: "map",
      style: style,
      center: [latLong.longitude, latLong.latitude],
      zoom: 12,
    });

    const navigationControl = new mapbox.NavigationControl();
    map?.addControl(navigationControl);

    setMap(mainmap);
    // eslint-disable-next-line
  }, []);

  const mainmap = map;

  if (mainmap) {
    map?.setStyle(style);
  }

  return <div className={styles.map} id="map"></div>;
};

export default MapMain;
