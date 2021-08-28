import { getFlashCards, deleteFlashCard, createFlashCard, editFlashCard } from "./httpService";
import { getNewId } from "./idService";

export async function apiGetAllFlashCards() {
  const allFlashCards = await getFlashCards("/flashcards");
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await deleteFlashCard(`/flashcards/${cardId}`);
}

export async function apiCreateFlashCard(title, description) {
  const newFlashCard = await createFlashCard("/flashcards/", {
    id: getNewId(),
    title,
    description,
  });
  return newFlashCard;
}

export async function apiEditFlashCard(cardId, title, description) {
  const EditedFlashCard = await editFlashCard(`/flashcards/${cardId}`, {
    title,
    description,
  });
  return EditedFlashCard;
}
