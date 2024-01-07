import React from "react"
import "./style.css";
import square from "../../assets/squareside.png"
import dashboard_img from "../../assets/dashboard_logo.png"
import car_img from "../../assets/car_logo.png"
import { Link } from "react-router-dom";
const SideBar = () => {

    return (
<div>
<div class="sidebar">
  <div>
  <img src={square} alt="gadogado"/>
  </div>
  <Link to={"/"}>
  <img src={dashboard_img} alt="home"/>
  <a href=""> Dashboard </a>
  </Link>
  <Link to={"/car"}>
  <img src={car_img}  alt="carr"/>
  <a href="#" id="mobil" >Cars</a>
  </Link>
</div>
</div>
    )
}

export default SideBar