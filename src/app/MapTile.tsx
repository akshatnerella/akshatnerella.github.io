"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MAP_STYLE = "https://demotiles.maplibre.org/style.json";
const SF_CENTER: [number, number] = [-122.4194, 37.7749];

export default function MapTile() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: MAP_STYLE,
      center: SF_CENTER,
      zoom: 8,
      attributionControl: false,
      interactive: true,
    });

    const markerEl = document.createElement("div");
    markerEl.style.width = "12px";
    markerEl.style.height = "12px";
    markerEl.style.borderRadius = "999px";
    markerEl.style.background = "#3b82f6";
    markerEl.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.25)";

    new maplibregl.Marker({ element: markerEl })
      .setLngLat(SF_CENTER)
      .addTo(map);

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    return () => map.remove();
  }, []);

  return <div className="maplibre-map" ref={mapRef} />;
}
