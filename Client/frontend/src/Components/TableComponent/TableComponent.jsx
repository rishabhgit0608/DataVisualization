import { UI_TEXT } from "../../constants";
import { renderTableRows } from "../../utils";

// eslint-disable-next-line react/prop-types
export const TableComponent = ({ offset, handleSort, data }) => {
  return (
    <>
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
        <tbody>{renderTableRows(data)}</tbody>
      </table>
    </>
  );
};
