import React from "react";
import { Link } from "react-router-dom";
import { fillGoals, generateDeck } from "./actions";

function NavBar({ currentDeck, setCurrentDeck, counter, setCounter }) {
  return (
    <div className="NavBar">
      <div
        className="filler"
        onClick={() =>
          fillGoals(currentDeck, setCurrentDeck, counter, setCounter)
        }
      >
        Fill Goals
      </div>
      <div className="logo">Card Game</div>
      <div
        className="restart"
        onClick={() => {
          setCurrentDeck(generateDeck());
          setCounter(0);
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
