import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import View from "./view";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  loadWildFire,
  loadWildFireSuccess,
  loadWildFireFailed,
} from "../../redux/wildfire";

const Map = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [mapNumber, setMapNumber] = useState<string>("");

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const fetchFireData = async () => {
  //     dispatch(loadWildFire());
  //     try {
  //       const response = await fetch(
  //         "https://eonet.gsfc.nasa.gov/api/v2.1/events"
  //       ).then((res) => res.json());
  //       setData(response);
  //       setFetchingUser(false);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchFireData();
  // }, []);

  useEffect(() => {
    if (params.number) {
      setMapNumber(params.number);
    } else {
      navigate("/");
    }
  }, []);

  return <View mapNumber={mapNumber} />;
};

export default Map;
