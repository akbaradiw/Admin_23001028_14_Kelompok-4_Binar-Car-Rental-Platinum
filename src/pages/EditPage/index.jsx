import React from "react"
import SideBar from "../../components/SideBar"
import {Form, Button, Col, Row} from 'react-bootstrap';
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "../../components/NavBar"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const EditPage = () => {
const navigate = useNavigate();
const [editFile, setEditFile] = useState(0)
const [prevEditFile, setPrevEditFile] = useState(null)
const [name, setName] = useState("");
const [category, setCategory] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState("");

const { id } = useParams();
console.log(id);

// const[editForm, setEditForm] = useState({
//   name: "",
//   price: "",
//   photo: "",
//   category: "",
//   })

useEffect (() => {
  detailCar()
})

const detailCar = async () => {
  try {
    const res = await axios.get(`https://api.mudoapi.tech/menu/${id}`);
    console.log(res);
    setName(res.data.data.name);
    setDescription(res.data.data.category);
    setPrice(res.data.data.price);
    setImage(res.data.data.image);
  } catch (err) {
    console.log(err);
  }
};

  // const handleEditChange = (e) => {
  //   const { name, value } = event.target  
  //       setEditForm({
  //         ...editForm,
  //         [name]: value,
  //       })
  //     } 

  const editButton = async () => {
    try {
      const config = {
        headers: {
          access_token: localStorage.getItem("accessToken") ,
        },
      }
      const editCarResponse = await axios.put(
        "https://api-car-rental.binaracademy.org/admin/car",
        id,
        config
      )
      console.log(editCarResponse)
      navigate("/cars")
    }
     catch (err) {
      console.log(err)
  }
}  

const editImage = (e) => {
  const extend = e.target.files[0]?.type.split("/")[1]
  const allowedExten = ["png", "jpeg", ]
  const allowedSize = 1024 * 1024;
  const data = e.target.files[0]
  

if (!allowedExten.includes(extend)) {
  alert ("File bukan gambar")
} else if (data.size > allowedSize) {
  alert ("File terlalu besar")
}
else {
  console.log(e.target.files[0])
  editFile(e.target.files[0])
  setEditFile(URL.createObjectURL(e.target.files[0]))
}
  }



return (
       <div>
 <SideBar/>
 <NavBar/>
 <h1>EDIT CAR</h1>

 <div className="edit">
 <Form >
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Nama/Tipe Mobil
        </Form.Label>
        <Col sm="10">
          <Form.Control type="input" name="name" value={name} placeholder="Input Nama/Tipe Mobil" onChange={(e) => setName(e.target.value)}   />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Harga
        </Form.Label>
        <Col sm="10">
          <Form.Control type="input" name="price" value={price} placeholder="Input Harga Sewa Mobil" onChange={(e) => setPrice(e.target.value)}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Foto
        </Form.Label>
        <Col sm="10">
          <Form.Control type="file" placeholder="Upload Foto Mobil" value={image} onChange={editImage} />
          <img style={{width: 200, height: 200}} src={prevEditFile}/>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Kategori
        </Form.Label>
        <Col sm="10">
        <div>
   <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
      <option value="">Pilih Kategori Mobil</option>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
    </Form.Select>
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
    <Button onClick={editButton}>klik</Button>

    </div>
    
      </div>
    )
}

export default EditPage