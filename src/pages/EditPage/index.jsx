import React from "react";
import SideBar from "../../components/SideBar";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const EditPage = () => {
  const navigate = useNavigate();
  const [editFile, setEditFile] = useState(0);
  const [lock, setLock] = useState({});
  const [toastAlert, setToastAlert] = useState(false);
  const message = useSelector((state) => state.messages);
  const { id } = useParams();

  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    carDetail();
  }, []);

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
      if (res.data.image != null) {
        res.data.image = await onImageEdit(res.data.image)
      }
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

  const editButton = async () => {
    // console.log(editForm);
    // kalau misal error form datanya pindah ke atas config
    var token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: `${token}`,
      },
    };

    console.log(editForm);

    try {
      // const config = {
      //   headers: {
      //     access_token: localStorage.getItem("accessToken"),
      //     "Content-Type": "multipart/form-data",
      //   },
      // };

      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("price", editForm.price);
      formData.append("image", editForm.image);
      formData.append("category", editForm.category);

      // console.log(formData);

      const editCarResponse = await axios.put(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        formData,
        config
      );
      console.log(editCarResponse);
      navigate("/cars");
      setToastAlert(true);
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
      setEditForm({
        ...editForm,
        image: data,
      });
      editFile(URL.createObjectURL(e.target.files[0]));
      setLock({ ...lock, image: e.target.files[0] });   
    }
  };

    const onImageEdit = async (imgUrl) => {
      var imgExt = getUrlExtension(imgUrl);
      const response = await fetch(imgUrl, {mode: 'no-cors'});
      const blob = await response.blob();
      const file = new File([blob], "profileImage." + imgExt, {
        type: blob.type,
      });

      return file;
  }

  const getUrlExtension = (url) => {
    return url
      .split(/[#?]/)[1]
      .split(".")
      .pop()
      .trim();
  }

  return (
    <div>
      <SideBar />
      <NavBar />
      <h1>EDIT CAR</h1>
      
      {toastAlert && (
              <Alert variant="success" className="alert-seccess">
                Berhasil Edit Data
              </Alert>
            )}
      
         {message.deleteMessageSuccess && (
        <div className="d-flex justify-content-center">
          <div className="success-delete"><b>Data Berhasil Dihapus</b></div>
        </div>
      )}

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
              {/* <img style={{ width: 200, height: 200 }} src={prevEditFile} /> */}
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
                  value={editForm.category}
                  onChange={handleEditFormChange}
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
        <Button onClick={editButton}>klik</Button>
      </div>
    </div>
  );
};

export default EditPage;
