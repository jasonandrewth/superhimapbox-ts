import React from "react";

import { IPlace } from "../schema/types";
import { Map } from "mapbox-gl";

//Components
import PlaceItem from "./PlaceItem";

//Style
import styles from "./placespanel.module.css";

const PlacesPanel: React.FC<{ places: IPlace[]; map: Map | undefined | null }> =
  ({ places, map }) => {
    let placeItems: any = <div className={styles.noresult}>Nothing here</div>;

    if (places.length > 0) {
      placeItems = places.map((place, idx) => {
        return <PlaceItem key={idx} place={place} map={map} />;
      });
    }
    return <div className={styles.places}>{placeItems}</div>;
  };

export default PlacesPanel;
