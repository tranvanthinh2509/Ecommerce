function Button({ text, textColor, bgColor, onClick, fullWidth }) {
  return (
    <button
      type="button"
      className={`py-2 px-4 ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
