import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { addToColumn } from "./actions";
import Card from "./Card";

function Column({
  cards,
  path,
  currentDeck,
  setCurrentDeck,
  column,
  counter,
  setCounter,
}) {
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
          column,
          counter,
          setCounter
        );
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [currentDeck]
  );

  const [currentlyDraggedCard, setCurrentlyDraggedCard] = useState();
  const [previewPosition, setPreviewPosition] = useState();

  return (
    <>
      <div className="column" ref={dropToColumn} index={column}>
        {cards.map((c, i) => (
          <Card
            key={`card_${i}`}
            card={c}
            path={path}
            index={i}
            currentDeck={currentDeck}
            setCurrentDeck={setCurrentDeck}
            counter={counter}
            setCounter={setCounter}
            setCurrentlyDraggedCard={setCurrentlyDraggedCard}
            currentlyDraggedCard={currentlyDraggedCard}
            setPosition={setPreviewPosition}
          />
        ))}
      </div>
      {cards[currentlyDraggedCard]?.src && previewPosition && (
        <div
          className="column-drag-preview card"
          id="card-preview"
          style={{
            position: "absolute",
            top: previewPosition?.y + 100,
            left: previewPosition?.x,
            zIndex: 999999,
            pointerEvents: "none",
          }}
        >
          {cards.slice(currentlyDraggedCard).map((card, i) => (
            <img
              className="card-picture dragged"
              style={{ marginTop: `${i * 25}px` }}
              key={card?.src}
              src={card?.src}
              alt=""
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Column;
