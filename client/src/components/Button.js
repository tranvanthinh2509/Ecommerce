function Button({
  text,
  textColor,
  bgColor,
  onClick,
  fullWidth,
  icBefore,
  icAfter,
  active,
}) {
  return (
    <button
      type="button"
      className={`py-2 px-4 text-[-16] ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md gap-1 flex items-center justify-center  ${
        active ? "underline" : ""
      }`}
      onClick={onClick}
    >
      {icBefore && <span>{icBefore}</span>}
      {text}
      {icAfter && <span>{icAfter}</span>}
    </button>
  );
}

export default Button;
