import React from "react"
import "./style.css";
import { Link } from "react-router-dom";



const SideDashboard = () => {

    return (
        <div class="side-dashboard">
        <p> DASHBOARD </p>
        <Link to={"/"}>
        <a>Dashboard</a>  
        </Link>

      </div>
    )
}

export default SideDashboard