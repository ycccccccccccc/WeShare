/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-extraneous-dependencies */

"use client";

import { useState, useEffect } from "react";
import Navbar from "../../Components/navbar";
import Map from "../../Components/Map";
import Mapsearch from "../../Components/Mapsearch";
import Itemcard from "../../Components/Itemcard";
import mockdata from "../../Mockdata/itemmockdata.json";

const GEOCODING_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";
function getLatLngFromAddress(address, apiKey) {
  const requestURL = `${GEOCODING_ENDPOINT}?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  return fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        const { location } = data.results[0].geometry;
        return location;
      }
      throw new Error(`Failed to geocode address. Status: ${data.status}`);
    });
}
export default function Home() {
  const [itemAddress, setItemAddress] = useState(null);
  const [itemLocations, setItemLocations] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [focusedLocation, setFocusedLocation] = useState(null); // 新增此行
  const [zoom, setZoom] = useState(12); // 初始化為12或您的初始放大值
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const focusOnItem = (itemId) => {
    const focusedItem = itemLocations.find((item) => item.id === itemId);
    if (focusedItem) {
      setFocusedLocation({ lat: focusedItem.lat, lng: focusedItem.lng });
      setZoom(16); // 或任何您希望放大的值
    }
  };

  useEffect(() => {
    async function fetchAllLocations() {
      const newLocations = [];

      for (const item of mockdata.items) {
        try {
          const location = await getLatLngFromAddress(
            item.location,
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          );
          newLocations.push({
            ...location,
            id: item.id,
            title: item.title,
            image: item.image,
            cost: item.cost,
          });
        } catch (error) {
          console.error(
            "Error getting the latitude and longitude for:",
            item.location
          );
        }
      }
      setItemLocations(newLocations);
    }

    fetchAllLocations();
  }, []);

  const clearAddress = () => {
    setItemAddress(null);
  };

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="mapsearch">
          <Mapsearch />
        </div>
        <Map
          address={itemAddress}
          itemLocations={itemLocations}
          onMapClick={clearAddress}
          selectedItemId={selectedItemId}
          focusedLocation={focusedLocation}
          setZoom={setZoom}
          hoveredItemId={hoveredItemId}
        />

        <div className="itemplace">
          {mockdata.items.map((item) => (
            <Itemcard
              key={item.id}
              image={item.image}
              title={item.title}
              cost={item.cost}
              onPicClick={focusOnItem}
              onMouseOver={() => {
                setHoveredItemId(item.id);
              }}
              onMouseOut={() => setHoveredItemId(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
