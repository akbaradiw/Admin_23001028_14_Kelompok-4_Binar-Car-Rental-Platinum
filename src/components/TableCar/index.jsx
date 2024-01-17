import React, { useState } from "react";
import { Table, Pagination, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const TableCar = () => {
  const [sortOrder, setSortOrder] = useState(null);

  const handleSortClick = () => {
    // setSortOrder((prevSortOrder) => {
    //   if (prevSortOrder === "asc") return "desc";
    //   else return "asc";
    // });
  };

  return (
    <>
      <div className="d-flex-column" style={{ maxHeight: "100vh", marginTop: "80px" }}>
        <h3 className="title-dashboard">Dashboard</h3>
        <div className="d-flex align-items-center mt-4">
          <div className="blue-line me-2"></div>
          <h2 className="sub-text-header-dashboard mb-0">List Order</h2>
        </div>

        {/* TABLE */}
        <Table striped bordered hover className="my-4">
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#cfd4ed",
                  width: "20px",
                  textAlign: "center",
                }}
                className="text-head-table"
              >
                No
              </th>
              <th
                style={{ backgroundColor: "#cfd4ed", marginRight: "100px" }}
                className="text-head-table"
              >
                User Email{" "}
                {sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faSortUp} onClick={handleSortClick} />
                ) : (
                  sortOrder === "desc" && (
                    <FontAwesomeIcon icon={faSortDown} onClick={handleSortClick} />
                  )
                )}
                {!sortOrder && <FontAwesomeIcon icon={faSort} onClick={handleSortClick} />}
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-head-table">
                Category{" "}
                {sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faSortUp} onClick={handleSortClick} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} onClick={handleSortClick} />
                )}
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-head-table">
                Start Rent{" "}
                {sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faSortUp} onClick={handleSortClick} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} onClick={handleSortClick} />
                )}
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-head-table">
                Finish Rent{" "}
                {sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faSortUp} onClick={handleSortClick} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} onClick={handleSortClick} />
                )}
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-head-table">
                Price{" "}
                {sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faSortUp} onClick={handleSortClick} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} onClick={handleSortClick} />
                )}
              </th>
              <th
                style={{ backgroundColor: "#cfd4ed", minWidth: "10%" }}
                className="text-head-table"
              >
                Category{" "}
                {sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faSortUp} onClick={handleSortClick} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} onClick={handleSortClick} />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {displayedData.map((row, index) => ( */}
            <tr>
              <td style={{ width: "20px", textAlign: "center" }}>1</td>
              <td>User Email</td>
              <td>Car</td>
              <td>Start Rent</td>
              <td>Finish Rent</td>
              <td>Price</td>
              <td>Category</td>
            </tr>
            {/* ))} */}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="d-flex-column" style={{ width: "70px" }}>
              <p className="text-dashboard mb-2">Limit</p>
              <Form>
                <Form.Group controlId="limitDropdown">
                  <Form.Select
                  // value={limit}
                  // onChange={(e) => {
                  //   setLimit(parseInt(e.target.value, 10));
                  //   setCurrentPage(1);
                  // }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </div>
            <div className="d-flex-column ms-3" style={{ width: "200px" }}>
              <Form>
                <Form.Group>
                  <p className="text-dashboard mb-2">Jump to page</p>
                  <InputGroup>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ maxWidth: "500px" }}
                      // onChange={handleMonthChange}
                      // value={selectedMonth}
                    >
                      {/* <option value="">Select a month</option> */}
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </Form.Select>
                    <Button
                      className="go"
                      style={{ backgroundColor: "#0D28A6" }}
                      // onClick={handleButtonClick}
                    >
                      Go
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="d-flex my-4">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev
              // onClick={() => setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))}
              />
              {/* {Array.from({ length: Math.ceil(data.length / limit) }).map((page, index) => ( */}
              <Pagination.Item
              // key={index}
              // active={currentPage === index + 1}
              // onClick={() => setCurrentPage(index + 1)}
              >
                {/* {index + 1}  */}
              </Pagination.Item>
              {/* ))} */}
              <Pagination.Next
              // onClick={() =>
              //   setCurrentPage((prevPage) =>
              //     prevPage < Math.ceil(data.length / limit) ? prevPage + 1 : prevPage
              //   )
              // }
              />
              <Pagination.Last />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableCar;
