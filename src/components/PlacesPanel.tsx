import React from "react";

import { IPlace } from "../schema/types";
import { Map } from "mapbox-gl";

//Components
import PlaceItem from "./PlaceItem";

//Style
import styles from "./placespanel.module.css";

const PlacesPanel: React.FC<{
  places: IPlace[];
  map: Map | undefined | null;
  setPlaces: (arg0: IPlace[]) => void;
}> = ({ places, map, setPlaces }) => {
  const deleteHandler = (idx: number) => {
    console.log(idx);
    const newPlaces = [...places];
    newPlaces.splice(idx, 1);
    setPlaces(newPlaces);
  };

  let placeItems: any = <div className={styles.noresult}>Nothing here</div>;

  if (places.length > 0) {
    placeItems = places.map((place, idx) => {
      return (
        <PlaceItem
          key={idx}
          place={place}
          map={map}
          deleteHandler={deleteHandler}
          idx={idx}
        />
      );
    });
  }

  return <div className={styles.places}>{placeItems}</div>;
};

export default PlacesPanel;
