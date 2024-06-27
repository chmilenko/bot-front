/* eslint-disable react/prop-types */
import { useState } from "react";

import "./Select.scss";

function SelectComponent({
  className,
  options,
  label,
  name,
  value,
  setValue,
  multiple = false,
}) {
  const handleOnChange = (event) => {
    const { options } = event.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setValue(multiple ? selectedValues : selectedValues[0]);
  };

  return (
    <label className="select-label">
      {label}
      <select
        value={value}
        onChange={handleOnChange}
        className={`select ${className ? className : ""}`}
        multiple={multiple}
      >
        {options?.data?.map((option) => (
          <option key={option.id} value={option[name]}>
            {option[name]}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectComponent;
