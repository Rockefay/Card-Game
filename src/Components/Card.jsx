import React from "react";
import { useDrag } from "react-dnd";
import { backPath, placeholderPath } from "../Consts/paths";

function Card({ card, path }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "card",
      item: { card: card, path: path },
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
