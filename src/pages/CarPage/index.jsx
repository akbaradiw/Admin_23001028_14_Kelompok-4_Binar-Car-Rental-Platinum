import React from "react"
import SideBar from "../../components/SideBar"
import NavBar from "../../components/NavBar"
import './style.css'
import ListCar from "../../components/ListCar"

const CarPage = () => {

    return (
        <div>
             <SideBar menu={"car"}/>
             <NavBar/>
             <div className="page-car">
                <ListCar/>
             </div>
        </div>
    )
}

export default CarPage