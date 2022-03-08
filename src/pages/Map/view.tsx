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
        <SingleMap
          divideStyle={{ top: "0", bottom: "0", left: "0", right: "0" }}
          mapType={0}
        />
      ) : null}
      {mapNumber === "4" ? <FourMap /> : null}
    </MapDiv>
  );
};
export default View;
