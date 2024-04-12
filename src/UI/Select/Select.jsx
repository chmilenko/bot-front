/* eslint-disable react/prop-types */

import { useState } from "react";

import "./Select.scss";

function SelectComponent({ className, options }) {
  const [mark, setValue] = useState();

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <select
      value={mark}
      onChange={(e) => handleOnChange(e.target.value)}
      className={`select ${className ? "" : className}`}
    >
      {options?.data?.map((option) => (
        <option key={option.id}>{option.Name}</option>
      ))}
    </select>
  );
}

export default SelectComponent;
