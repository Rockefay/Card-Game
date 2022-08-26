import { times } from "lodash";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import deck from "../Consts/deck";
import { backPath, placeholderPath } from "../Consts/paths";
import { addToGoal, uncoverPreviewCard } from "./actions";
import Card from "./Card";
import Column from "./Column";

function Cards({ currentDeck, setCurrentDeck }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
    if (
      deck.length ===
      currentDeck.goals.hearts.length +
        currentDeck.goals.clubs.length +
        currentDeck.goals.diamonds.length +
        currentDeck.goals.spades.length
    ) {
      window.location = "/endgame";
      localStorage.setItem("recentScore", counter);
    }
  }, [currentDeck]);

  const showPreview = () => {
    uncoverPreviewCard(currentDeck, setCurrentDeck);
  };

  const [{ isOver }, dropToGoal] = useDrop(
    () => ({
      accept: "card",
      drop: (item) => {
        addToGoal(currentDeck, setCurrentDeck, item.card, item.path);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [currentDeck]
  );
  return (
    <div className="Cards">
      <div className="first-row">
        <div className="pile" onClick={showPreview}>
          <img
            className="card"
            src={currentDeck.pile.length ? backPath : placeholderPath}
            alt=""
          />
        </div>
        <div className="preview">
          <Card
            card={currentDeck.preview[currentDeck.preview.length - 1]}
            path="preview"
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
          />
        </div>
        <div className="goals" ref={dropToGoal}>
          {Object.keys(currentDeck.goals).map((key) => (
            <div className={key} key={key}>
              {currentDeck.goals[key].map((card, index) => (
                <Card
                  card={card}
                  key={`${key}_${index}`}
                  path={`goals.${key}`}
                  currentDeck={currentDeck}
                  setCurrentDeck={setCurrentDeck}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="second-row">
        {times(7, (c) => (
          <Column
            key={`column_${c + 1}`}
            cards={currentDeck.columns[c + 1]}
            path={`columns.${c + 1}`}
            column={c + 1}
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
