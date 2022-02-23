import Map, { Marker } from "react-map-gl";
import DeckGL from "@deck.gl/react";

// Styles
import {
  MapWrapper,
  ButtonDiv,
  LocationLatLongDiv,
  WildFireImage,
  ChooseMapStyleSelect,
} from "./style";

// Images
import OFFICE_IMAGE from "../../assets/images/office.png";
import FIRE_IMAGE from "../../assets/images/fire.png";
import VOLCANO_IMAGE from "../../assets/images/volcano.png";
import STORM_IMAGE from "../../assets/images/storm.png";

export interface ViewStateInterface {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface pointNaturalEventData {
  id: string;
  link: string;
  date: string;
  coordinates: number[];
}

export interface LineNaturalEventDataSingle {
  from: number[];
  to: number[];
}

export interface LineNaturalEventData {
  id: string;
  geometries: LineNaturalEventDataSingle[];
}

export interface MapStyleInterface {
  name: string;
  url: string;
}

export interface ViewPropsInterface {
  mapWrapperDivRef: React.RefObject<HTMLDivElement>;
  initialViewState: ViewStateInterface;
  setInitialViewState: Function;
  stormLayers: any;
  wildFireData: pointNaturalEventData[] | undefined;
  showFireData: boolean;
  setShowFireData: Function;
  volcanoesData: pointNaturalEventData[] | undefined;
  showVolcanoesData: boolean;
  setShowVolcanoesData: Function;
  severeStormData: LineNaturalEventData | undefined;
  handleShowSevereStorm: Function;
  mapStyle: string;
  setMapStyle: Function;
  MAPBOX_ACCESS_TOKEN: string;
  MAP_STYLES: MapStyleInterface[];
}

const View = (props: ViewPropsInterface) => {
  const {
    mapWrapperDivRef,
    initialViewState,
    setInitialViewState,
    stormLayers,
    wildFireData,
    showFireData,
    setShowFireData,
    volcanoesData,
    showVolcanoesData,
    setShowVolcanoesData,
    severeStormData,
    handleShowSevereStorm,
    mapStyle,
    MAPBOX_ACCESS_TOKEN,
    setMapStyle,
    MAP_STYLES,
  } = props;

  return (
    <MapWrapper ref={mapWrapperDivRef}>
      <DeckGL
        initialViewState={initialViewState}
        onViewStateChange={({ viewState }) => setInitialViewState(viewState)}
        controller={true}
        layers={[stormLayers]}
      >
        <LocationLatLongDiv>
          {`Latitude: ${initialViewState.latitude.toFixed(
            3
          )} Longitude: ${initialViewState.longitude.toFixed(
            3
          )} Zoom: ${initialViewState.zoom.toFixed(0)}`}
        </LocationLatLongDiv>

        <ButtonDiv>
          {wildFireData ? (
            <div onClick={() => setShowFireData(!showFireData)}>
              Show Wild Fire
              <WildFireImage
                src={FIRE_IMAGE}
                alt="fire"
                width="20"
                height="15"
              />
            </div>
          ) : null}

          {volcanoesData ? (
            <div onClick={() => setShowVolcanoesData(!showVolcanoesData)}>
              Show Volcanoes
              <WildFireImage
                src={VOLCANO_IMAGE}
                alt="Volcanoes"
                width="20"
                height="15"
              />
            </div>
          ) : null}

          {severeStormData ? (
            <div onClick={() => handleShowSevereStorm()}>
              Show Severe Storm
              <WildFireImage
                src={STORM_IMAGE}
                alt="STORM"
                width="20"
                height="15"
              />
            </div>
          ) : null}
        </ButtonDiv>

        <Map mapStyle={mapStyle} mapboxAccessToken={MAPBOX_ACCESS_TOKEN}>
          {showFireData && wildFireData
            ? wildFireData.map((wf) => (
                <Marker
                  key={wf.id}
                  longitude={wf.coordinates[0]}
                  latitude={wf.coordinates[1]}
                  anchor="bottom"
                >
                  <img src={FIRE_IMAGE} alt="wild fire" />
                </Marker>
              ))
            : null}

          {showVolcanoesData && volcanoesData
            ? volcanoesData.map((wf) => (
                <Marker
                  key={wf.id}
                  longitude={wf.coordinates[0]}
                  latitude={wf.coordinates[1]}
                  anchor="bottom"
                >
                  <img src={VOLCANO_IMAGE} alt="volcano" />
                </Marker>
              ))
            : null}

          <Marker longitude={90.4001656} latitude={23.781855} anchor="bottom">
            <img src={OFFICE_IMAGE} alt="office" />
          </Marker>
        </Map>
      </DeckGL>

      <ChooseMapStyleSelect onChange={(evt) => setMapStyle(evt.target.value)}>
        {MAP_STYLES.map((style) => (
          <option value={style.url}>{style.name.toUpperCase()}</option>
        ))}
      </ChooseMapStyleSelect>
    </MapWrapper>
  );
};

export default View;
