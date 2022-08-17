import { times } from "lodash";
import React, { useState } from "react";
import { generateDeck } from "./actions";
import Column from "./Column";

let counter = 0;

function Cards() {
  const [currentDeck, setCurrentDeck] = useState(generateDeck());
  const [preview, setPreview] = useState("Images/placeholder.png");
  const [pile, setPile] = useState("Images/back.png");
  const showPreview = () => {
    counter++;
    if (counter === currentDeck.pile.length - 2)
      setPile("Images/placeholder.png");
    else setPile("Images/back.png");
    if (counter === currentDeck.pile.length - 1) counter = 0;

    if (counter === 0) setPreview("Images/placeholder.png");
    else setPreview(currentDeck.pile[counter].src);
  };

  return (
    <div className="Cards">
      <div className="first-row">
        <div className="pile" onClick={showPreview}>
          <img className="card" src={pile} alt="" />
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
