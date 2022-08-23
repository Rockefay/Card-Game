import { times } from "lodash";
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { backPath, placeholderPath } from "../Consts/paths";
import { addToGoal, generateDeck, uncoverPreviewCard } from "./actions";
import Card from "./Card";
import Column from "./Column";

function Cards() {
  const [currentDeck, setCurrentDeck] = useState(generateDeck());
  const showPreview = () => {
    uncoverPreviewCard(currentDeck, setCurrentDeck);
  };

  const [{ isOver }, drop] = useDrop(
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
          />
        </div>
        <div className="goals" ref={drop}>
          {Object.keys(currentDeck.goals).map((key) => (
            <div className={key} key={key}>
              {currentDeck.goals[key].map((card, index) => (
                <Card
                  card={card}
                  key={`${key}_${index}`}
                  path={`goals.${key}`}
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
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
