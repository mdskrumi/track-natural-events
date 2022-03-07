import SingleMap from "../SingleMap";
import { FourMapWrapperDiv } from "./style";

const View = () => {
  return (
    <FourMapWrapperDiv>
      <SingleMap
        divideStyle={{
          top: "0%",
          bottom: "50%",
          left: "0%",
          right: "50%",
        }}
        mapType={0}
      />
      <SingleMap
        divideStyle={{
          top: "0%",
          bottom: "45%",
          left: "50%",
          right: "0%",
        }}
        mapType={1}
      />
      <SingleMap
        divideStyle={{
          top: "50%",
          bottom: "0%",
          left: "50%",
          right: "0%",
        }}
        mapType={2}
      />
      <SingleMap
        divideStyle={{
          top: "50%",
          bottom: "0%",
          left: "0%",
          right: "50%",
        }}
        mapType={3}
      />
    </FourMapWrapperDiv>
  );
};

export default View;
