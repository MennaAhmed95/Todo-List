import React, { useState } from "react";

import Map from "./components/Map";
import { Layers, TileLayer, VectorLayer } from "./components/Layers";
import FeatureStyles from "./components/Features/styles";
import { Controls, FullScreenControl } from "./components/Controls";
import OSM from "ol/source/OSM";
import TileWMS from "ol/source/TileWMS";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat, get } from "ol/proj";
import { Style, Icon } from "ol/style";
import mapConfig from "./config.json";
import ZoomControl from "./components/Controls/ZoomControl";

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [
  mapConfig.kansasCityLonLat,
  mapConfig.blueSpringsLonLat,
  [31.236549397204925, 30.04312649793286],
];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}
const MyApp = () => {
  const [center, setCenter] = useState([31.236549397204925, 30.04312649793286]);
  const [zoom, setZoom] = useState(9);
  const [coord, setCoord] = useState();
  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  const handleMapClick = (e, map) => {
    const clickedCoord = map?.getCoordinateFromPixel([
      [e.originalEvent.layerX, getDecimalPart(e.originalEvent.x)].join("."),
      [e.originalEvent.layerY, getDecimalPart(e.originalEvent.y)].join("."),
    ]);
    console.log(clickedCoord, e);
    setCoord(e.coordinate);
  };
  function getDecimalPart(num) {
    if (Number.isInteger(num)) {
      return 0;
    }
    const decimalStr = num.toString().split(".")[1];
    return Number(decimalStr);
  }
  return (
    <>
      <Map center={fromLonLat(center)} zoom={zoom} onClick={handleMapClick}>
        <Layers>
          <TileLayer source={new OSM()} zIndex={0} />
          <TileLayer
            source={
              new TileWMS({
                url: "https://ahocevar.com/geoserver/wms",
                params: { LAYERS: "topp:states", TILED: true },
                serverType: "geoserver",
                transition: 0,
              })
            }
          />
          <VectorLayer
            source={
              new VectorSource({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })
            }
            style={FeatureStyles.MultiPolygon}
          />
          <VectorLayer
            source={
              new VectorSource({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get("EPSG:3857"),
                }),
              })
            }
            style={FeatureStyles.MultiPolygon}
          />
          <VectorLayer source={new VectorSource({ features })} />
        </Layers>
        <Controls>
          <FullScreenControl />
          <ZoomControl />
        </Controls>
      </Map>
      {coord && (
        <div id="popup" className="ol-popup">
          <a href="#" id="popup-closer" className="ol-popup-closer"></a>
          <div id="popup-content">{`x=${coord[0]},y=${coord[1]}`}</div>
        </div>
      )}
    </>
  );
};

export default MyApp;
