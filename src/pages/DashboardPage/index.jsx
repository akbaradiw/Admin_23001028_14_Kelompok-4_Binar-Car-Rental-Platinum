import React from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import "./style.css";
// import Breadcrumb from "../../components/Breadcrumb";
import { Breadcrumb } from "react-bootstrap";
import DataStatistic from "../../components/DataStatistic";
import TableCar from "../../components/TableCar";

const DashboardPage = () => {
  return (
    <div>
      <SideBar menu={"dashboard"} />
      <NavBar />
      <div className="page-dashboard">
        <Breadcrumb>
          <Breadcrumb.Item active>Dashboard </Breadcrumb.Item>
        </Breadcrumb>
        <DataStatistic />
        <TableCar />
      </div>
    </div>
  );
};

export default DashboardPage;
