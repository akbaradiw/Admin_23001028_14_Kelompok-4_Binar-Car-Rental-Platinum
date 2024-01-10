import React from "react"
import "./style.css";
import { Link } from "react-router-dom";

const SideCar = () => {

    return (
        <div class="side-car">
        <p> CARS </p>
        <Link to={"car"}>
        <a href="">Cars</a>  
        </Link>

      </div>
    )
    
}

export default SideCar