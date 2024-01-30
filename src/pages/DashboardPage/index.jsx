import React from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Breadcrumb } from "react-bootstrap";
import DataStatistic from "../../components/DataStatistic";
import TableCar from "../../components/TableCar";
import "./style.css";

const DashboardPage = () => {
  return (
    <div>
      <SideBar menu={"dashboard"} />
      <NavBar />
      <div className="page-dashboard">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard </Breadcrumb.Item>
          <Breadcrumb.Item active>Dashboard </Breadcrumb.Item>
        </Breadcrumb>
        <DataStatistic />
        <TableCar />
      </div>
    </div>
  );
};

export default DashboardPage;
