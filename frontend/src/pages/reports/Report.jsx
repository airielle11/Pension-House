import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportComponent = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to handle report generation
  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    if (startDate > endDate) {
      alert("Start date cannot be after the end date.");
      return;
    }
  
    // Convert dates to yyyy-mm-dd format
    const start_date = startDate.toISOString().split("T")[0];
    const end_date = endDate.toISOString().split("T")[0];
  
    try {
      // Construct the URL with query parameters
      const url = `http://127.0.0.1:8000/generate-report/?start_date=${start_date}&end_date=${end_date}`;
  
      // Make a GET request without a body
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Handle the response
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "item_demand_report.pdf";
        link.click();
      } else {
        alert("Error generating report. Please try again.");
      }
    } catch (error) {
      alert("Error generating report: " + error.message);
    }
  };
  

  return (
    <div className="report-container">
      <style>
        {`
          .report-container {
            padding: 20px;
            max-width: 400px;
            margin: 5%;
          }
          .custom-datepicker {
            width: 200%;
            height: 50px;
            font-size: 18px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
          }
          .custom-datepicker::placeholder {
            font-size: 16px;
            color: #aaa;
          }
          .generate-report-button {
            padding: 15px 20px;
            background: linear-gradient(to right, #4facfe, #00f2fe);
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            width: 50%;
            margin-top: 10px;
          }
        `}
      </style>
      <h2>Generate Report</h2>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="start-date" style={{ display: "block", marginBottom: "8px" }}>
          Start Date:
        </label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
          className="custom-datepicker" // Apply custom styles
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="end-date" style={{ display: "block", marginBottom: "5px" }}>
          End Date:
        </label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
          className="custom-datepicker" // Apply custom styles
        />
      </div>
      <button
        onClick={handleGenerateReport} // Calls handleGenerateReport function when clicked
        className="generate-report-button" // Apply custom styles
      >
        Generate Report
      </button>
    </div>
  );
};

export default ReportComponent;
