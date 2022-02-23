import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

// Components
import Map from "./components/Map";

// CSS
import "./App.css";

const AppWrapper = styled.div`
  color: #ffffff;
  font-family: "Akaya Telivigala", cursive;
  font-family: "Bebas Neue", cursive;
  font-family: "Oswald", sans-serif;
  min-height: 100vh;
`;

const InitialGreeting = styled.div`
  z-index: 1;
  font-size: 64px;
  position: fixed;
  top: 30%;
  left: 10%;
  @media (max-width: 768px) {
    font-size: 48px;
  }
  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const MapNumberButtonDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  display: flex;
`;

const ChooseMapDiv = styled.div`
  cursor: default;
`;

const MapNumberButton = styled.div`
  padding: 10px;
  font-size: 48px;
  cursor: pointer;
  &:hover {
    color: red;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const App = () => {
  const initialGreetingRef = useRef<HTMLDivElement>(null);
  const chooseMapRef = useRef<HTMLDivElement>(null);
  const fourMapRef = useRef<HTMLDivElement>(null);
  const oneMapRef = useRef<HTMLDivElement>(null);

  const [mapNumber, setMapNumber] = useState<number>(0);
  const [userLocation, setUserLocation] = useState<GeolocationPosition>();

  const handleOnMapSelect = (num: number) => {
    setMapNumber(num);
    gsap
      .timeline()
      .to(initialGreetingRef.current, { opacity: 0, duration: 2 })
      .to(initialGreetingRef.current, { zIndex: -1 });
  };

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setUserLocation(position);
    });
  }, []);

  useEffect(() => {
    gsap.timeline().from(initialGreetingRef.current, {
      y: -window.screen.availHeight,
      duration: 2,
    });

    gsap.timeline().from(chooseMapRef.current, {
      x: -window.screen.availWidth,
      duration: 2,
    });

    gsap.timeline().from(fourMapRef.current, {
      y: -window.screen.availHeight,
      duration: 2,
    });

    gsap.timeline().from(oneMapRef.current, {
      x: window.screen.availWidth,
      duration: 2,
    });
  }, []);

  return (
    <AppWrapper>
      <InitialGreeting ref={initialGreetingRef}>
        Getting Your Map
      </InitialGreeting>

      {mapNumber === 0 ? (
        <MapNumberButtonDiv>
          <ChooseMapDiv ref={chooseMapRef}> Choose Map</ChooseMapDiv>
          <MapNumberButton
            ref={fourMapRef}
            onClick={() => handleOnMapSelect(4)}
          >
            4x4
          </MapNumberButton>
          <MapNumberButton ref={oneMapRef} onClick={() => handleOnMapSelect(1)}>
            1x1
          </MapNumberButton>
        </MapNumberButtonDiv>
      ) : null}
      {mapNumber === 1 ? <Map userLocation={userLocation} /> : null}
      {mapNumber === 4 ? <Map userLocation={userLocation} /> : null}
    </AppWrapper>
  );
};

export default App;
