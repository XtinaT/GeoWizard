import React, { useEffect, useState } from "react";

import GeoJSON from "ol/format/GeoJSON";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import Map from "ol/Map";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import View from "ol/View";

import CustomButton from "./CustomButton";
import Modal from "./Modal";
import { ModalType } from "../constants";

interface MapViewerProps {
  geoJsonData: string;
  onStartNew: () => void;
}

const MapViewer = ({ geoJsonData, onStartNew }: MapViewerProps) => {
  const [modalContent, setModalContent] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const geoJsonObject = JSON.parse(geoJsonData);

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geoJsonObject, {
        featureProjection: "EPSG:3857",
      }),
    });

    const extent = vectorSource.getExtent();

    const center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        fill: new Fill({
          color: "rgba(72, 205, 175, 0.4)",
        }),
        stroke: new Stroke({
          color: "#48CDAF",
          width: 2,
        }),
      }),
    });

    const map = new Map({
      target: "map",
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: center,
        zoom: 8,
      }),
    });

    map.getView().fit(extent, {
      size: map.getSize(),
      padding: [20, 20, 20, 20],
      maxZoom: 12,
    });

    map.on("click", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (feature) {
        const description = feature.get("description");
        if (description) {
          setModalContent(description);
          setIsModalOpen(true);
        }
      }
    });

    map.on("pointermove", (event) => {
      let cursorStyle = "";

      map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        if (layer === vectorLayer) {
          cursorStyle = "pointer";
          return true;
        }
        return false;
      });

      map.getTargetElement().style.cursor = cursorStyle;
    });

    return () => {
      map.setTarget(undefined);
    };
  }, [geoJsonData]);

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-between">
      <h2 className="text-28 text-white font-bold text-center grow flex gap-2 items-center">
        Your<span className="text-brand-green">Area of Interest</span>
      </h2>
      <div id="map" className="map-container" style={{ width: "100%", height: "70vh" }}></div>
      <div className="w-200px grow flex items-center">
        <CustomButton text="Add New Project" type="button" onButtonClick={onStartNew} />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} type={ModalType.SUCCESS}>
        <p className="text-white">{modalContent}</p>
      </Modal>
    </div>
  );
};

export default MapViewer;
