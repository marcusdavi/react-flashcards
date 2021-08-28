import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://marcusdavi-flashcards.glitch.me/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function getFlashCards(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function deleteFlashCard(url) {
  await axiosInstance.delete(url);
}

export async function createFlashCard(url, object) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}

export async function editFlashCard(url, object) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}