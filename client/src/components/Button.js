function Button({
  text,
  textColor,
  bgColor,
  onClick,
  fullWidth,
  icBefore,
  icAfter,
}) {
  return (
    <button
      type="button"
      className={`py-2 px-4 ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md gap-1 flex items-center justify-center text-[-16]`}
      onClick={onClick}
    >
      {icBefore && <span>{icBefore}</span>}
      {text}
      {icAfter && <span>{icAfter}</span>}
    </button>
  );
}

export default Button;
