import React from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import { Form, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const [file, setFile] = useState(0);
  const [prevFile, setPrevFile] = useState(null);
  const navigate = useNavigate();

  const [addForm, setAddForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const handleAddFormChange = (e) => {
    const { name, value } = event.target;
    setAddForm({
      ...addForm,
      [name]: value,
    });
    // console.log(addForm);
    // console.log(name, value);
  };

  const handleImage = (e) => {
    const extend = e.target.files[0]?.type.split("/")[1];
    const allowedExten = ["png", "jpeg"];
    const allowedSize = 1024 * 1024;
    const data = e.target.files[0];

    if (!allowedExten.includes(extend)) {
      alert("File bukan gambar");
      return
    } else if (data.size > allowedSize) {
      alert("File terlalu besar");
      return
    } else {
      console.log(e.target.files[0]);
      // setFile(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
      setAddForm({
        ...addForm,
         image:data
      })
      console.log(data)
    }

    
  };

  const handleSubmitForm = async () => {
      try {
        const config = {
          headers: {
            access_token: localStorage.getItem("accessToken") ,
            "Content-Type": "multipart/form-data"
          },
        }

        const formData = new FormData();
        formData.append("name", addForm.name);
        formData.append("price", addForm.price);
        formData.append("image", addForm.image);
        formData.append("category", addForm.category);

        const addCarResponse = await axios.post(
          "https://api-car-rental.binaracademy.org/admin/car",
          formData,
          config
        )
        console.log(addCarResponse)
        navigate("/cars")
      }
       catch (err) {
        console.log(err)
    }
    console.log(addForm);
  };

  

  return (
    <div>
      <SideBar />
      <NavBar />
      <h1> ADD NEW CAR</h1>
      <div className="add-car">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Nama/Tipe Mobil
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="input"
                name="name"
                value={addForm.name}
                placeholder="Input Nama/Tipe Mobil"
                onChange={handleAddFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Harga
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="input"
                name="price"
                value={addForm.price}
                placeholder="Input Harga Sewa Mobil"
                onChange={handleAddFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Foto
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="file"
                // name="photo"
                placeholder="Upload Foto Mobil"
                onChange={handleImage}
                // value={addForm.photo}
              />
              {/* <img style={{ width: 200, height: 200 }} src={prevFile} /> */}
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Kategori
            </Form.Label>
            <Col sm="10">
              <div>
                <Form.Select
                  name="category"
                  value={addForm.category}
                  onChange={handleAddFormChange}
                  aria-label="Default select example"
                >
                  <option value="">Pilih Kategori Mobil</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
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
        <Button onClick={handleSubmitForm}>klik</Button>
      </div>
    </div>
  );
};

export default AddPage;
