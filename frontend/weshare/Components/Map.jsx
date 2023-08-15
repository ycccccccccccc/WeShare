/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

"use client";

import { useState, useEffect, useMemo } from "react";
import { GoogleMap, InfoWindow,useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";

const mapStyle = {
  height: '620px',
  width: '50%',
};

export default function Map({ address, onMapClick}) {
  const [location, setLocation] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [markerLocations, setMarkerLocations] = useState([]);
  const center = useMemo(() => location, [location]);
  const [zoom, setZoom] = useState(10);
  const [focusedLocation, setFocusedLocation] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  useEffect(() => {
    async function fetchLatLng() {
      if (address) {
        try {
          const results = await getGeocode({ address });
          const latLng = await getLatLng(results[0]);
          setMarkerLocations([latLng]);  // 注意这里是替换而不是添加
          setFocusedLocation(latLng);
          setZoom(15);
        } catch (error) {
          console.error("Error getting the latitude and longitude:", error);
        }
      }
    }

    fetchLatLng();
  }, [address]);

  const handleMapClick = () => {
    if (onMapClick) onMapClick();
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap 
    zoom={zoom} 
    center={focusedLocation || center} 
    mapContainerStyle={mapStyle}
    onClick={handleMapClick}
    options={{
        mapTypeControl: false ,
        streetViewControl: false,     // 隐藏Street View的小黃人控件
        zoomControl: false,   
        fullscreenControl: false, 
      }}
  >
    {location && (
      <>
        <Marker 
          position={location} 
          icon={{ url: '/mapsicon.png', scaledSize: { width: 40, height: 40 } }}
          onClick={() => setShowInfo(!showInfo)}  // 点击标记来切换InfoWindow的显示
        />
        {showInfo && (
          <InfoWindow
            position={location}
            onCloseClick={() => setShowInfo(false)}
          >
            <div>您的位置</div>
          </InfoWindow>
        )}
      </>
    )}
    {markerLocations.map((loc, index) => (
      <Marker key={index} position={loc} />
    ))}
  </GoogleMap>
);
}