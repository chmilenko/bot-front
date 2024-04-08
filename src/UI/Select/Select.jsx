import "./Select.scss";

// eslint-disable-next-line react/prop-types
function SelectComponent({ value, className, options }) {
  return (
    <select value={value} className={`select ${className ? "" : className}`}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectComponent;