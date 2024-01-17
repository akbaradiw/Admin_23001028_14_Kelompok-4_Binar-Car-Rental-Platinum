import React, { useEffect, useState } from "react"
import SideBar from "../../components/SideBar"
import NavBar from "../../components/NavBar"
import './style.css'
import ListCar from "../../components/ListCar"
import { useDispatch } from "react-redux"
import getCarsAPI from "../../api/getListCar"
import { getCars } from "../../redux/cars/carSlice"

const CarPage = () => {
    const dispatch = useDispatch();

    const getCarsData = async () => {
        try {
            
            const response = await getCarsAPI();
            dispatch(getCars(response));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCarsData()
    }, [])

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