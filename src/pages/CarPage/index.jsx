import React, { useEffect, useState } from "react"
import SideBar from "../../components/SideBar"
import NavBar from "../../components/NavBar"
import './style.css'
import ListCar from "../../components/ListCar"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import getCarsAPI from "../../api/getListCar"
import { getCars } from "../../redux/cars/carSlice"

const CarPage = () => {
    // const [cars, setCars] = useState([]);
    const cars = useSelector((state) => state.cars);
    const dispatch = useDispatch();

    // const fetchData = async () => {
    //     try {
    //       const response = await axios.get("https://api-car-rental.binaracademy.org/admin/v2/car", {
    //         headers: {
    //           access_token: localStorage.getItem("accessToken"),
    //         },
    //       });
    //       setCars(response.data.cars);
    //       console.log(response.data.cars)
    //     } catch (error) {
    //       console.error(error);
    //     }
    // };

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
                {
                    (cars.list_car.length === 0) ? <h2 className="text-center">Loading ...</h2> : 
                    <ListCar/>
                }
             </div>
        </div>
    )
}

export default CarPage