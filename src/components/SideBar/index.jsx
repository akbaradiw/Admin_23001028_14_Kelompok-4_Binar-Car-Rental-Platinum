import React from "react"
import "./style.css";
import square from "../../assets/squareside.png"
import dashboard_img from "../../assets/dashboard_logo.png"
import car_img from "../../assets/car_logo.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import SideDashboard from "../SideDashboard";
import SideCar from "../SideCar";

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const hiddenSideBar = () => {
    setShowSidebar(!showSidebar);
  };

  const hiddenSide = () => {
    setShowBar (!showBar);
  };


    return (
<div>
<div class="sidebar">
  <div>
  <img src={square} alt="gadogado"/>
  </div>
  <div>
  {showSidebar && <SideDashboard />}
  <img src={dashboard_img} alt="home"/>
  <p id="text-dashboard"  onClick={hiddenSideBar}> Dashboard </p>
  </div>
  <div>
  {showBar && <SideCar />}
  <img src={car_img}  alt="carr"/>
  <p id="text-cars" onClick={hiddenSide}> Cars </p>
  </div>
  
</div>

</div>
    )
}

export default SideBar