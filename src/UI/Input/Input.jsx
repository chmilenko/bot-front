import "./Input.scss";

// eslint-disable-next-line react/prop-types
function Input({ text, className }) {
  return (
    <input
      className={`input${className ? "" : " " + className}`}
      placeholder={text}
    />
  );
}

export default Input;
