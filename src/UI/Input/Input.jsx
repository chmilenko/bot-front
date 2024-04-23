import "./Input.scss";

// eslint-disable-next-line react/prop-types
function Input({
  text,
  className,
  type,
  value,
  setValue,
  file,
  focus,
  onFocus,
}) {
  if (file) {
    return (
      <input
        className={`input${!className ? "" : "_" + className}`}
        placeholder={text}
        type={type ? type : "file"}
        onChange={(e) => setValue(e.target.files[0])}
      />
    );
  } else {
    return (
      <input
        className={`input${!className ? "" : "_" + className}`}
        placeholder={text}
        type={type ? type : "text"}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={() => onFocus(true)}
      />
    );
  }
}

export default Input;
