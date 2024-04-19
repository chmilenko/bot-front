/* eslint-disable react/prop-types */
import { useState } from "react";

import "./combined.scss";

function Combined({ options, value, setValue }) {


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        list="options-list"
        placeholder="Выбрать бренд"
        className="combined"
      />
      <datalist id="options-list">
        {options?.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </datalist>
    </div>
  );
}

export default Combined;
