import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { generateDeck } from "../Components/actions";
import Cards from "../Components/Cards";
import NavBar from "../Components/NavBar";

function Game() {
  const [currentDeck, setCurrentDeck] = useState(generateDeck());
  const [counter, setCounter] = useState(0);
  return (
    <div className="Game">
      <NavBar
        currentDeck={currentDeck}
        setCurrentDeck={setCurrentDeck}
        counter={counter}
        setCounter={setCounter}
      />
      <DndProvider backend={HTML5Backend}>
        <Cards
          currentDeck={currentDeck}
          setCurrentDeck={setCurrentDeck}
          counter={counter}
          setCounter={setCounter}
        />
      </DndProvider>
    </div>
  );
}

export default Game;
