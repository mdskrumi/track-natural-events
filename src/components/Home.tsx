import { useState, useEffect, useRef } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  GeolocateEvent,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import styled from "styled-components";
import gsap from "gsap";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";

// Images
import OFFICE_IMAGE from "../assets/images/office.png";
import FIRE_IMAGE from "../assets/images/fire.png";
import VOLCANO_IMAGE from "../assets/images/volcano.png";
import STORM_IMAGE from "../assets/images/storm.png";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

const LocationLatLongDiv = styled.div`
  background-color: rgba(255, 255, 255, 0);
  color: black;
  position: absolute;
  top: 0;
  z-index: 1;
  margin: 5px 0px 0px 10px;
`;

const ButtonDiv = styled.div`
  background-color: rgba(255, 255, 255, 0);
  color: black;
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 1;
  margin: 5px 0px 0px 10px;
  cursor: pointer;
  text-align: right;
`;

const WildFireImage = styled.img`
  width: 20px;
  height: 20px;
`;

interface HomePropsInterface {
  userLocation: GeolocationPosition | undefined;
}

interface pointNaturalEventData {
  id: string;
  link: string;
  date: string;
  coordinates: number[];
}

interface LineNaturalEventData {
  id: string;
  geometries: LineNaturalEventDataSingle[];
}

interface LineNaturalEventDataSingle {
  from: number[];
  to: number[];
}

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2t6cHJpODZrNWs4eTJ1cHE2d2gyamo3bCJ9._wPMQlwgpNT5DdxvacyRLQ";

const Home = (props: HomePropsInterface) => {
  const { userLocation } = props;

  const [initialViewState, setInitialViewState] = useState({
    longitude: 90,
    latitude: 23,
    zoom: 3,
  });

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
    <MapWrapper ref={mapWrapperDivRef}>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[stormLayers]}
      >
        <LocationLatLongDiv>
          {`Latitude: ${initialViewState.latitude.toFixed(
            3
          )} Longitude: ${initialViewState.longitude.toFixed(
            3
          )} Zoom: ${initialViewState.zoom.toFixed(0)}`}
        </LocationLatLongDiv>

        <ButtonDiv>
          {wildFireData ? (
            <div onClick={() => setShowFireData(!showFireData)}>
              Show Wild Fire
              <WildFireImage
                src={FIRE_IMAGE}
                alt="fire"
                width="20"
                height="15"
              />
            </div>
          ) : null}

          {volcanoesData ? (
            <div onClick={() => setShowVolcanoesData(!showVolcanoesData)}>
              Show Volcanoes
              <WildFireImage
                src={VOLCANO_IMAGE}
                alt="Volcanoes"
                width="20"
                height="15"
              />
            </div>
          ) : null}

          {severeStormData ? (
            <div onClick={handleShowSevereStorm}>
              Show Severe Storm
              <WildFireImage
                src={STORM_IMAGE}
                alt="STORM"
                width="20"
                height="15"
              />
            </div>
          ) : null}
        </ButtonDiv>

        <Map
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          onMove={(evt) => setInitialViewState(evt.viewState)}
        >
          <FullscreenControl />
          <GeolocateControl
            trackUserLocation
            showUserHeading
            onTrackUserLocationStart={(evt: GeolocateEvent) => {
              console.log(evt);
            }}
          />
          <ScaleControl />
          <NavigationControl visualizePitch />

          {showFireData && wildFireData
            ? wildFireData.map((wf) => (
                <Marker
                  key={wf.id}
                  longitude={wf.coordinates[0]}
                  latitude={wf.coordinates[1]}
                  anchor="bottom"
                >
                  <img src={FIRE_IMAGE} alt="wild fire" />
                </Marker>
              ))
            : null}

          {showVolcanoesData && volcanoesData
            ? volcanoesData.map((wf) => (
                <Marker
                  key={wf.id}
                  longitude={wf.coordinates[0]}
                  latitude={wf.coordinates[1]}
                  anchor="bottom"
                >
                  <img src={VOLCANO_IMAGE} alt="volcano" />
                </Marker>
              ))
            : null}

          <Marker longitude={90.4001656} latitude={23.781855} anchor="bottom">
            <img src={OFFICE_IMAGE} alt="office" />
          </Marker>
        </Map>
      </DeckGL>
    </MapWrapper>
  );
};

export default Home;
