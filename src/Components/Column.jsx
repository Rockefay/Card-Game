import React from "react";
import Card from "./Card";

function Column({ cards }) {
  return (
    <div className="column">
      {cards.map((c, i) => (
        <Card key={`card_${i}`} card={c} />
      ))}
    </div>
  );
}

export default Column;
