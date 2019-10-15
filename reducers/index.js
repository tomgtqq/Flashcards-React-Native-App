import { RECEIVE_DECKS, ADD_NEW_DECK, ADD_CARD_TO_DECK } from "../actions"

  function decks(state={},action) {
    switch (action.type) {
      case RECEIVE_DECKS:
        return {
          ...state,
          ...action.decks
        }
      case ADD_NEW_DECK:
        return {
          ...state,
          ...action.deckTitle
        }
      case ADD_CARD_TO_DECK:
        return {
          ...state,
          [ action.deckTitle ]: {
            ...state[action.deckTitle],
            questions: [...state[action.deckTitle].questions, action.newCard]
          }
        }
      default:
        return state
    }
  }
  
  export default decks
  