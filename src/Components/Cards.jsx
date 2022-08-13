import React from "react";

function Cards() {
  return (
    <div className="Cards">
      <div className="first-row">
        <div className="pile">
          <img src={require("../Assets/Images/back.png")} alt="back" />
        </div>
        <div className="preview"></div>
        <div className="goals">
          <div className="hearts"></div>
          <div className="clubs"></div>
          <div className="diamonds"></div>
          <div className="spades"></div>
        </div>
      </div>
      <div className="second-row">
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
        <div className="column"></div>
      </div>
    </div>
  );
}

export default Cards;
