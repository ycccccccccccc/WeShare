/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

"use client";

import { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  InfoWindow,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import styles from "../styles/Map.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
import mapStylecolor from "../styles/mapStyles.json";

const mapStyle = {
  height: "85.5vh",
  width: "50vw",
};

export default function Map({
  itemLocations,
  onMapClick,
  selectedItemId,
  hoveredItemId,
}) {
  const [location, setLocation] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const center = useMemo(() => location, [location]);
  const [zoom, setZoom] = useState(12);
  const [focusedLocation, setFocusedLocation] = useState(null);
  const [useCustomStyle, setUseCustomStyle] = useState(true);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const toggleMapStyle = () => {
    setUseCustomStyle((prev) => !prev);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = () => {
    if (onMapClick) onMapClick();
  };

  if (!isLoaded) return <Skeleton style={mapStyle} />;
  return (
    <>
      <GoogleMap
        key={useCustomStyle.toString()}
        zoom={zoom}
        center={focusedLocation || center}
        mapContainerStyle={mapStyle}
        onClick={handleMapClick}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          fullscreenControl: false,
          ...(useCustomStyle ? { styles: mapStylecolor } : {}),
        }}
      >
        {location && (
          <>
            <Marker
              position={location}
              icon={{
                url: "/mapsicon.png",
                scaledSize: { width: 40, height: 40 },
              }}
            />
            <InfoWindow
              position={location}
              options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
            >
              <div className={styles.infoWindow}>
                <p>您的位置</p>
              </div>
            </InfoWindow>
          </>
        )}
        {itemLocations.map((loc) => (
          <>
            <Marker
              icon={{ url: "/pin.png", scaledSize: { width: 40, height: 40 } }}
              key={loc.id}
              position={{ lat: loc.lat, lng: loc.lng }}
              onClick={() => {
                setFocusedLocation(loc);
                setShowInfo(true);
              }}
            />
            <InfoWindow
              position={{ lat: loc.lat, lng: loc.lng }}
              options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
            >
              <div
                className={
                  hoveredItemId === loc.id
                    ? `${styles.hoveredInfoWindow}`
                    : styles.infoWindow
                }
              >
                <p>{loc.title}</p>
                <p>價格: {loc.cost}</p>
              </div>
            </InfoWindow>
          </>
        ))}
      </GoogleMap>
      <button
        className={styles.mapstylebtn}
        type="button"
        onClick={toggleMapStyle}
      >
        <Image src="/changemode.png" alt="changemode" width={50} height={50} />
      </button>
    </>
  );
}
