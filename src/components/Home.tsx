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

// Images
import OFFICE_IMAGE from "../assets/images/office.png";
import FIRE_IMAGE from "../assets/images/fire.png";
import VOLCANO_IMAGE from "../assets/images/volcano.png";

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
`;

const WildFireImage = styled.img`
  width: 20px;
  height: 20px;
`;

interface HomePropsInterface {
  userLocation: GeolocationPosition | undefined;
}

interface WildFireData {
  id: string;
  link: string;
  date: string;
  coordinates: number[];
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

  const [wildFireData, setWildFireData] = useState<WildFireData[]>();
  const [showFireData, setShowFireData] = useState<boolean>(false);

  const [volcanoesData, setVolcanoesData] = useState<WildFireData[]>();
  const [showVolcanoesData, setShowVolcanoesData] = useState<boolean>(false);

  const mapWrapperDivRef = useRef<HTMLDivElement>(null);

  const fetchFireData = async () => {
    const response = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v2.1/events"
    ).then((res) => res.json());
    const wildFires: WildFireData[] = [];
    const volcanoes: WildFireData[] = [];

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
      }
    });
    setWildFireData(wildFires);
    setVolcanoesData(volcanoes);
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
      <DeckGL initialViewState={initialViewState} controller={true}>
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
                alt="fire"
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
