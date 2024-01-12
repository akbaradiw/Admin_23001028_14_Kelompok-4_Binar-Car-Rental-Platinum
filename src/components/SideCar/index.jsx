import React from "react"
import "./style.css";
import { useNavigate } from "react-router-dom";


const SideCar = () => {
  const navigate = useNavigate();
    return (
        <div class="side-car">
        <p> CARS </p>
        <div onClick={() => navigate("/cars")}>
          <a href="">Cars</a>  
        </div>

      </div>
    )
    
}

export default SideCar