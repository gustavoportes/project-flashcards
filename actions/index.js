/*
 * action types
 */
export const LOAD_DECKS = 'LOAD_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

/*
 * action creators
 */
export const loadDecks = (decks) => ({
  type: LOAD_DECKS,
  decks
});

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
});

export const addCard = (card) => ({
  type: ADD_CARD,
  card
});