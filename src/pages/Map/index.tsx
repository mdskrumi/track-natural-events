import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import View from "./view";

const Map = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [mapNumber, setMapNumber] = useState<string>("");

  useEffect(() => {
    if (params) {
      if (params.number === "1") {
        setMapNumber(params.number);
      } else if (params.number === "4") {
        setMapNumber(params.number);
      } else {
        navigate("/");
      }
    }
  }, [params, navigate]);

  return <View mapNumber={mapNumber} />;
};

export default Map;
