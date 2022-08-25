import React from "react";
import { useDrop } from "react-dnd";
import { addToColumn } from "./actions";
import Card from "./Card";

function Column({ cards, path, currentDeck, setCurrentDeck, column }) {
  const [{ isOver }, dropToColumn] = useDrop(
    () => ({
      accept: "card",
      drop: (item, monitor) => {
        addToColumn(
          currentDeck,
          setCurrentDeck,
          item.card,
          item.path,
          item.index,
          column
        );
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [currentDeck]
  );

  return (
    <div className="column" ref={dropToColumn}>
      {cards.map((c, i) => (
        <Card
          key={`card_${i}`}
          card={c}
          path={path}
          index={i}
          currentDeck={currentDeck}
          setCurrentDeck={setCurrentDeck}
        />
      ))}
    </div>
  );
}

export default Column;
