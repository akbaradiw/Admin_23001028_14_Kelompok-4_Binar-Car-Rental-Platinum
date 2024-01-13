import React from "react"
import SideBar from "../../components/SideBar"
import NavBar from "../../components/NavBar"
import {Form, Dropdown, DropdownButton, Col, Row, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./style.css";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";



const AddPage = () => {

  const[addForm, setAddForm] = useState({
    name: "",
    type: "",
    price: "",
    photo: "",
    category: ""
  })

  const handleAddFormChange = (e) => {
    setAddForm({
      ...addForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmitForm = (e) => {
    const token = localStorage.getItem("accesToken")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios
    .post("https://api-car-rental.binaracademy.org/admin/car" , addForm, config)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => 
      console.log(err)
    )                                  
  }

    return (
        <div>
            <SideBar />
            <NavBar />
            <h1> ADD NEW CAR</h1>
 <div class="add-car">   
 <Form >
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Nama/Tipe Mobil
        </Form.Label>
        <Col sm="10">
          <Form.Control type="input" name="name" placeholder="Input Nama/Tipe Mobil"  onChange={handleAddFormChange} />
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
    <Button onClick={handleSubmitForm}>test</Button>
    </div>
        </div>
    )
}

export default AddPage