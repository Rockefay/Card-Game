import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Cards from "../Components/Cards";
import NavBar from "../Components/NavBar";

function Game() {
  return (
    <div className="Game">
      <NavBar />
      <DndProvider backend={HTML5Backend}>
        <Cards />
      </DndProvider>
    </div>
  );
}

export default Game;
