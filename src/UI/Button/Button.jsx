import "./Button.scss";

// eslint-disable-next-line react/prop-types
function Button({ className, onClick, text }) {
  return (
    <button
      className={className ? `btn_${className}` : "btn"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
