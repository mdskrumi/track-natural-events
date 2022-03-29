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
        <MapNumberButton
          className="4x4_button"
          onClick={() => handleOnMapSelect("/map/4")}
        >
          4x4
        </MapNumberButton>
        <MapNumberButton
          className="1x1_button"
          onClick={() => handleOnMapSelect("/map/1")}
        >
          1x1
        </MapNumberButton>
      </MapNumberButtonDiv>
    </>
  );
};
export default View;
