import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Components
import Map from "./components/Map";
import FourMap from "./components/FourMap";

// Style
import GlobalStyle, {
  AppWrapper,
  ChooseMapDiv,
  InitialGreeting,
  MapNumberButton,
  MapNumberButtonDiv,
} from "./style";

const App = () => {
  const initialGreetingRef = useRef<HTMLDivElement>(null);
  const chooseMapRef = useRef<HTMLDivElement>(null);
  const fourMapRef = useRef<HTMLDivElement>(null);
  const oneMapRef = useRef<HTMLDivElement>(null);

  const [mapNumber, setMapNumber] = useState<number>(0);

  const handleOnMapSelect = (num: number) => {
    setMapNumber(num);
    gsap
      .timeline()
      .to(initialGreetingRef.current, { opacity: 0, duration: 2 })
      .to(initialGreetingRef.current, { zIndex: -1 });
  };

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
      <GlobalStyle />
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
      ) : mapNumber === 1 ? (
        <Map divideStyle={null} mapType={0} />
      ) : mapNumber === 4 ? (
        <FourMap />
      ) : null}
    </AppWrapper>
  );
};

export default App;
