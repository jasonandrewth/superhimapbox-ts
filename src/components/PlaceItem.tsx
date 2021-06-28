import React from "react";

import { IPlace } from "../schema/types";
import mapbox, { Map, Marker, Popup } from "mapbox-gl";

//Style
import styles from "./placespanel.module.css";

const PlaceItem: React.FC<{ place: IPlace; map: Map | undefined | null }> = ({
  place,
  map,
}) => {
  if (map) {
    const popup: Popup = new mapbox.Popup({
      closeButton: false,
    });

    popup.setHTML(place.name);

    const marker: Marker = new mapbox.Marker({
      color: "#2727e6",
    });

    marker.setLngLat([place.longitude, place.latitude]);
    marker.setPopup(popup);

    marker.addTo(map);
  }

  const goTo = () => {
    map?.flyTo({
      center: [place.longitude, place.latitude],
      zoom: 10,
    });
  };

  return (
    <div className={styles.placeitem} onClick={() => goTo()}>
      {place.name} {place.latitude} {place.longitude}
    </div>
  );
};

export default PlaceItem;
