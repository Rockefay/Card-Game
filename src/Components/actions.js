import { cloneDeep, get, times } from "lodash";
import deck from "../Consts/deck";
import deckKeys from "../Consts/deckKeys";

export const addScore = (lastScore, player) => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const lastPlay = { name: player, score: lastScore };
  scores.push(lastPlay);
  scores.sort((a, b) => a.score - b.score);
  scores.splice(5);
  localStorage.setItem("scores", JSON.stringify(scores));
};

export const showScore = (setScoreBoard) => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  for (let i = 0; i < 5; i++) {
    setScoreBoard(
      times(scores.length, (i) => {
        return (
          <div key={i}>
            {i + 1}. {scores[i].name} - {scores[i].score}
          </div>
        );
      })
    );
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

export const uncoverPreviewCard = (
  currentDeck,
  setCurrentDeck,
  counter,
  setCounter
) => {
  const modifiedDeck = cloneDeep(currentDeck);

  if (
    !moveTopCard(
      modifiedDeck,
      deckKeys.pile(),
      deckKeys.preview(),
      counter,
      setCounter
    )
  ) {
    const newPile = modifiedDeck.preview.reverse();
    modifiedDeck.pile.push(...newPile);
    modifiedDeck.preview = [];
    setCounter(counter + 1);
  }

  setCurrentDeck(modifiedDeck);
};

export const addToGoal = (
  currentDeck,
  setCurrentDeck,
  draggedCard,
  path,
  counter,
  setCounter
) => {
  const modifiedDeck = cloneDeep(currentDeck);
  moveToGoal(modifiedDeck, draggedCard, path, counter, setCounter);
  setCurrentDeck(modifiedDeck);
};

export const addToColumn = (
  currentDeck,
  setCurrentDeck,
  draggedCard,
  path,
  index,
  column,
  counter,
  setCounter
) => {
  const modifiedDeck = cloneDeep(currentDeck);
  const lastCard =
    modifiedDeck.columns[column][modifiedDeck.columns[column].length - 1];

  if (
    ((!lastCard && draggedCard.value === 13) ||
      (lastCard?.value === draggedCard.value + 1 &&
        lastCard.color !== draggedCard.color)) &&
    modifiedDeck.columns[column].length <= 20
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
    setCounter(counter + 1);
  }
  setCurrentDeck(modifiedDeck);
};

export const fillGoals = (currentDeck, setCurrentDeck, counter, setCounter) => {
  const modifiedDeck = cloneDeep(currentDeck);
  let cardMoved = false;
  do {
    cardMoved = false;
    for (let i = 1; i <= Object.keys(modifiedDeck.columns).length; i++) {
      const lastCard =
        modifiedDeck.columns[i][modifiedDeck.columns[i].length - 1];
      if (lastCard)
        cardMoved =
          moveToGoal(
            modifiedDeck,
            lastCard,
            `columns.${i}`,
            counter,
            setCounter
          ) || cardMoved;
    }
  } while (cardMoved);
  setCurrentDeck(modifiedDeck);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const moveToGoal = (modifiedDeck, draggedCard, path, counter, setCounter) => {
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
    setCounter(counter + 1);
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

const moveTopCard = (currentDeck, from, to, counter, setCounter) => {
  const fromCollection = get(currentDeck, from, []);
  if (!fromCollection.length) return false;
  const toCollection = get(currentDeck, to, []);
  toCollection.push(fromCollection.pop());
  setCounter(counter + 1);
  return true;
};
