import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import View from "./view";

import { useAppDispatch } from "../../redux/hooks";
import {
  WildfireDataInterface,
  CoordinateInterface,
} from "../../redux/wildfire";
import {
  loadWildFire,
  loadWildFireSuccess,
  loadWildFireFailed,
} from "../../redux/wildfire";

const Map = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [mapNumber, setMapNumber] = useState<string>("");

  const dispatch = useAppDispatch();

  const setWildfiresData = (events: any) => {
    const wildfires: WildfireDataInterface[] = [];
    events.forEach((evt: any) => {
      if (evt.categories[0].id !== 8) return;
      const id = evt.id;
      const title = evt.title;
      const date = evt.geometries[0].date;
      const coordinate: CoordinateInterface = {
        longitude: evt.geometries[0].coordinates[0],
        latitude: evt.geometries[0].coordinates[1],
      };
      wildfires.push({ id, title, date, coordinate });
    });
    dispatch(loadWildFireSuccess(wildfires));
  };

  useEffect(() => {
    const fetchFireData = async () => {
      dispatch(loadWildFire());
      try {
        const response = await fetch(
          "https://eonet.gsfc.nasa.gov/api/v2.1/events"
        ).then((res) => res.json());
        if (response && response.events) {
          setWildfiresData(response.events);
        }
      } catch (err) {
        dispatch(loadWildFireFailed());
        console.error(err);
      }
    };
    fetchFireData();
  }, []);

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
