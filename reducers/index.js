import {
  LOAD_DECKS,
  ADD_DECK,
  ADD_CARD
} from '../actions';

const flashcardsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_DECKS:
      return { ...state, ...action.decks };
    case ADD_DECK:
      return { 
        ...state,
        [action.deck.title]: { 
          ...action.deck 
        }
      };
    case ADD_CARD:
      return {
        ...state,
          [action.card.title]: {
            title: action.card.title,
            questions: [ ...state[action.card.title].questions, ...action.card.questions ]
          }
      };
    default:
      return state;
  }
}

export default flashcardsReducer;