/* eslint-disable react/prop-types */
import { UI_TEXT } from "../../constants";
import { LogoutPage } from "../LogoutComponent/LogoutPage";

export const HeaderComponent = ({
  handleFilterChange,
  setFilters,
  filters,
  offset,
  handleOffsetChange,
}) => {
  return (
    <>
      <h1>{UI_TEXT.title}</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <LogoutPage></LogoutPage>
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
    </>
  );
};
