export const renderTableRows = (data) => {
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
