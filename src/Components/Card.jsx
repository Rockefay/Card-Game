import React from "react";
import { useDrag } from "react-dnd";
import { backPath, placeholderPath } from "../Consts/paths";
import { addToGoal } from "./actions";

function Card({ card, path, index, currentDeck, setCurrentDeck }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { card: card, path: path, index: index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [card]
  );

  return (
    <div className="card">
      {card ? (
        card.uncovered ? (
          <img
            onDoubleClick={() =>
              addToGoal(currentDeck, setCurrentDeck, card, path)
            }
            onContextMenu={(e) => {
              e.preventDefault();
              addToGoal(currentDeck, setCurrentDeck, card, path);
            }}
            ref={drag}
            className="card-picture"
            src={card.src}
            alt=""
            style={{ display: isDragging ? "none" : "" }}
          />
        ) : (
          <img className="card-picture" src={backPath} alt="" />
        )
      ) : (
        <img className="card-picture" src={placeholderPath} alt="" />
      )}
    </div>
  );
}

export default Card;
