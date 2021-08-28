export default function Button({
  children: description = "Descrição do botão",
  onButtonClick = null,
  colorClass = "bg-gray-200",
  type = "button",
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <button
      className={`${colorClass} p-2 m-1 rounded-md`}
      type={type}
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}
