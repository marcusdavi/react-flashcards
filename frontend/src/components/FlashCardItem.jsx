import React from "react";
import {
  AiOutlineEdit as EditIcon,
  AiOutlineDelete as DeleteIcon,
} from "react-icons/ai";

export default function FlashCardItem({
  children: flashCard,
  onDelete = null,
  onEdit = null,
}) {
  const { title, description } = flashCard;

  function handleDeleteIconClick() {
    if (onDelete) {
      onDelete(flashCard.id);
    }
  }

  function handleEditIconClick() {
    if (onEdit) {
      onEdit(flashCard);
    }
  }

  return (
    <div className="border p-2 m-2">
      <ul>
        <li>
          <strong>Título:</strong> <span>{title}</span>
        </li>
        <li>
          <strong>Descrição:</strong> <span>{description}</span>
        </li>
      </ul>
      <div className="mt-4 flex flex-row items-center justify-end space-x-4">
        <EditIcon
          className="cursor-pointer"
          size={24}
          onClick={handleEditIconClick}
        />
        <DeleteIcon
          className="cursor-pointer"
          size={24}
          onClick={handleDeleteIconClick}
        />
      </div>
    </div>
  );
}
