import { useState, useEffect } from "react";
import { IconLayer } from "@deck.gl/layers";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const useMarker = (
  data: any,
  color: [number, number, number],
  size: number = 3
) => {
  return new IconLayer({
    id: "icon-layer",
    data,
    pickable: true,
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping: ICON_MAPPING,
    getIcon: () => "marker",
    sizeScale: 15,
    getPosition: (d: any) => [d.coordinate.longitude, d.coordinate.latitude],
    getSize: () => size,
    getColor: () => color,
  });
};

export default useMarker;
