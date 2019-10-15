export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const RECEIVE_DECK = "RECEIVE_DECK";
export const ADD_NEW_DECK = "ADD_NEW_DECK";
export const ADD_CARD_TO_DECK = "ADD_CARD_TO_DECK";

export function receiveDecks( decks ) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addNewDeck( deckTitle ) {
  return {
    type: ADD_NEW_DECK,
    deckTitle
  };
}

export function addCardToDeck( newCard, deckTitle) {
  return {
    type: ADD_CARD_TO_DECK,
    newCard,
    deckTitle
  };
}