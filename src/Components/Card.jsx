import React from "react";

function Card({ card }) {
  return (
    <div className="card">
      {card.uncovered ? (
        <img className="card-picture" src={card.src} alt="" />
      ) : (
        <img className="card-picture" src="Images/back.png" alt="" />
      )}
    </div>
  );
}

export default Card;
