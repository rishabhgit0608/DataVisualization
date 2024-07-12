import { UI_TEXT } from "../../constants";

// eslint-disable-next-line react/prop-types
const TableFooter = ({ setPageNumber, pageNumber, totalRows, offset }) => {
  return (
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
  );
};
export default TableFooter;
