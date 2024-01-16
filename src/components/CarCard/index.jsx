import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Card, Button, Row, Container } from "react-bootstrap/";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import { Modal } from "react-bootstrap/";
import modalImages from '../../assets/modal.png'
import { useDispatch } from "react-redux";
import { getCars } from "../../redux/cars/carSlice";
import getCarsAPI from "../../api/getListCar";
import { setMessage } from "../../redux/message/messageSlice";
import { useNavigate } from "react-router-dom";
import imageCarDummy from "../../assets/bannerlogin.png"


const CarCard = ({ car }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getCarsData = async () => {
    try {
        const response = await getCarsAPI();
        dispatch(getCars(response));
    } catch (error) {
        console.error(error);
    }
}

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCar = (car) => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteCar(id),
      await getCarsData()
      handleCloseDeleteConfirmation()
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCar = async (id) => {
    try {
      await axios.delete(`https://api-car-rental.binaracademy.org/admin/car/${id}`, {
        headers: {
          access_token: localStorage.getItem("accessToken"),
        },
      });
      dispatch(setMessage({
        deleteMessageSuccess: true,
        deleteMessageError: false
      }));
      setTimeout(() => {
        dispatch(setMessage({
          deleteMessageSuccess: false,
          deleteMessageError: false
        }));
      }, 2000);
    } catch (error) {
      console.error("Error deleting car:", error);
      dispatch(setMessage({
        deleteMessageSuccess: false,
        deleteMessageError: true
      }));
      setTimeout(() => {
        dispatch(setMessage({
          deleteMessageSuccess: false,
          deleteMessageError: false
        }));
      }, 2000);
    }
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const convertCapacity = (capacity) => {
    if (capacity === "small") {
      return "2 - 4 People";
    } else if (capacity === "medium") {
      return "4 - 6 People";
    }
    return "6 - 8 People";
  };

  const convertDate = (date) => {
    return moment(date).format("DD MMM YYYY, HH:mm");
  };

  return (
    <>
      <Card className="">
        {
          car.image === null ? (
            <Card.Img src={imageCarDummy} variant="top" style={{ height: "250px" }}/>
          ) : (
            <Card.Img src={car.image} variant="top" style={{ height: "250px" }}/>
          )
        }
        <Card.Body>
          <Card.Text>{car.name}</Card.Text>
          <Card.Title>{rupiah(car.price)}</Card.Title>
          <Card.Text className="d-flex gap-2 align-items-center mb-1">
            <i className="bi bi-people h5"></i>
            <p className="m-0">{convertCapacity(car.category)}</p>
          </Card.Text>

          <Card.Text className="d-flex gap-2 align-items-center">
            <i className="bi bi-clock-history h5"></i>
            <p className="m-0">Updated at {convertDate(car.updatedAt)} </p>
          </Card.Text>

          <div className="row">
            <div className="col-6">
              <Button variant="outline-danger" className="button-100" onClick={() => handleDeleteCar()}>
                Delete
              </Button>
            </div>
            <div className="col-6">
              <Button onClick={() => navigate(`/edit/${car.id}`)} variant="success" className="button-100">
                Edit
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showDeleteConfirmation}
        onHide={handleCloseDeleteConfirmation}
        centered
      >
        <Modal.Body className="text-center px-5 align-middle">
          <img
            src={modalImages}
            alt="Gambar"
            style={{ width: "153px", height: "121px" }}
          />
          <h5 className="mt-3">Menghapus Data Mobil</h5>
          <p className="mb-0">
            Setelah dihapus, data mobil tidak 
            dapat
          </p>
          <p>dikembalikan. Yakin ingin
            menghapus?
          </p>
          <div className="d-flex justify-content-center ">
            <Button
              variant="primary"
              className="me-2"
              style={{ width: "87px", height: "36px" }}
              onClick={() => handleConfirmDelete(car.id)}
            >
              <b>Ya</b>
            </Button>
            <Button
              variant="outline-primary"
              style={{ width: "87px", height: "36px" }}
              onClick={() => handleCloseDeleteConfirmation()}
            >
              <b>Tidak</b>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CarCard;
