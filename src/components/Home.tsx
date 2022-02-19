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

const LocationLatLongDiv = styled.div`
  background-color: rgba(255, 255, 255, 0);
  position: absolute;
  top: 0;
  z-index: 1;
  margin: 5px 0px 0px 10px;
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
      <LocationLatLongDiv>
        {`Latitude: ${initialViewState.latitude.toFixed(
          3
        )} Longitude: ${initialViewState.longitude.toFixed(
          3
        )} Zoom: ${initialViewState.zoom.toFixed(0)}`}
      </LocationLatLongDiv>
      <Map
        {...initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
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
