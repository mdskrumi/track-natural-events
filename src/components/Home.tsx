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

// Images
import OFFICE_IMAGE from "../assets/images/office.png";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

interface HomePropsInterface {
  userLocation: GeolocationPosition | undefined;
}

const Home = (props: HomePropsInterface) => {
  const { userLocation } = props;
  const [initialViewState, setInitialViewState] = useState({
    longitude: 90,
    latitude: 23,
    zoom: 14,
  });
  const mapWrapperDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userLocation) {
      setInitialViewState({
        longitude: userLocation.coords.longitude,
        latitude: userLocation.coords.latitude,
        zoom: 14,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    gsap
      .timeline()
      .to(mapWrapperDivRef.current, { duration: 2 })
      .to(mapWrapperDivRef.current, { opacity: 1, duration: 4 });
  }, []);

  return (
    <MapWrapper ref={mapWrapperDivRef}>
      <Map
        {...initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2t6cHJpODZrNWs4eTJ1cHE2d2gyamo3bCJ9._wPMQlwgpNT5DdxvacyRLQ"
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
        <Marker longitude={90.4001656} latitude={23.781855} anchor="bottom">
          <img src={OFFICE_IMAGE} alt="office" />
        </Marker>
      </Map>
    </MapWrapper>
  );
};

export default Home;
