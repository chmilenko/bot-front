/* eslint-disable react/prop-types */
import "./table.scss";
function Table({ thead, tbody }) {
  return (
    <table>
      <thead>
        {thead.map((head, i) => (
          <th key={i}>{head.name}</th>
        ))}
      </thead>
      <tbody>{tbody}</tbody>
    </table>
  );
}

export default Table;
