import "./combined.scss";

function Combined({ options, value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange} className="combined">
      <option value="" disabled>
        Выбрать статус
      </option>
      {options?.map((option) => (
        <option key={option.id} value={option.id} className="option">
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Combined;
