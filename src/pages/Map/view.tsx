import { MapDiv } from "./style";

// Components
import SingleMap from "../../components/SingleMap";
import FourMap from "../../components/FourMap";

interface MapPropsInterface {
  mapNumber: string;
}

const View = (props: MapPropsInterface) => {
  const { mapNumber } = props;

  return (
    <MapDiv>
      {mapNumber === "1" ? (
        <SingleMap divideStyle={null} mapType={0} />
      ) : (
        <FourMap />
      )}
    </MapDiv>
  );
};
export default View;
