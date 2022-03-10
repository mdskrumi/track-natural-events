import { useState, useEffect } from "react";
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
  divideStyle: DivideStyleInterface;
  wildfireLayer: any;
  stormLayer: any;
}

const View = (props: ViewPropsInterface) => {
  const {
    initialViewState,
    setInitialViewState,
    mapStyle,
    setMapStyle,
    MAP_STYLES,
    divideStyle,
    wildfireLayer,
    stormLayer,
  } = props;

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoibWRza3J1bWkiLCJhIjoiY2wwZzhlbGkzMDM3dzNqcThjZDh2d2ludiJ9.5ho6NOAH8RLxxq2e36D0Vg";

  return (
    <MapWrapper>
      <DeckGL
        initialViewState={initialViewState}
        // onViewStateChange={(state: any) => setInitialViewState(state.viewState)}
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
      </DeckGL>
    </MapWrapper>
  );
};

export default View;
