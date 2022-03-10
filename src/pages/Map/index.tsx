import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import View from "./view";

import { useAppDispatch } from "../../redux/hooks";

import {
  WildfireDataInterface,
  CoordinateInterface,
  loadWildFire,
  loadWildFireSuccess,
  loadWildFireFailed,
} from "../../redux/wildfire";

import {
  StormDataInterface,
  loadStorms,
  loadStormsSuccess,
  loadStormsFailed,
} from "../../redux/storm";

const Map = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [mapNumber, setMapNumber] = useState<string>("");

  const dispatch = useAppDispatch();

  const setData = (events: any) => {
    const wildfires: WildfireDataInterface[] = [];
    const storms: StormDataInterface[] = [];
    events.forEach((evt: any) => {
      const id = evt.id;
      const title = evt.title;
      if (evt.categories[0].id === 8) {
        wildfires.push({
          id,
          title,
          date: evt.geometries[0].date,
          coordinate: {
            longitude: evt.geometries[0].coordinates[0],
            latitude: evt.geometries[0].coordinates[1],
          },
        });
      } else if (evt.categories[0].id === 10) {
        const line = evt.geometries.map((coor: any) => {
          return {
            date: coor.date,
            coordinate: {
              longitude: coor.coordinates[0],
              latitude: coor.coordinates[1],
            },
          };
        });
        storms.push({ id, title, line });
      }
    });

    dispatch(loadStormsSuccess(storms));
    dispatch(loadWildFireSuccess(wildfires));
  };

  useEffect(() => {
    const fetchFireData = async () => {
      dispatch(loadWildFire());
      dispatch(loadStorms());
      try {
        const response = await fetch(
          "https://eonet.gsfc.nasa.gov/api/v2.1/events"
        ).then((res) => res.json());
        if (response && response.events) {
          setData(response.events);
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
