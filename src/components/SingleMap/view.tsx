import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";

// Styles
import { MapWrapper, LocationLatLongDiv, ChooseMapStyleSelect } from "./style";

export interface ViewStateInterface {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface MapStyleInterface {
  name: string;
  url: string;
}

export interface DivideStyleInterface {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

export interface ViewPropsInterface {
  initialViewState: ViewStateInterface;
  setInitialViewState: Function;
  mapStyle: string;
  setMapStyle: Function;
  MAP_STYLES: MapStyleInterface[];
  MAPBOX_ACCESS_TOKEN: string;
  divideStyle: DivideStyleInterface;
}

const View = (props: ViewPropsInterface) => {
  const {
    initialViewState,
    setInitialViewState,
    mapStyle,
    setMapStyle,
    MAP_STYLES,
    divideStyle,
    MAPBOX_ACCESS_TOKEN,
  } = props;

  return (
    <MapWrapper>
      <DeckGL
        initialViewState={initialViewState}
        onViewStateChange={(state: any) => setInitialViewState(state.viewState)}
        controller={true}
        width={"100%"}
        height={"100%"}
        style={divideStyle}
      >
        <LocationLatLongDiv>
          {`Latitude: ${initialViewState.latitude.toFixed(
            3
          )} Longitude: ${initialViewState.longitude.toFixed(
            3
          )} Zoom: ${initialViewState.zoom.toFixed(0)}`}
        </LocationLatLongDiv>

        <Map mapStyle={mapStyle} mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />

        <ChooseMapStyleSelect
          onChange={(evt) => setMapStyle(evt.target.value)}
          value={mapStyle}
        >
          {MAP_STYLES.map((style) => (
            <option key={style.name} value={style.url}>
              {style.name.toUpperCase()}
            </option>
          ))}
        </ChooseMapStyleSelect>
      </DeckGL>
    </MapWrapper>
  );
};

export default View;
