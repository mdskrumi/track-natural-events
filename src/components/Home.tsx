import Map from "react-map-gl";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0.1;
`;

const Home = () => {
  return (
    <MapWrapper>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2t6cHJpODZrNWs4eTJ1cHE2d2gyamo3bCJ9._wPMQlwgpNT5DdxvacyRLQ"
      />
    </MapWrapper>
  );
};

export default Home;
