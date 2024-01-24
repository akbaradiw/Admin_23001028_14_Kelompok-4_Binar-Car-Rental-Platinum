import React, { useState, useCallback } from "react";
import { Table, Pagination, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const TableCar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const [numOfPage, setNumOfPage] = useState([]);
  const [status, setStatus] = useState();
  const sortAscending = () => {
    if (!status) {
      const sortData = [...data];
      const result = sortData.sort((a, b) => a.amountSpent - b.amountSpent);
      setData(result);
      setStatus("ASC");
    } else if (status === "DESC") {
      const reverseData = [...data];
      setData(reverseData.reverse());
      setStatus("ASC");
    }
  };

  const sortDescending = () => {
    if (!status) {
      const sortData = [...data];
      const result = sortData.sort((a, b) => b.amountSpent - a.amountSpent);
      setData(result);
      setStatus("DESC");
    } else if (status === "ASC") {
      const reverseData = [...data];
      setData(reverseData.reverse());
      setStatus("DESC");
    }
  };

  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }

  const itemsPerPage = limit;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const fetchData = async (pageIndex, pageSize, sortBy) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/v2/order?sort=${sortBy}&page=${pageIndex}&pageSize=${pageSize}`,
        {
          headers: {
            access_token: token,
          },
        }
      );
      setCurrentPage(response.data.page);
      setLimit(response.data.pageSize);
      setPageCount(response.data.pageCount);
      setData(response.data.orders);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, itemsPerPage, sortOrder);
  }, [currentPage, itemsPerPage, sortOrder]);

  const initPageNumbers = useCallback((current, totalPage) => {
    const pageNumbers = [];
    const shownPageNumbers = 9;
    let fromNumber = current;

    let minPageNumber = totalPage - (shownPageNumbers - 1);
    if (shownPageNumbers > totalPage) minPageNumber = 1;

    if (current > minPageNumber) {
      fromNumber = Math.min(current, minPageNumber);
    }

    for (let i = fromNumber; i <= totalPage; i++) {
      if (pageNumbers.length < shownPageNumbers) {
        pageNumbers.push(i);
      } else {
        pageNumbers.push({
          ellipsis: true,
          page: totalPage - shownPageNumbers,
        });
        pageNumbers.push(totalPage);
        break;
      }
    }

    if (totalPage > shownPageNumbers && !pageNumbers.includes(shownPageNumbers)) {
      pageNumbers.unshift({
        ellipsis: true,
        page: pageNumbers.length,
      });
      pageNumbers.unshift(1);
    }
    setNumOfPage(pageNumbers);
  }, []);

  useEffect(() => {
    initPageNumbers(currentPage + 1, pageCount);
  }, [initPageNumbers, currentPage, pageCount]);

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
                User Email{""}
                <FontAwesomeIcon
                  icon={faSort}
                  onClick={() => sortAscending("email") || sortDescending("email")}
                />
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-head-table">
                Car{" "}
                <FontAwesomeIcon
                  icon={faSort}
                  onClick={() => sortAscending("car_name") || sortDescending("car_name")}
                />
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-he*0/*/ad-table">
                Start Rent{" "}
                <FontAwesomeIcon
                  icon={faSort}
                  onClick={() => sortAscending("start_rent") || sortDescending("start_rent")}
                />
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-head-table">
                Finish Rent{" "}
                <FontAwesomeIcon
                  icon={faSort}
                  onClick={() => sortAscending("finish_rent") || sortDescending("finish_rent")}
                />
              </th>
              <th style={{ backgroundColor: "#cfd4ed" }} className="text-head-table">
                Price{" "}
                <FontAwesomeIcon
                  icon={faSort}
                  onClick={() => sortAscending("price") || sortDescending("price")}
                />
              </th>
              <th
                style={{ backgroundColor: "#cfd4ed", minWidth: "10%" }}
                className="text-head-table"
              >
                Category{" "}
                <FontAwesomeIcon
                  icon={faSort}
                  onClick={() => sortAscending("category") || sortDescending("category")}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.User.email}</td>
                <td>{row.Car ? row.Car.name : "Car"}</td>
                <td>{moment(row.start_rent_at).format("DD MMMM YYYY")}</td>
                <td>{moment(row.finish_rent_at).format("DD MMMM YYYY")}</td>
                <td>{formatRupiah(row.total_price)}</td>
                <td>{row.Category ? row.Category.name : "Category"}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="d-flex-column" style={{ width: "70px" }}>
              <p className="text-dashboard mb-2">Limit</p>
              <Form>
                <Form.Group controlId="limitDropdown">
                  <Form.Select
                    value={limit}
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value, 10));
                    }}
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
                      onChange={(e) => setCurrentPage(e.target.value)}
                      // value={selectedMonth}
                    >
                      <option value="">Select page</option>

                      {Array.from({ length: pageCount }).map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </Form.Select>
                    <Button className="go" style={{ backgroundColor: "#0D28A6" }}>
                      Go
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div className="d-flex my-4">
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev
                onClick={() => setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))}
              />
              {numOfPage.map((val, idx) => {
                if (typeof val === "number") {
                  return (
                    <Pagination.Item
                      key={idx}
                      active={currentPage === val}
                      onClick={() => setCurrentPage(val)}
                    >
                      {val}
                    </Pagination.Item>
                  );
                } else {
                  return <Pagination.Ellipsis key={idx} onClick={() => setCurrentPage(val.page)} />;
                }
              })}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage(currentPage < pageCount ? currentPage + 1 : pageCount)
                }
              />
              <Pagination.Last onClick={() => setCurrentPage(pageCount)} />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableCar;
