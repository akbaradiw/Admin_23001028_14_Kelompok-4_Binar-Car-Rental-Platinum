import { useEffect, useState } from "react";
import "./style.css";
import { Button, Container, Row } from "react-bootstrap";
import CarCard from "../CarCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import getCarsAPI from "../../api/getListCar";
import { getCars } from "../../redux/cars/carSlice";
import { useNavigate } from "react-router-dom";

const ListCar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const cars = useSelector((state) => state.cars);
  const message = useSelector((state) => state.messages);
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    handleQueryParam()

  }, [])

  const handleQueryParam = () => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category)
    } 
  }
  
  const categories = [
    { label: "All", value: "" },
    { label: "2 - 4 people", value: "small" },
    { label: "4 - 6 people", value: "medium" },
    { label: "6 - 8 people", value: "large" },
  ];

  const handleFilter = async (categoryValue) => {
    try {
      const list_car = await getCarsAPI(categoryValue)
      dispatch(getCars(list_car))
      setSelectedCategory(categoryValue);
      setSearchParams({category: categoryValue})
    } catch (error) {
      console.log(error)
    }
  };

  const buttonRendered = () => {
    return categories.map((category) => (
      <Button
        key={category.value}
        variant={
          selectedCategory === category.value ? "primary" : "outline-primary"
        }
        className={`rounded-0 me-2 ${
          selectedCategory === category.value ? "active" : ""
        }`}
        onClick={() => handleFilter(category.value)}
      >
        {category.label}
      </Button>
    ));
  };

  return (
    <div className="mt-5">
      <div>
        <p>
          <b>Car &gt;</b> List Car
        </p>
      </div>
      {message.deleteMessageSuccess && (
        <div className="d-flex justify-content-center">
          <div className="success-delete"><b>Data Berhasil Dihapus</b></div>
        </div>
      )}
       {message.addMessageSuccess && (
        <div className="d-flex justify-content-center">
          <div className="success-add"><b>Data Berhasil Disimpan</b></div>
        </div>
      )}
      
      <div className="d-flex justify-content-between">
        <p className="h3">List Car</p>

        <Button onClick={() => navigate("/add")}>+ Add New Car</Button>
      </div>
      <br />

      <div className="d-flex gap-2 mt-2">{buttonRendered()}</div>

      <div className="mt-3">
        <div className="row">
          {
            cars.list_car.length > 0 ? (
              cars.list_car.map((car, index) => (
                <div className="col-4 mb-4" key={index}>
                  <CarCard car={car} />
                </div>
              ))) : (
                <div className="col-12 text-center">
                  <h1>Data Tidak Ditemukan</h1>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default ListCar;
