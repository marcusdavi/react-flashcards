import { useEffect, useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/Header";
import Main from "../components/Main";
import FlashCard from "../components/FlashCard";
import {
  apiCreateFlashCard,
  apiDeleteFlashCard,
  apiEditFlashCard,
  apiGetAllFlashCards,
} from "../service/apiService";
import FlashCards from "../components/FlashCards";
import Button from "../components/Button";
import { helperShuffleArray } from "../helpers/arrayHelpers";
import RadioButton from "../components/RadioButton";
import Loading from "../components/Loading";
import Error from "../components/Error";
import FlashCardItem from "../components/FlashCardItem";
import FlashCardForm from "../components/FlashCardForm";

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonshowTitle, setRadioButtonShowTitle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  useEffect(() => {
    async function gelAllCards() {
      try {
        const apiCards = await apiGetAllFlashCards();
        setAllCards(apiCards);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    }
    gelAllCards();
  }, []);

  useEffect(() => {
    setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  function handleRadioShowTitle() {
    const updateCards = [...studyCards];
    updateCards.map((card) => {
      return (card.showTitle = true);
    });
    setStudyCards(updateCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescription() {
    const updateCards = [...studyCards];
    updateCards.map((card) => {
      return (card.showTitle = false);
    });
    setStudyCards(updateCards);
    setRadioButtonShowTitle(false);
  }

  function handleToggleFlashCard(cardId) {
    const updateCards = [...studyCards];
    const cardIndex = updateCards.findIndex((card) => card.id === cardId);
    updateCards[cardIndex].showTitle = !updateCards[cardIndex].showTitle;

    setStudyCards(updateCards);
  }

  async function handleDeleteFlashCard(cardId) {
    try {
      //BackEnd
      await apiDeleteFlashCard(cardId);

      //FrontEnd
      setAllCards(allCards.filter((card) => card.id !== cardId));
      setError('');
      toast.success("Card excluído com sucesso.")
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  async function handlePersist(title, description) {
    if (createMode) {
      try {
        //BackEnd
        const newFlashCard = await apiCreateFlashCard(title, description);
        //FrontEnd
        setAllCards([...allCards, newFlashCard]);
        setError('');
        toast.success(`Card "${title}" incluído com sucesso.`)
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        //BackEnd
        await apiEditFlashCard(selectedFlashCard.id, title, description);

        //FrontEnd
        setAllCards(
          allCards.map((card) => {
            if (card.id === selectedFlashCard.id) {
              console.log({ ...card, title, description });
              return { ...card, title, description };
            }
            return card;
          })
        );
        setCreateMode(true);
        setSelectedFlashCard(null);
        setError('');
        toast.success(`Card "${title}" alterado com sucesso.`)
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map((flashCard, index) => {
              return (
                <FlashCardItem
                  key={index}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>
                Novo flash card
              </Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>

          <TabPanel>
            <div className="text-center mb-4">
              <Button onButtonClick={handleShuffle}>Embaralhar Cards</Button>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4 m-4">
              <RadioButton
                id="radioButtonShowTitle"
                name="showInfo"
                radioButtonChecked={radioButtonshowTitle}
                onRadioButtonClick={handleRadioShowTitle}
              >
                Mostrar título
              </RadioButton>
              <RadioButton
                id="radioButtonShowDescription"
                name="showInfo"
                radioButtonChecked={!radioButtonshowTitle}
                onRadioButtonClick={handleRadioShowDescription}
              >
                Mostrar descrição
              </RadioButton>
            </div>
            <FlashCards>
              {studyCards.map((fc) => {
                return (
                  <FlashCard
                    id={fc.id}
                    key={fc.id}
                    title={fc.title}
                    description={fc.description}
                    showFlashCardTitle={fc.showTitle}
                    onToggleFlashCard={handleToggleFlashCard}
                  />
                );
              })}
            </FlashCards>
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <ToastContainer/>
      <Header>react-flash-cards-v3</Header>
      <Main>{mainJsx}</Main>
    </>
  );
}
