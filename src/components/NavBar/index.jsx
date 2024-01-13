import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Form, Button, Container, Row, Col, NavDropdown} from 'react-bootstrap/';
import "./style.css";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
 const  navigate = useNavigate()
  const role = localStorage.getItem("role")
  const handleLogOut = () => {
    localStorage.clear()
    navigate('/login')
  }
    return (
        <div>
        <Navbar  class="navbar">
          <Form inline>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button variant="outline-primary" type="submit">Search</Button>
              </Col>
              <Col xs="auto">
                <div id="text-admin">
              <NavDropdown  title={role} id="navbarScrollingDropdown">
              <NavDropdown.Item  onClick={handleLogOut}>Logout</NavDropdown.Item>
              </NavDropdown>
              </div>
              </Col>
            </Row>
          </Form>
        </Navbar>
        </div>
      );
    
}

export default NavBar