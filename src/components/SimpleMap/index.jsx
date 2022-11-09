import React, { useRef, useState, useEffect } from "react";
import { View, Map, Feature } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Icon, Style } from "ol/style";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { transform } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
// import point from "../../point.svg";

export const OlMap = () => {
  const markerIcon = new Style({
    image: new Icon({
      anchor: [16, 48],
      anchorXUnits: "pixels",
      anchorYUnits: "pixels",
      imgSize: [32, 48],
      src: "https://openlayers.org/en/v3.20.1/examples/data/icon.png",
    }),
  });

  const [map, setMap] = useState(null);
  const [mapZoom, setMapZoom] = useState(10);
  const [mapCenter, setMapCenter] = useState([
    31.236549397204925, 30.04312649793286,
  ]);
  // const [mapMarker, setMapMarker] = useState()

  const mapElement = useRef();
  useEffect(() => {
    // create and add vector source layer
    const source = new VectorSource({
      // url: "data.geojson",
      // format: new GeoJSON(),
      // url: "https://openlayers.org/data/vector/us-states.json",
      format: new GeoJSON(),
    });
    const initalFeaturesLayer = new VectorLayer({
      source: source,
      style: new Style({
        "fill-color": "rgba(255, 255, 255, 0.6)",
        "stroke-width": 1,
        "stroke-color": "#319FD3",
        "circle-radius": 5,
        "circle-fill-color": "rgba(255, 255, 255, 0.6)",
        "circle-stroke-width": 1,
        "circle-stroke-color": "#319FD3",
      }),
    });
    const initialMapMarker = new Feature({
      geometry: new Point(transform(mapCenter, "EPSG:4326", "EPSG:3857")),
    });
    initialMapMarker.setStyle(markerIcon);

    const markerData = new VectorSource({
      features: [initialMapMarker],
    });
    const markerLayer = new VectorLayer({
      source: markerData,
    });

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        initalFeaturesLayer,
        markerLayer,
      ],
      view: new View({
        projection: "EPSG:3857",
        zoom: mapZoom,
        center: transform(mapCenter, "EPSG:4326", "EPSG:3857"),
      }),
      controls: [],
    });

    setMap(initialMap);
  }, []);

  return (
    <>
      <div ref={mapElement} style={{ width: "100%", height: "465px" }} />
    </>
  );
};
