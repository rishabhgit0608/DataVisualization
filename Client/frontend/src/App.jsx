/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { HeaderComponent } from "./Components/HeaderComponent/HeaderComponent";
import { TableComponent } from "./Components/TableComponent/TableComponent";
import TableFooter from "./Components/TableComponent/TableFooter";
import Loader from "./Components/Loader/Loader";
function App() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    search: "",
  });
  const [sortType, setSortType] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetchData();
  }, [pageNumber, offset, sortType, sortDirection]);

  const fetchData = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
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

  return (
    <div className="container mt-5">
      <HeaderComponent
        setFilters={setFilters}
        offset={offset}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleOffsetChange={handleOffsetChange}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <TableComponent data={data} handleSort={handleSort} offset={offset} />
      )}
      <TableFooter
        offset={offset}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalRows={totalRows}
      />
    </div>
  );
}

export default App;
