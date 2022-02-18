import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

// Components
import Home from "./components/Home";

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

const App = () => {
  const initialGreetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap
      .timeline()
      .from(initialGreetingRef.current, {
        y: -window.screen.availHeight,
        duration: 2,
      });
  }, []);

  return (
    <AppWrapper>
      <InitialGreeting ref={initialGreetingRef}>
        Getting Your Map
      </InitialGreeting>
      <Home />
    </AppWrapper>
  );
};

export default App;
