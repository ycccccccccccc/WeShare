"use client";

// import { useState } from "react";
// import Map from "../../Components/Map"
// import Mapsearch from "../../Components/Mapsearch"
// import Itemcard from "../../Components/Itemcard";
import Navbar from "../../Components/navbar";
import Deatailchatbox from "../../Components/detailchatbox";

export default function Home() {
  // const [itemAddress, setItemAddress] = useState(null);
  
  // const clearAddress = () => {
  //   setItemAddress(null);
  // };
  return (
    <div>
      <Navbar/>
      <Deatailchatbox/>

      {/* <div className="main">
        <div className="mapsearch">
          <Mapsearch/>
        </div>
          <Map address={itemAddress} onMapClick={clearAddress}/>
        <Itemcard onMoreClick={setItemAddress}/>
      </div> */}
    </div>
  );
}
