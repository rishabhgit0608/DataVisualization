import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [offset, setOffset] = useState(10);
  useEffect(() => {
    fetch(
      `http://127.0.0.1:5000/processdata?page_size=${offset}&page_number=${pageNumber}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [pageNumber]);
  console.log(data);
  return <></>;
}

export default App;
