"use client";


import Navbar from "../../../../Components/navbar";
import Profile from "../../../../Components/profile";
import Itemcard  from "../../../../Components/Itemcard";
import mockdata from "../../../../Mockdata/itemmockdata.json";
import "./userpage.css";

export default function UserProfile() {
  return (
    <div>
      <Navbar />
      <div className="mainblock">
        <Profile />
        <div className="itemplace">
          {mockdata.items.map((item) => (
            <Itemcard
              key={item.id}
              image={item.image}
              title={item.title}
              cost={item.cost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
