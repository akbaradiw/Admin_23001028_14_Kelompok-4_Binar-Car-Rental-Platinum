import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Form, Button, Container, Row, Col, NavDropdown} from 'react-bootstrap/';
import "./style.css";


const NavBar = () => {
    return (
        <div>
        <Navbar  className="navbar">
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
              <NavDropdown  title="ADMIN" id="navbarScrollingDropdown">
              <NavDropdown.Item  href="#action3">Logout</NavDropdown.Item>
              </NavDropdown>
              </div>
              </Col>
            </Row>
          </Form>
        </Navbar>

{/* <nav className="navbar bg-body-tertiary">
  <div className="container-fluid  justify-content-end">
    <a className="navbar-brand">Navbar</a>
    <form className="d-flex" role="search">
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav> */}
        </div>
      );
    
}

export default NavBar