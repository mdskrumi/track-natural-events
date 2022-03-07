import { useNavigate } from "react-router-dom";
import View from "./view";

const Welcome = () => {
  const navigate = useNavigate();

  const handleOnMapSelect = (url: string) => {
    navigate(url);
  };

  return <View handleOnMapSelect={handleOnMapSelect} />;
};
export default Welcome;
