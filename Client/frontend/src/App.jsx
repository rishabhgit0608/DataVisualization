import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { UI_TEXT } from "./constants";

function App({ setIsLoggedIn }) {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const navigate = useNavigate();

  const clientId =
    "470744419321-pe1mc1ts8ghtnv7qs8brviqo7a88vcna.apps.googleusercontent.com";
  const [filters, setFilters] = useState({
    type: "",
    search: "",
  });
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

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
    fetchData();
  }, [pageNumber, offset, sortType, sortDirection]);

  const fetchData = () => {
    let url = `http://127.0.0.1:5000/processdata?page_size=${offset}&page_number=${pageNumber}`;
    if (filters.type && filters.search) {
      url += `&type=${filters.type}` + `&search=${filters.search}`;
    }

    if (sortType && sortDirection) {
      url += `&sort=${sortType}&sort_direction=${sortDirection}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTotalRows(data.total_rows);
      });
  };

  const handleFilterChange = () => {
    setPageNumber(1);
    fetchData();
  };

  const handleSort = (type) => {
    if (type === sortType) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortDirection("asc");
    }
  };

  const handleOffsetChange = (e) => {
    const newOffset = parseInt(e.target.value);
    setOffset(newOffset);
    setPageNumber(1);
  };

  const renderTableRows = () => {
    return data.map((item, index) => (
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
    ));
  };
  const logoutSuccess = () => {
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <div className="container mt-5">
      <h1>{UI_TEXT.title}</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logoutSuccess}
        />
      </div>
      <div className="mb-3 d-flex">
        <div className="w-20 me-3">
          <label htmlFor="filters" className="form-label">
            Filter by:
          </label>
          <select
            className="form-select"
            id="filters"
            name="type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Select Filter</option>
            <option value="Category">Category</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Region">Region</option>
          </select>
        </div>
        <div className="w-80">
          <label htmlFor="searchFilter" className="form-label">
            Search:
          </label>
          <input
            type="text"
            className="form-control"
            id="searchFilter"
            name="search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <button className="btn btn-primary ms-3" onClick={handleFilterChange}>
          Search
        </button>
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
      <table
        className={`table table-bordered ${
          offset > 10 ? "table-scrollable" : ""
        }`}
      >
        <thead>
          <tr>
            <th onClick={() => handleSort(`Category`)}>
              {UI_TEXT.headers.category}
            </th>
            <th>{UI_TEXT.headers.discount}</th>
            <th onClick={() => handleSort("Manufacturer")}>
              {UI_TEXT.headers.manufacturer}
            </th>
            <th onClick={() => handleSort("Price")}>{UI_TEXT.headers.price}</th>
            <th>{UI_TEXT.headers.productName}</th>
            <th>{UI_TEXT.headers.quantity}</th>
            <th onClick={() => handleSort("Rating")}>
              {UI_TEXT.headers.rating}
            </th>
            <th onClick={() => handleSort("Region")}>
              {UI_TEXT.headers.region}
            </th>
            <th>{UI_TEXT.headers.tax}</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          {UI_TEXT.previousButton}
        </button>
        <span>
          Page {pageNumber} of {Math.ceil(totalRows / offset)}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber * offset >= totalRows}
        >
          {UI_TEXT.nextButton}
        </button>
      </div>
    </div>
  );
}

export default App;
