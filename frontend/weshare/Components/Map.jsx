/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

"use client";

import { useState, useEffect, useMemo } from "react";
import { GoogleMap, InfoWindow,useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import mockdata from "../Mockdata/itemmockdata.json";

const mapStyle = {
  height: '85.5vh',
  width: '50vw',
};

export default function Map({ address, itemLocations, onMapClick}) {
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
        streetViewControl: false, 
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
    {itemLocations.map(loc => (
        <Marker 
          icon={{ url: '/mapsicon.png', scaledSize: { width: 40, height: 40 } }}
          key={loc.id} 
          position={{ lat: loc.lat, lng: loc.lng }} 
          onClick={() => {
            setFocusedLocation(loc);
            setShowInfo(true);
          }}
        />
      ))}
      {showInfo && focusedLocation && (
        <InfoWindow
          position={focusedLocation}
          onCloseClick={() => setShowInfo(false)}
        >
          <div>
            <h4>{focusedLocation.title}</h4>
            <p>價格: {focusedLocation.cost}</p>
          </div>
        </InfoWindow>
      )}
  </GoogleMap>
);
}