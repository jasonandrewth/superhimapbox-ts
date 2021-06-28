//Css
import styles from "./toggler.module.css";

interface IStyle {
  name: string;
  url: string;
}

const StyleControls: React.FC<{
  mapStyle: string;
  setStyle: (arg0: string) => void;
}> = ({ mapStyle, setStyle }) => {
  const mapStyles: IStyle[] = [
    { name: "Satellite", url: "mapbox://styles/mapbox/satellite-v9" },
    { name: "Light", url: "mapbox://styles/mapbox/light-v10" },
    { name: "Night", url: "mapbox://styles/mapbox/navigation-night-v1" },
  ];

  const buttons = mapStyles.map((style, idx) => {
    let classNames = [styles.option];
    if (mapStyle === style.url) {
      classNames.push(styles.active);
      // console.log(classNames);
    }
    return (
      <button
        className={classNames.join(" ")}
        onClick={() => {
          setStyle(style.url);
        }}
        key={idx}
      >
        {style.name}
      </button>
    );
  });

  return <div className={styles.styleswitch}>{buttons}</div>;
};

export default StyleControls;
