import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Form,
  Button,
  Container,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap/";
import "./style.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import getCarsAPI from "../../api/getListCar";
import { getCars } from "../../redux/cars/carSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = async () => {
    try {
      const cars = await getCarsAPI("", search);
      dispatch(getCars(cars));
      setSearchParams({ name: search });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar className="navbar">
        <div className="d-flex gap-4">
          <div className="logo-navbar"></div>
          <div className="ml-3">
            <i class="bi bi-list h2"></i>
          </div>
        </div>

        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="outline-primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
            <Col xs="auto">
              <div id="text-admin">
                <NavDropdown title={role} id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={handleLogOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  );
};

export default NavBar;
