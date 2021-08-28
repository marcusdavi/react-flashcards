import { getNewId } from "../service/idService";

export default function RadioButton({
  id = getNewId(),
  name = "radioButtonName",
  radioButtonChecked = false,
  children: radioButtonDescription = "Descrição do RadioButton",
  onRadioButtonClick = null,
}) {
  function handleRadioButtonChange() {
    if (onRadioButtonClick) {
      onRadioButtonClick();
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2">
      <input
        id={id}
        type="radio"
        name={name}
        checked={radioButtonChecked}
        onChange={handleRadioButtonChange}
      />
      <label htmlFor={id}>{radioButtonDescription}</label>
    </div>
  );
}
