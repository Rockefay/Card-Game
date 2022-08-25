import React from "react";
import { Link } from "react-router-dom";
import { fillGoals, generateDeck } from "./actions";

function NavBar({ currentDeck, setCurrentDeck }) {
  return (
    <div className="NavBar">
      <div
        className="filler"
        onClick={() => fillGoals(currentDeck, setCurrentDeck)}
      >
        Fill Goals
      </div>
      <div className="logo">Card Game</div>
      <div
        className="restart"
        onClick={() => {
          setCurrentDeck(generateDeck());
        }}
      >
        Restart
      </div>
      <Link to="/" className="home">
        Home
      </Link>
    </div>
  );
}

export default NavBar;
