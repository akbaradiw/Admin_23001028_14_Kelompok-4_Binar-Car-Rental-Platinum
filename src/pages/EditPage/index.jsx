import React from "react";
import SideBar from "../../components/SideBar";
import {
  Form,
  Button,
  Col,
  Row,
  Alert,
  Breadcrumb,
  Container,
} from "react-bootstrap";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../components/NavBar";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMessage } from "../../redux/message/messageSlice";


const EditPage = () => {
  const navigate = useNavigate();
  const [editFile, setEditFile] = useState(0);
  const [fixEdit, setFixEdit] = useState(false);
  const [editError, setEditError] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();



  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const cancelEdit = () => {
    setEditForm({
      name: "",
      price: "",
      image: "",
      category: "",
    });
    setFixEdit(false);
    navigate("/cars");
  }

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
        res.data.image = await onImageEdit(res.data.image);
      }
      setEditForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
    setFixEdit(true);
  };

  const editButton = async () => {
    if (editForm.image === "" ) {
      setEditError(true);
      return; 
    }
    if (editForm.name === "") {
      setFixEdit(true);
      setEditError(true);
      return; 
    }
    if (editForm.category === "") {
      setFixEdit(true);
      setEditError(true);
      return
    }

    var token = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        access_token: `${token}`,
      },
    };


    try {

      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("price", editForm.price);
      formData.append("image", editForm.image);
      formData.append("category", editForm.category);


      const editCarResponse = await axios.put(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        formData,
        config
      );
      setFixEdit(true);
        navigate("/cars");
        dispatch(setMessage({
          addMessageSuccess: true,
        }))
        setTimeout(() => {
          dispatch(setMessage({
            addMessageSuccess: false,
          }))
        }
        , 3000)
      setEditAlert(true);
    } catch (err) {
      setEditError(true);
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
    }
  };

  const onImageEdit = async (imgUrl) => {
    var imgExt = getUrlExtension(imgUrl);
    const response = await fetch(imgUrl, { mode: "no-cors" });
    const blob = await response.blob();
    const file = new File([blob], "profileImage." + imgExt, {
      type: blob.type,
    });

    return file;
  };

  const getUrlExtension = (url) => {
    return url.split(/[#?]/)[1].split(".").pop().trim();
  };

  return (
    <div>
      <div>
        <SideBar />
        <NavBar />
      </div>
      <Container className="bread-edit">
        <Breadcrumb>
          <Breadcrumb.Item> Cars </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/cars"> List Car </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit Car</Breadcrumb.Item>
        </Breadcrumb>
         
        {editError && (
          <Alert variant="danger" className="alert-seccess">
            Form tidak lengkap, Edit gagal
            </Alert>
        )}
      </Container>
      <div className="edit-title">
        <h3> Edit Car </h3>
      </div>

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
                onChange={editImage}
              />
               <p className="text-ket">*isi gambar terlebih dahulu sebelum save*</p>
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
      </div>

      <div className="edit-btn">
          <Button className="edt-cancel" onClick={cancelEdit}>Cancel</Button>
          <Button className="edt-save" onClick={editButton} disabled={!fixEdit}>
            Save
          </Button>
     
        </div>
    </div>
  );
};

export default EditPage;
