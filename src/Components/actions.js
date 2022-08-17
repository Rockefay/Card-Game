import { cloneDeep } from "lodash";
import deck from "../Consts/deck";

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
  };
  assignColumns(currentDeck, result.columns);
  result.pile = currentDeck;
  return result;
};

const assignColumns = (currentDeck, columns) => {
  for (let i = 1; i <= 7; i++) {
    columns[i] = currentDeck.splice(0, i);
    columns[i][columns[i].length - 1].uncovered = true;
  }
};
