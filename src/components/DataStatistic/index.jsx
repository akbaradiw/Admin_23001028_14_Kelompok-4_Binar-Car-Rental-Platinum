import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
// import { useSelector } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./style.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const DataStatistic = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().format("YYYY-MM"));
  const [chartData, setChartData] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = "https://api-car-rental.binaracademy.org/admin/order/reports";
        const fromDate = "2024-01-01";
        const untilDate = "2024-12-31";
        const fullUrl = `${baseUrl}?from=${fromDate}&until=${untilDate}`;

        const axiosConfig = {
          headers: {
            access_token: token,
          },
        };

        const response = await axios.get(fullUrl, axiosConfig);
        const orderReports = response.data.map((report) => ({
          day: moment(report.day, "YYYY-MM-DD").format("YYYY-MM-DD"),
          orderCount: Number(report.orderCount),
        }));
        setApiData(orderReports);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (selectedMonth) {
      const selectedYear = selectedMonth.split("-")[0];
      const selectedMonthNumber = parseInt(selectedMonth.split("-")[1]);
      const daysInMonth = moment(`${selectedYear}-${selectedMonthNumber}`, "YYYY-MM").daysInMonth();
      const datesArray = Array.from({ length: daysInMonth }, (_, i) =>
        moment(`${selectedYear}-${selectedMonthNumber}-${i + 1}`).format("YYYY-MM-DD")
      );

      const chartDataMapped = datesArray.map((date) => {
        const dataForDate = apiData.find((item) => item.day === date);
        return {
          day: moment(date).format("DD"),
          orderCount: dataForDate ? dataForDate.orderCount : 0,
        };
      });

      setChartData(chartDataMapped);
    }
  }, [apiData, selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const ChartData = {
    labels: chartData.map((item) => item.day),
    datasets: [
      {
        backgroundColor: "#586B90",
        borderWidth: 1,
        data: chartData.map((item) => item.orderCount),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: "Amount of Car Rented",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        suggestedMin: 0,
        suggestedMax: 120,
        beginAtZero: true,
        ticks: {
          stepSize: 30,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleButtonClick = (e) => {
    // Add logic to execute when the button is clicked
  };

  return (
    <>
      <div className="d-flex-column">
        {/* TITLE */}
        <div className="d-flex align-items-center">
          <div className="blue-line me-2"></div>
          <h2 className="sub-text-header-dashboard mb-0">Rented Car Data Visualization</h2>
        </div>

        {/* SEARCH */}
        <div className="d-flex-column mt-4">
          <p className="text-dashboard mb-2">Month</p>
          <Form>
            <Form.Group>
              <InputGroup>
                <Form.Select
                  aria-label="Default select example"
                  name="month"
                  style={{ maxWidth: "200px" }}
                  onChange={handleMonthChange}
                  value={selectedMonth}
                >
                  <option value="">Select a month</option>
                  <option value="2024-01">January - 2024</option>
                  <option value="2024-02">February - 2024</option>
                  <option value="2024-03">March - 2024</option>
                  <option value="2024-04">April - 2024</option>
                  <option value="2024-05">May - 2024</option>
                  <option value="2024-06">June - 2024</option>
                  <option value="2024-07">July - 2024</option>
                  <option value="2024-08">August - 2024</option>
                  <option value="2024-09">September - 2024</option>
                  <option value="2024-10">October - 2024</option>
                  <option value="2024-11">November - 2024</option>
                  <option value="2024-12">December - 2024</option>
                </Form.Select>
                <Button
                  className="go"
                  style={{ backgroundColor: "#0D28A6" }}
                  onClick={handleButtonClick}
                >
                  Go
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>

        {/* DATA GRAPHIC */}
        <div style={{ marginTop: "20px" }}>
          <Bar data={ChartData} options={options} height={400} />
        </div>
        <p className="text-dashboard text-center mt-2">Date</p>
      </div>
    </>
  );
};

export default DataStatistic;
