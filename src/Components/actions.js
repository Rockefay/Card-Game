import { cloneDeep, get, times } from "lodash";
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
    const newPile = modifiedDeck.preview.reverse();
    modifiedDeck.pile.push(...newPile);
    modifiedDeck.preview = [];
  }

  setCurrentDeck(modifiedDeck);
};

export const addToGoal = (currentDeck, setCurrentDeck, draggedCard, path) => {
  const modifiedDeck = cloneDeep(currentDeck);
  moveToGoal(modifiedDeck, draggedCard, path);
  setCurrentDeck(modifiedDeck);
};

export const addToColumn = (
  currentDeck,
  setCurrentDeck,
  draggedCard,
  path,
  index,
  column
) => {
  const modifiedDeck = cloneDeep(currentDeck);
  const lastCard =
    modifiedDeck.columns[column][modifiedDeck.columns[column].length - 1];

  if (
    (!lastCard && draggedCard.value === 13) ||
    lastCard?.value === draggedCard.value + 1 /*&&
  lastCard.color !== draggedCard.color*/
  ) {
    const currentColumn = path.replace(/^\D+/g, "");
    const cards = [draggedCard];
    if (modifiedDeck.columns[currentColumn]) {
      path = modifiedDeck.columns[currentColumn];
      for (let i = index + 1; i < path.length; i++) {
        cards.push(path[i]);
      }
    } else path = get(modifiedDeck, path);
    modifiedDeck.columns[column].push(...cards);
    times(cards.length, () => path.pop());
    if (path.length) path[path.length - 1].uncovered = true;
  }
  setCurrentDeck(modifiedDeck);
};

export const fillGoals = (currentDeck, setCurrentDeck) => {
  const modifiedDeck = cloneDeep(currentDeck);
  let cardMoved = false;
  do {
    cardMoved = false;
    for (let i = 1; i <= Object.keys(modifiedDeck.columns).length; i++) {
      const lastCard =
        modifiedDeck.columns[i][modifiedDeck.columns[i].length - 1];
      if (lastCard)
        cardMoved =
          moveToGoal(modifiedDeck, lastCard, `columns.${i}`) || cardMoved;
    }
  } while (cardMoved);
  setCurrentDeck(modifiedDeck);
};

const moveToGoal = (modifiedDeck, draggedCard, path) => {
  let lastGoalCard =
    modifiedDeck.goals[draggedCard.name][
      modifiedDeck.goals[draggedCard.name].length - 1
    ];

  if (
    (!lastGoalCard && draggedCard.value === 1) ||
    lastGoalCard?.value === draggedCard.value - 1
  ) {
    path = get(modifiedDeck, path);
    modifiedDeck.goals[draggedCard.name].push(draggedCard);
    path.pop();
    if (path.length) path[path.length - 1].uncovered = true;
    return true;
  }
  return false;
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
