import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { gapi } from "gapi-script";
import { UI_TEXT } from "./constants";
import { GoogleLogout } from "react-google-login";

function App() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();

  const clientId =
    "470744419321-pe1mc1ts8ghtnv7qs8brviqo7a88vcna.apps.googleusercontent.com";

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, [clientId]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/processdata?page_size=${offset}&page_number=${pageNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTotalRows(data.total_rows);
      });
  }, [offset, pageNumber]);

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber * offset < totalRows) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleOffsetChange = (e) => {
    const newOffset = parseInt(e.target.value);
    setOffset(newOffset);
    setPageNumber(1); // Reset to page 1 when offset changes
  };

  const logoutSuccess = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{UI_TEXT.title}</h1>
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logoutSuccess}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="offsetSelect" className="form-label">
          {UI_TEXT.rowsPerPageLabel}
        </label>
        <select
          className="form-select"
          id="offsetSelect"
          value={offset}
          onChange={handleOffsetChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{UI_TEXT.headers.category}</th>
            <th>{UI_TEXT.headers.discount}</th>
            <th>{UI_TEXT.headers.manufacturer}</th>
            <th>{UI_TEXT.headers.price}</th>
            <th>{UI_TEXT.headers.productName}</th>
            <th>{UI_TEXT.headers.quantity}</th>
            <th>{UI_TEXT.headers.rating}</th>
            <th>{UI_TEXT.headers.region}</th>
            <th>{UI_TEXT.headers.tax}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Category}</td>
              <td>{item.Discount}</td>
              <td>{item.Manufacturer}</td>
              <td>{item.Price}</td>
              <td>{item["Product Name"]}</td>
              <td>{item.Quantity}</td>
              <td>{item.Rating !== null ? item.Rating : "N/A"}</td>
              <td>{item.Region}</td>
              <td>{item.Tax}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={handlePrevious}
          disabled={pageNumber === 1}
        >
          {UI_TEXT.previousButton}
        </button>
        <span>
          {UI_TEXT.pageLabel} {pageNumber}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={pageNumber * offset >= totalRows}
        >
          {UI_TEXT.nextButton}
        </button>
      </div>
    </div>
  );
}

export default App;
