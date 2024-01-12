import React from "react"
import "./style.css";
import { useNavigate } from "react-router-dom";


const SideCar = () => {
  const navigate = useNavigate();
    return (
        <div className="side-car">
        <p> CARS </p>
        <div onClick={() => navigate("/cars")}>
          <a>List Cars</a>  
        </div>

      </div>
    )
    
}

export default SideCar