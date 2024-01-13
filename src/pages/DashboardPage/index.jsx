import React from "react"
import SideBar from "../../components/SideBar"
import NavBar from "../../components/NavBar"

const DashboardPage = () => {

    return (
        <div>        
            <SideBar menu={"dashboard"} />
            <NavBar/>
        </div>
       
    )
}

export default DashboardPage