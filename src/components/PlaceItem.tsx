import React, { useState } from "react";

import { IPlace } from "../schema/types";
import mapbox, { Map, Marker, Popup } from "mapbox-gl";

//Style
import styles from "./placespanel.module.css";

const PlaceItem: React.FC<{
  place: IPlace;
  map: Map | undefined | null;
  deleteHandler: (idx: number) => void;
  idx: number;
}> = ({ place, map, deleteHandler, idx }) => {
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
      {place.name}, {place.latitude}, {place.longitude}
      <div
        className={styles.closer}
        onClick={(e) => {
          e.preventDefault();
          deleteHandler(idx);
        }}
      >
        X
      </div>
    </div>
  );
};

export default PlaceItem;
