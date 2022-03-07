import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Map from "./pages/Map";

// Style
import GlobalStyle, { AppWrapper } from "./style";

const App = () => {
  return (
    <AppWrapper>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" caseSensitive={true} element={<Welcome />} />
          <Route path="/map/:number" caseSensitive={true} element={<Map />} />
          <Route path="*" caseSensitive={true} element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
};

export default App;
