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
    goals: { hearts: [], clubs: [], diamonds: [], spades: [] },
    pile: [],
    preview: [],
  };
  assignColumns(currentDeck, result.columns);
  currentDeck.forEach((card) => (card.uncovered = true));
  result.pile = currentDeck;
  return result;
};

export const uncoverPreviewCard = (currentDeck, setCurrentDeck) => {
  const modifiedDeck = cloneDeep(currentDeck);

  if (!moveTopCard(modifiedDeck, deckKeys.pile(), deckKeys.preview())) {
    modifiedDeck.pile.push(...modifiedDeck.preview);
    modifiedDeck.preview = [];
  }

  setCurrentDeck(modifiedDeck);
};

export const addToGoal = (currentDeck, setCurrentDeck, draggedCard, path) => {
  const modifiedDeck = cloneDeep(currentDeck);
  if (path.includes("columns")) {
    const currentColumn = path.replace(/^\D+/g, "");
    path = modifiedDeck.columns[currentColumn];
    modifiedDeck.goals[draggedCard.name].push(draggedCard);
    path.pop();
    path[path.length - 1].uncovered = true;
  } else {
    modifiedDeck.goals[draggedCard.name].push(draggedCard);
    modifiedDeck[path].pop();
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
