import React from "react"
import "./style.css";
import square from "../../assets/squareside.png"
const SideBar = () => {

    return (
<div>
<div class="sidebar">
  <img src={square} alt="gadogado"/>
  <a href="#">Dashboard</a>
  <a href="#">Cars</a>
</div>
</div>
    )
}

export default SideBar