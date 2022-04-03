import { LineLayer } from "@deck.gl/layers";
import { StormDataInterface } from "./../redux/storm";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

interface LineLayerDataInterface {
  title: string | null;
  from: [number | undefined, number | undefined];
  to: [number | undefined, number | undefined];
}

const useLineLayer = (data: StormDataInterface[], showStormLines: boolean) => {
  let stormLayers: any = [];
  data.forEach((storm: StormDataInterface) => {
    if (storm && storm.line && storm.line.length > 1) {
      const layer: LineLayerDataInterface[] = [];
      for (let i = 1; i < storm.line.length; i++) {
        layer.push({
          title: storm.title,
          from: [
            storm.line[i - 1].coordinate?.longitude,
            storm.line[i - 1].coordinate?.latitude,
          ],
          to: [
            storm.line[i].coordinate?.longitude,
            storm.line[i].coordinate?.latitude,
          ],
        });
      }

      const lineLayer = new LineLayer({
        id: `line-layer-${storm.id}`,
        data: layer,
        pickable: true,
        getSourcePosition: (d: any) => d.from,
        getTargetPosition: (d: any) => d.to,
        getColor: (d: any) => [140, 140, 0],
        getWidth: showStormLines ? 50 : 0,
      });

      stormLayers.push(lineLayer);
    }
  });

  return stormLayers;
};

export default useLineLayer;
