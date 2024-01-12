import { useState } from "react";
import "./style.css"
import { Button } from "react-bootstrap"
const ListCar = () => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        { label: "All", value: "" },
        { label: "2 - 4 people", value: "small" },
        { label: "4 - 6 people", value: "medium" },
        { label: "6 - 8 people", value: "large" },
    ];

    const handleFilter = (categoryValue) => {
        setSelectedCategory(categoryValue);
      };

    const buttonRendered = () => {
        return categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "primary" : "outline-primary"}
            className={`rounded-0 me-2 ${selectedCategory === category.value ? "active" : ""}`}
            onClick={() => handleFilter(category.value)}
          >
            {category.label}
          </Button>
        ));
    };
    
    return (
        <div>
            <div>
                <p><b>Car &gt;</b> List Car</p>
            </div>
            <div className="d-flex justify-content-between">
                <p className="h3">List Car</p>

                <Button >
                    + Add New Car
                </Button>
            </div>
            <br />
            
            <div className="d-flex gap-2 mt-2">{buttonRendered()}</div>
        </div>
    )
}

export default ListCar