import { cloneDeep, get } from "lodash";
import deck from "../Consts/deck";
import deckKeys from "../Consts/deckKeys";

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export const generateDeck = () => {
  const currentDeck = cloneDeep(deck);
  shuffleArray(currentDeck);
  const result = {
    columns: {},
    goals: {},
    pile: [],
    preview: [],
  };
  assignColumns(currentDeck, result.columns);
  result.pile = currentDeck;
  return result;
};

export const uncoverCard = (currentDeck, setCurrentDeck) => {
  const modifiedDeck = cloneDeep(currentDeck);

  if (!moveTopCard(modifiedDeck, deckKeys.pile(), deckKeys.preview())) {
    modifiedDeck.pile.push(...modifiedDeck.preview);
    modifiedDeck.preview = [];
  }

  setCurrentDeck(modifiedDeck);
};

const assignColumns = (currentDeck, columns) => {
  for (let i = 1; i <= 7; i++) {
    columns[i] = currentDeck.splice(0, i);
    columns[i][columns[i].length - 1].uncovered = true;
  }
};

const moveTopCard = (currentDeck, from, to) => {
  const fromCollection = get(currentDeck, from, []);
  if (!fromCollection.length) return false;
  const toCollection = get(currentDeck, to, []);
  toCollection.push(fromCollection.pop());
  return true;
};
