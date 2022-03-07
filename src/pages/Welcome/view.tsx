import {
  InitialGreeting,
  MapNumberButtonDiv,
  MapNumberButton,
  ChooseMapDiv,
} from "./style";

interface WelcomePagePropsInterface {
  handleOnMapSelect: Function;
}

const View = (props: WelcomePagePropsInterface) => {
  const { handleOnMapSelect } = props;

  return (
    <>
      <InitialGreeting>Getting Your Map</InitialGreeting>
      <MapNumberButtonDiv>
        <ChooseMapDiv> Choose Map</ChooseMapDiv>
        <MapNumberButton onClick={() => handleOnMapSelect("/map/4")}>
          4x4
        </MapNumberButton>
        <MapNumberButton onClick={() => handleOnMapSelect("/map/1")}>
          1x1
        </MapNumberButton>
      </MapNumberButtonDiv>
    </>
  );
};
export default View;
