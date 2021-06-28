import { ChangeEvent, useEffect } from "react";

import { useForm } from "react-hook-form";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

//types
import { IPlace } from "../schema/types";

import env from "react-dotenv";

interface ISearchboxProps {
  onSelectAdress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  defaultValue: string;
}

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
}

interface IProps {}

const libraries: Libraries = ["places"];

const SearchForm: React.FC<{
  places: IPlace[];
  setPlaces: (arg0: IPlace[]) => void;
}> = ({ places, setPlaces }) => {
  const { handleSubmit, setValue } = useForm<IFormData>({
    defaultValues: {},
  });
  // const address = watch("address");

  const onSelectAdress = (address: string, latitude: any, longitude: any) => {
    setValue("address", address);
    setValue("latitude", latitude);
    setValue("longitude", longitude);
  };

  const onSubmit = (data: IFormData) => {
    // console.log(data);
    const placesCopy = [...places];
    placesCopy.push({
      name: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    setPlaces(placesCopy);
  };

  return (
    <form
      style={{
        margin: "auto",
        maxWidth: "36rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        position: "fixed",
        top: "20px",
        left: "20px",
        outline: "none",
        zIndex: 5,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for Adress
        </label>
        <SearchBox onSelectAdress={onSelectAdress} defaultValue="" />
        {/* {errors.address && <p>{errors.address.message}</p>} */}
      </div>
    </form>
  );
};

export default SearchForm;

export function SearchBox({ onSelectAdress, defaultValue }: ISearchboxProps) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: env.FIREBASE_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <span>Error Loading Google Places</span>;

  return (
    <ReadySearchBox
      onSelectAdress={onSelectAdress}
      defaultValue={defaultValue}
    />
  );
}

export function ReadySearchBox({
  onSelectAdress,
  defaultValue,
}: ISearchboxProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    defaultValue,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      // console.log(results[0]);
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAdress(address, lat, lng);
    } catch (error) {
      console.error("aaa Error " + error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      onSelectAdress("", null, null);
    }
  };

  // console.log({ status, data });

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        id="search"
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="search a location"
        style={{
          zIndex: 5,
          width: "100%",
          marginTop: "1rem",
          padding: "0.5rem",
          borderWidth: "2px",
          borderColor: "#000",
          outline: "none",
        }}
        autoComplete="off"
      ></ComboboxInput>
      <ComboboxPopover
        style={{
          zIndex: 5,
        }}
      >
        <ComboboxList>
          {data.map((entry, idx) => {
            return <ComboboxOption key={idx} value={entry.description} />;
          })}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
