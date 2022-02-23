import Map from "../Map";

import { FourMapWrapperDiv } from "./style";

const FourMap = () => {
  return (
    <FourMapWrapperDiv>
      <Map
        userLocation={undefined}
        divideStyle={{
          top: "0%",
          bottom: "50%",
          left: "0%",
          right: "50%",
        }}
      />
      <Map
        userLocation={undefined}
        divideStyle={{
          top: "0%",
          bottom: "50%",
          left: "50%",
          right: "0%",
        }}
      />
      <Map
        userLocation={undefined}
        divideStyle={{
          top: "50%",
          bottom: "0%",
          left: "50%",
          right: "0%",
        }}
      />
      <Map
        userLocation={undefined}
        divideStyle={{
          top: "50%",
          bottom: "0%",
          left: "0%",
          right: "50%",
        }}
      />
    </FourMapWrapperDiv>
  );
};

export default FourMap;
