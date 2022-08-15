import { times } from "lodash";
import React, { useEffect, useState } from "react";
import { generateDeck } from "./actions";
import Column from "./Column";

let counter = 0;

function Cards() {
  const [currentDeck, setCurrentDeck] = useState(generateDeck());
  const [preview, setPreview] = useState();
  const showPreview = () => {
    if (counter === currentDeck.pile.length - 1) counter = 0;

    setPreview(currentDeck.pile[counter].src);
    counter++;
  };

  useEffect(() => {
    setPreview("Images/placeholder.png");
  }, []);

  return (
    <div className="Cards">
      <div className="first-row">
        <div className="pile" onClick={showPreview}>
          <img className="card" src="Images/back.png" alt="" />
        </div>
        <div className="preview">
          <img className="card" src={preview} alt="" />
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
