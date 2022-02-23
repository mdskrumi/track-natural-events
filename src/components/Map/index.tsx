import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { LineLayer } from "@deck.gl/layers";

// View
import View from "./view";

// Interface
import {
  LineNaturalEventData,
  LineNaturalEventDataSingle,
  MapStyleInterface,
  pointNaturalEventData,
  DivideStyleInterface,
} from "./view";

interface MapPropsInterface {
  userLocation: GeolocationPosition | undefined;
  divideStyle: DivideStyleInterface | null;
}

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2t6cHJpODZrNWs4eTJ1cHE2d2gyamo3bCJ9._wPMQlwgpNT5DdxvacyRLQ";

const MAP_STYLES: MapStyleInterface[] = [
  { name: "streets", url: `mapbox://styles/mapbox/streets-v11` },
  { name: "satellite", url: `mapbox://styles/mapbox/satellite-v9` },
  { name: "light", url: `mapbox://styles/mapbox/light-v10` },
  { name: "dark", url: `mapbox://styles/mapbox/dark-v10` },
];

const Home = (props: MapPropsInterface) => {
  const { userLocation, divideStyle } = props;

  const [initialViewState, setInitialViewState] = useState({
    longitude: 90,
    latitude: 23,
    zoom: 3,
  });
  const [mapStyle, setMapStyle] = useState<string>(MAP_STYLES[0].url);
  const [wildFireData, setWildFireData] = useState<pointNaturalEventData[]>();
  const [showFireData, setShowFireData] = useState<boolean>(false);
  const [volcanoesData, setVolcanoesData] = useState<pointNaturalEventData[]>();
  const [showVolcanoesData, setShowVolcanoesData] = useState<boolean>(false);
  const [stormLayers, setStormLayers] = useState<any>();
  const [severeStormData, setSevereStormData] =
    useState<LineNaturalEventData>();
  const [showSevereStormData, setShowSevereStormData] =
    useState<boolean>(false);

  const mapWrapperDivRef = useRef<HTMLDivElement>(null);

  const fetchFireData = async () => {
    const response = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v2.1/events"
    ).then((res) => res.json());
    const wildFires: pointNaturalEventData[] = [];
    const volcanoes: pointNaturalEventData[] = [];

    response.events.forEach((evt: any) => {
      if (evt.categories[0].id === 8) {
        wildFires.push({
          id: evt.id,
          link: evt.sources[0].url,
          date: evt.geometries[0].date,
          coordinates: evt.geometries[0].coordinates,
        });
      } else if (evt.categories[0].id === 12) {
        volcanoes.push({
          id: evt.id,
          link: evt.sources[0].url,
          date: evt.geometries[0].date,
          coordinates: evt.geometries[0].coordinates,
        });
      } else if (evt.categories[0].id === 10) {
        const data: LineNaturalEventDataSingle[] = [];
        for (let i = 1; i < evt.geometries.length; i++) {
          const from = evt.geometries[i - 1].coordinates;
          const to = evt.geometries[i].coordinates;
          data.push({
            from,
            to,
          });
        }
        setSevereStormData({
          id: evt.id,
          geometries: data,
        });
      }
    });
    setWildFireData(wildFires);
    setVolcanoesData(volcanoes);
  };

  const handleShowSevereStorm = () => {
    if (!showSevereStormData && severeStormData) {
      const layer = new LineLayer({
        id: "line-layer",
        data: severeStormData.geometries,
        pickable: true,
        getColor: [128, 128, 128],
        getWidth: 10,
        getSourcePosition: (d: any) => d.from,
        getTargetPosition: (d: any) => d.to,
      });
      setStormLayers(layer);
      setShowSevereStormData(true);
      setInitialViewState({
        longitude: severeStormData.geometries[0].from[0],
        latitude: severeStormData.geometries[0].from[1],
        zoom: 5,
      });
    } else {
      setStormLayers(null);
      setShowSevereStormData(false);
    }
  };

  useEffect(() => {
    fetchFireData();
  }, []);

  useEffect(() => {
    gsap
      .timeline()
      .to(mapWrapperDivRef.current, { duration: 2 })
      .to(mapWrapperDivRef.current, { opacity: 1, duration: 4 });
  }, []);

  useEffect(() => {
    if (userLocation) {
      setInitialViewState({
        longitude: userLocation.coords.longitude,
        latitude: userLocation.coords.latitude,
        zoom: 3,
      });
    }
  }, [userLocation]);

  return (
    <View
      divideStyle={divideStyle}
      mapWrapperDivRef={mapWrapperDivRef}
      initialViewState={initialViewState}
      setInitialViewState={setInitialViewState}
      stormLayers={stormLayers}
      wildFireData={wildFireData}
      showFireData={showFireData}
      setShowFireData={setShowFireData}
      volcanoesData={volcanoesData}
      showVolcanoesData={showVolcanoesData}
      setShowVolcanoesData={setShowVolcanoesData}
      severeStormData={severeStormData}
      handleShowSevereStorm={handleShowSevereStorm}
      mapStyle={mapStyle}
      MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN}
      setMapStyle={setMapStyle}
      MAP_STYLES={MAP_STYLES}
    />
  );
};

export default Home;
