import React, { useEffect, useState } from "react";
import { addScore, showScore } from "../Components/actions";

function EndGame() {
  const [name, setName] = useState("");
  const [scoreBoard, setScoreBoard] = useState();
  const recentScore = localStorage.getItem("recentScore");
  useEffect(() => {
    showScore(setScoreBoard);
  }, []);

  return (
    <div className="EndGame">
      <div className="Menu">
        <div className="container">
          <h3 className="logo">Card Game</h3>
          <div className="score">Your score: {recentScore || 0}</div>
          <form className="player-name">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <button
              type="button"
              onClick={() => {
                if ((name, recentScore)) {
                  addScore(recentScore, name);
                  showScore(setScoreBoard);
                }
              }}
            >
              Submit
            </button>
          </form>
          <div className="scores">{scoreBoard}</div>
        </div>
      </div>
    </div>
  );
}

export default EndGame;
