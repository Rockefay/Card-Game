import React from "react";
import Card from "./Card";

function Column({ cards, path }) {
  return (
    <div className="column">
      {cards.map((c, i) => (
        <Card key={`card_${i}`} card={c} path={path} />
      ))}
    </div>
  );
}

export default Column;
