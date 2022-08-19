import { times } from "lodash";
import React, { useState } from "react";
import { generateDeck, uncoverCard } from "./actions";
import Column from "./Column";

const placeholderPath = "Images/placeholder.png";
const backPath = "Images/back.png";

function Cards() {
  const [currentDeck, setCurrentDeck] = useState(generateDeck());
  const showPreview = () => {
    uncoverCard(currentDeck, setCurrentDeck);
  };

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
          <img
            className="card"
            src={
              currentDeck.preview.length
                ? currentDeck.preview[currentDeck.preview.length - 1].src
                : placeholderPath
            }
            alt=""
          />
        </div>
        <div className="goals">
          <div className="hearts"></div>
          <div className="clubs"></div>
          <div className="diamonds"></div>
          <div className="spades"></div>
        </div>
      </div>
      <div className="second-row">
        {times(7, (c) => (
          <Column key={`column_${c + 1}`} cards={currentDeck.columns[c + 1]} />
        ))}
      </div>
    </div>
  );
}

export default Cards;
