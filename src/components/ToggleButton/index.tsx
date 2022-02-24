import View, { ToggleButtonPropsInterface } from "./view";

const ToggleButton = (props: ToggleButtonPropsInterface) => {
  const { show, setShow, image, title } = props;
  return (
    <View
      show={show}
      setShow={setShow}
      image={image}
      title={`${show ? "Hide" : "Show"} ${title}`}
    />
  );
};

export default ToggleButton;
