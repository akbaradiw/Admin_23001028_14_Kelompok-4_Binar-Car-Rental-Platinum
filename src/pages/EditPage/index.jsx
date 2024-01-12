import React from "react"
import SideBar from "../../components/SideBar"
import {Form, Dropdown, DropdownButton, Col, Row} from 'react-bootstrap';
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "../../components/NavBar"



const EditPage = () => {

return (
       <div>
 <SideBar/>
 <NavBar/>
 <h1>EDIT CAR</h1>

 <div class="edit">
 <Form >
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Nama/Tipe Mobil
        </Form.Label>
        <Col sm="10">
          <Form.Control type="input" placeholder="Input Nama/Tipe Mobil"  />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Harga
        </Form.Label>
        <Col sm="10">
          <Form.Control type="input" placeholder="Input Harga Sewa Mobil" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Foto
        </Form.Label>
        <Col sm="10">
          <Form.Control type="Input" placeholder="Upload Foto Mobil"  />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Kategori
        </Form.Label>
        <Col sm="10">
        <div>
        <DropdownButton variant="light"
          title="Pilih Kategori Mobil"
        >
          <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
        </DropdownButton>
      </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Created At
        </Form.Label>
        <Col sm="10">
          <span>-</span>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Update At
        </Form.Label>
        <Col sm="10">
          <span>-</span>
        </Col>
      </Form.Group>
    </Form>
    </div>
    
      </div>
    )
}

export default EditPage