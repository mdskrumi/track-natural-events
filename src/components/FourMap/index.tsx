import Map from "../Map";

import { FourMapWrapperDiv } from "./style";

const FourMap = () => {
  return (
    <FourMapWrapperDiv>
      <Map userLocation={undefined} />
      <Map userLocation={undefined} />
      <Map userLocation={undefined} />
      <Map userLocation={undefined} />
    </FourMapWrapperDiv>
  );
};

export default FourMap;
