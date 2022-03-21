import Map from "react-map-gl";
import DeckGL from "@deck.gl/react";
import ToggleButton from "../ToggleButton";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";

import FireImage from "../../assets/images/fire.png";
import StormImage from "../../assets/images/storm.png";
import VolcanoImage from "../../assets/images/volcano.png";

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
  showFireIcons: boolean;
  setShowFireIcons: Function;
  setShowVolcanoIcons: Function;
  volcanoLayer: any;
  showVolcanoIcons: boolean;
  stormLayer: any;
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
    volcanoLayer,
    showVolcanoIcons,
    setShowVolcanoIcons,
  } = props;
  const params = useParams();
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2wwZzhlbGkzMDM3dzNqcThjZDh2d2ludiJ9.5ho6NOAH8RLxxq2e36D0Vg";

  const { wildfires } = useAppSelector((state) => state.wildfire);
  const { storms } = useAppSelector((state) => state.storm);
  const { volcanoes } = useAppSelector((state) => state.volcanoes);

  return (
    <MapWrapper>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={[wildfireLayer, stormLayer, volcanoLayer]}
        width={params.number === "1" ? "100%" : "50%"}
        height={params.number === "1" ? "100%" : "50%"}
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
          {wildfires.length > 0 ? (
            <ToggleButton
              title="Wildfires"
              image={FireImage}
              show={showFireIcons}
              setShow={setShowFireIcons}
            />
          ) : null}

          {volcanoes.length > 0 ? (
            <ToggleButton
              title="Volcanoes"
              image={VolcanoImage}
              show={showVolcanoIcons}
              setShow={setShowVolcanoIcons}
            />
          ) : null}

          {storms.length > 0 ? (
            <ToggleButton
              title="Severe Storms"
              image={StormImage}
              show={showStormLines}
              setShow={setShowStormLines}
            />
          ) : null}
        </ButtonDiv>
      </DeckGL>
    </MapWrapper>
  );
};

export default View;
