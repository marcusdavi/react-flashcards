import Button from "./Button";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import { useEffect, useState } from "react";
import Error from "./Error";

export default function FlashCardForm({ createMode = true, onPersist = null, children: flashCard = null }) {
  const [title, setTitle] = useState(flashCard?.title || '');
  const [description, setDescription] = useState(flashCard?.description || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if(createMode){
      setTitle('');
      setDescription('');
    }
  }, [createMode])

  function handleInputChange(newInputValue) {
    setTitle(newInputValue);
    clearError();
  }

  function handleTextAreaChange(newTextAreaValue) {
    setDescription(newTextAreaValue);
    clearError();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError('Preencha o Título e a Descrição.');
    }
  }

  function handleFormReset(event) {
    clearFields();
  }

  function validateForm() {
    return (title.trim() !== '' && description.trim() !== '');
  }

  function clearFields() {
    setTitle('');
    setDescription('');
    clearError();
  }

  function clearError() {
    setError('');
  }

  const backgroundClassName = createMode ? "bg-green-100" : "bg-yellow-100";
  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">Manutenção de FlashCards</h2>
      <TextInput
        labelDescription="Titulo: "
        inputValue={title}
        onInputChange={handleInputChange}
      />
      <TextArea
        labelDescription="Descrição: "
        textAreaValue={description}
        onTextAreaChange={handleTextAreaChange}
      />
      <div className="flex items-center justify-between">  
        {error.trim() !== '' ? <Error>{error}</Error> : <span>&nbsp;</span>}
        <div>
        <Button colorClass="bg-red-200" type="reset">
          Limpar
        </Button>
        <Button colorClass="bg-green-200" type="submit">
          Salvar
        </Button>
        </div>
      </div>
    </form>
  );
}
