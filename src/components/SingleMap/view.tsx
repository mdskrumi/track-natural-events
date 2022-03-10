import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";
import ToggleButton from "../ToggleButton";

import FireImage from "../../assets/images/fire.png";
import StormImage from "../../assets/images/storm.png";

// Styles
import {
  MapWrapper,
  LocationLatLongDiv,
  ChooseMapStyleSelect,
  ButtonDiv,
} from "./style";

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
  mapStyle: string;
  setMapStyle: Function;
  MAP_STYLES: MapStyleInterface[];
  divideStyle: DivideStyleInterface;
  wildfireLayer: any;
  stormLayer: any;
  showFireIcons: boolean;
  setShowFireIcons: Function;
  showStormLines: boolean;
  setShowStormLines: Function;
}

const View = (props: ViewPropsInterface) => {
  const {
    initialViewState,
    mapStyle,
    setMapStyle,
    MAP_STYLES,
    divideStyle,
    wildfireLayer,
    stormLayer,
    showFireIcons,
    setShowFireIcons,
    showStormLines,
    setShowStormLines,
  } = props;

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2wwZzhlbGkzMDM3dzNqcThjZDh2d2ludiJ9.5ho6NOAH8RLxxq2e36D0Vg";

  return (
    <MapWrapper>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[wildfireLayer, stormLayer]}
        width={"100%"}
        height={"100%"}
        style={divideStyle}
        getTooltip={({ object }: any) => object && `${object.title}`}
      >
        <LocationLatLongDiv>
          {`Latitude: ${initialViewState.latitude.toFixed(
            3
          )} Longitude: ${initialViewState.longitude.toFixed(
            3
          )} Zoom: ${initialViewState.zoom.toFixed(0)}`}
        </LocationLatLongDiv>

        <Map mapStyle={mapStyle} mapboxAccessToken={MAPBOX_ACCESS_TOKEN}></Map>

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
        <ButtonDiv>
          <ToggleButton
            title="Wildfires"
            image={FireImage}
            show={showFireIcons}
            setShow={setShowFireIcons}
          />

          <ToggleButton
            title="Severe Storms"
            image={FireImage}
            show={showStormLines}
            setShow={setShowStormLines}
          />
        </ButtonDiv>
      </DeckGL>
    </MapWrapper>
  );
};

export default View;
