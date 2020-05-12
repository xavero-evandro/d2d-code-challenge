/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React, { useState, useRef } from "react";
import useSwr from "swr";
import axios from "axios";
import ReactMapGl, { Marker, FlyToInterpolator } from "react-map-gl";
import "./App.css";
import useSupercluster from "use-supercluster";
import f1Svg from "./f1.svg";

const fetcher = (...args) =>
  axios.get(...args).then((response) => {
    console.log(response.data);
    return response.data;
  });

function App() {
  const [viewport, setViewport] = useState({
    latitude: 52.53,
    longitude: 13.403,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });
  const mapRef = useRef();
  const urlAPI = "http://localhost:3333/vehicles/locations";
  const { data, error } = useSwr(urlAPI, fetcher, {
    revalidateOnMount: true,
    refreshInterval: 3000,
    loadingTimeout: 4000,
    errorRetryInterval: 5000,
  });
  const vehiclesLocations = data && !error ? data : [];
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;
  const points = vehiclesLocations.map((vehicle) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: vehicle._id,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(vehicle.lng[vehicle.lng.length - 1]),
        parseFloat(vehicle.lat[vehicle.lat.length - 1]),
      ],
    },
  }));
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  //mapboxApiAccessToken="pk.eyJ1IjoieGF2ZXJvIiwiYSI6ImNrYTFqaTE2djAxMzAzbW1sZXRvNmF0YnAifQ.0DdQCOOXsODo_RL-PUEqmg"
  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1IjoieGF2ZXJvIiwiYSI6ImNrYTFqaTE2djAxMzAzbW1sZXRvNmF0YnAifQ.0DdQCOOXsODo_RL-PUEqmg"
      maxZoom={20}
      onViewportChange={(newViewport) => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointsCount,
        } = cluster.properties;

        if (isCluster) {
          return (
            <Marker key={cluster.id} latitude={latitude} longitude={longitude}>
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (pointsCount / points.length) * 20}px`,
                  height: `${10 + (pointsCount / points.length) * 20}px`,
                  cursor: "pointer",
                }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  setViewport({
                    ...viewport,
                    latitude,
                    longitude,
                    zoom: expansionZoom,
                    transitionInterpolator: new FlyToInterpolator({
                      speed: 0.5,
                    }),
                    transitionDuration: "auto",
                  });
                }}
              >
                {pointsCount}
              </div>
            </Marker>
          );
        }
        return (
          <div>
            <Marker
              key={cluster.properties.id}
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <img src={f1Svg} alt="Vrum" />
            </Marker>
          </div>
        );
      })}
    </ReactMapGl>
  );
}

export default App;
