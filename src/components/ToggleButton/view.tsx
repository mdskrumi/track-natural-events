import { WildFireImage } from "./style";

export interface ToggleButtonPropsInterface {
  show: boolean;
  setShow: Function;
  image: string;
  title: string;
}

const View = (props: ToggleButtonPropsInterface) => {
  const { show, setShow, image, title } = props;
  return (
    <div onClick={() => setShow(!show)}>
      {title}
      <WildFireImage src={image} alt="Volcanoes" width="20" height="15" />
    </div>
  );
};

export default View;
