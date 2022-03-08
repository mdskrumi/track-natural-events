import { useState } from "react";

// View
import View from "./view";

// Interface
import { MapStyleInterface, DivideStyleInterface } from "./view";

interface MapPropsInterface {
  divideStyle: DivideStyleInterface | null;
  mapType: number;
}

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2wwZzhlbGkzMDM3dzNqcThjZDh2d2ludiJ9.5ho6NOAH8RLxxq2e36D0Vg";

const MAP_STYLES: MapStyleInterface[] = [
  { name: "streets", url: `mapbox://styles/mapbox/streets-v11` },
  { name: "satellite", url: `mapbox://styles/mapbox/satellite-v9` },
  { name: "light", url: `mapbox://styles/mapbox/light-v10` },
  { name: "dark", url: `mapbox://styles/mapbox/dark-v10` },
];

const SingleMap = (props: MapPropsInterface) => {
  const { divideStyle, mapType } = props;

  const [initialViewState, setInitialViewState] = useState({
    longitude: 90,
    latitude: 23,
    zoom: 3,
  });
  const [mapStyle, setMapStyle] = useState<string>(
    MAP_STYLES[mapType] ? MAP_STYLES[mapType].url : MAP_STYLES[0].url
  );

  return (
    <View
      initialViewState={initialViewState}
      setInitialViewState={setInitialViewState}
      mapStyle={mapStyle}
      setMapStyle={setMapStyle}
      MAP_STYLES={MAP_STYLES}
      divideStyle={divideStyle}
      MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN}
    />
  );
};

export default SingleMap;
