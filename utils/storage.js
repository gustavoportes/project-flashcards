import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks';

export const getDecks = async () => {
  return await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then( (value) => { return JSON.parse(value) });
}

export const saveDeckTitle = async (title) => {
  return await AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: { 
      title: title,
      questions: []
    }
  }));
}

export const addCardToDeck = async (title, card) => {
  return await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then ( (data) => {
      const questions = JSON.parse(data)[title].questions
      return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
          questions: [...questions, ...card]
        }
    }))
  });
}
