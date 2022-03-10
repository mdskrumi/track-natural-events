import { useEffect, useState } from "react";
// import { FlyToInterpolator } from "@deck.gl/core";
import { LineLayer } from "@deck.gl/layers";

import { useAppSelector } from "../../redux/hooks";
import useMarker from "../../hooks/useMarker";
import useLineLayer from "../../hooks/useLine";

// View
import View from "./view";

// Interface
import { MapStyleInterface, DivideStyleInterface } from "./view";

interface MapPropsInterface {
  divideStyle: DivideStyleInterface;
  mapType: number;
}

const MAP_STYLES: MapStyleInterface[] = [
  { name: "streets", url: `mapbox://styles/mapbox/streets-v11` },
  { name: "satellite", url: `mapbox://styles/mapbox/satellite-v9` },
  { name: "light", url: `mapbox://styles/mapbox/light-v10` },
  { name: "dark", url: `mapbox://styles/mapbox/dark-v10` },
];

const SingleMap = (props: MapPropsInterface) => {
  const { divideStyle, mapType } = props;

  const [initialViewState, setInitialViewState] = useState<any>({
    longitude: 90,
    latitude: 23,
    zoom: 1,
  });
  const [mapStyle, setMapStyle] = useState<string>(
    MAP_STYLES[mapType] ? MAP_STYLES[mapType].url : MAP_STYLES[0].url
  );
  const [wildfireLayer, setWildfireLayer] = useState<any>();
  const [stormLayer, setStormLayer] = useState<any>();

  const { wildfires } = useAppSelector((state) => state.wildfire);
  const { storms } = useAppSelector((state) => state.storm);

  useEffect(() => {
    setWildfireLayer(useMarker(wildfires, [255, 110, 0]));
  }, [wildfires]);

  useEffect(() => {
    setStormLayer(useLineLayer(storms));
  }, [storms]);

  return (
    <View
      initialViewState={initialViewState}
      setInitialViewState={setInitialViewState}
      mapStyle={mapStyle}
      setMapStyle={setMapStyle}
      MAP_STYLES={MAP_STYLES}
      divideStyle={divideStyle}
      wildfireLayer={wildfireLayer}
      stormLayer={stormLayer}
    />
  );
};

export default SingleMap;
