import { useEffect, useState } from "react";
// import { FlyToInterpolator } from "@deck.gl/core";
import { IconLayer } from "@deck.gl/layers";

import { useAppSelector } from "../../redux/hooks";

// View
import View from "./view";

// Interface
import { MapStyleInterface, DivideStyleInterface } from "./view";

import FIRE_IMAGE from "../../assets/images/fire.png";

interface MapPropsInterface {
  divideStyle: DivideStyleInterface;
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

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

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

  const { wildfires } = useAppSelector((state) => state.wildfire);

  useEffect(() => {
    setWildfireLayer(
      new IconLayer({
        id: "icon-layer",
        data: wildfires,
        pickable: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
        iconAtlas:
          "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
        iconMapping: ICON_MAPPING,
        getIcon: () => "marker",
        sizeScale: 15,
        getPosition: (d: any) => [
          d.coordinate.longitude,
          d.coordinate.latitude,
        ],
        getSize: () => 3,
        getColor: () => [255, 100, 100],
      })
    );
  }, [wildfires]);

  return (
    <View
      initialViewState={initialViewState}
      setInitialViewState={setInitialViewState}
      mapStyle={mapStyle}
      setMapStyle={setMapStyle}
      MAP_STYLES={MAP_STYLES}
      divideStyle={divideStyle}
      MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN}
      wildfireLayer={wildfireLayer}
    />
  );
};

export default SingleMap;
