/* eslint-disable react/prop-types */
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
