import { getNewId } from "../service/idService";

export default function TextArea({
  id = getNewId(),
  labelDescription = "Descrição da Label:",
  textAreaValue = "Valor padrão do input",
  onTextAreaChange = null,
  maxLength = 230,
  rows = 4,
}) {
  function handleTextAreaValueChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = textAreaValue.length;

  return (
    <div className="flex flex-col my-4">
      <label className="text-sm mb-1" htmlFor={id}>
        {labelDescription}
      </label>
      <textarea
        maxLength={maxLength}
        rows={rows}
        id={id}
        className="border p-1"
        type="text"
        value={textAreaValue}
        onChange={handleTextAreaValueChange}
      />
      <div className="text-right mr-1 text-sm">
        <span>{currentCharacterCount} de {maxLength} caracteres</span>
      </div>
    </div>
  );
}
