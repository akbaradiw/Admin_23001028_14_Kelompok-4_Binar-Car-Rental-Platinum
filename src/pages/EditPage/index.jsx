import React from "react";
import SideBar from "../../components/SideBar";
import { Form, Button, Col, Row } from "react-bootstrap";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const navigate = useNavigate();
  const [editFile, setEditFile] = useState(0);
  const [prevEditFile, setPrevEditFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { id } = useParams();
  // console.log(id);

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    carDetail();
  });

  const carDetail = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const config = {
        headers: {
          access_token: token,
        },
      };
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        config
      );
      console.log(res);
      setEditForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = event.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // const carDetail = async () => {
  //   try {
  //     // Set up the request headers with the access token
  //     const config = {
  //       headers: {
  //         access_token: localStorage.getItem("accessToken"),
  //       },
  //     };

  //     // Make a GET request using Axios
  //     const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config);

  //     // Log the response to the console
  //     console.log(res);

  //     // Update state variables with data from the response
  //     setName(res.data.name);
  //     setCategory(res.data.category);
  //     setPrice(res.data.price);
  //     setImage(res.data.image);
  //   } catch (err) {
  //     // Log any errors that occur during the request
  //     console.log(err);
  //   }
  // }

  // const detailCar = async () => {
  //   try {
  //    const config = {
  //       headers: {
  //         access_token: localStorage.getItem("accessToken") ,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //     const res = await axios.get(`https://api-car-rental.binaracademy.org/admin/car/${id}`, config);
  //     console.log(res);
  //     setName(res.data.name);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
          access_token: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("price", editForm.price);
      formData.append("image", editForm.image);
      formData.append("category", editForm.category);

      const editCarResponse = await axios.put(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        config,
        formData
      );
      console.log(editCarResponse);
      navigate("/cars");
    } catch (err) {
      // console.log(err)
    }
  };

  const editImage = (e) => {
    const extend = e.target.files[0]?.type.split("/")[1];
    const allowedExten = ["png", "jpeg"];
    const allowedSize = 1024 * 1024;
    const data = e.target.files[0];

    if (!allowedExten.includes(extend)) {
      alert("File bukan gambar");
    } else if (data.size > allowedSize) {
      alert("File terlalu besar");
    } else {
      console.log(e.target.files[0]);
      editFile(e.target.files[0]);
      setEditFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <SideBar />
      <NavBar />
      <h1>EDIT CAR</h1>

      <div className="edit">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Nama/Tipe Mobil
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="input"
                name="name"
                value={editForm.name}
                placeholder="Input Nama/Tipe Mobil"
                onChange={handleEditFormChange}
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
                value={editForm.price}
                placeholder="Input Harga Sewa Mobil"
                onChange={handleEditFormChange}
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
                placeholder="Upload Foto Mobil"
                // value={image}
                onChange={editImage}
              />
              <img style={{ width: 200, height: 200 }} src={prevEditFile} />
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
                  value={editForm.category}
                  onChange={handleEditFormChange}
                  aria-label="Default select example"
                >
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
  );
};

export default EditPage;
