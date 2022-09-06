import React, { useEffect } from "react";
import { useDrag, useDragLayer } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { backPath, placeholderPath } from "../Consts/paths";
import { addToGoal } from "./actions";

function Card({
  card,
  path,
  index,
  counter,
  position,
  setCounter,
  currentDeck,
  setPosition,
  setCurrentDeck,
  setDraggedCardPath,
  currentlyDraggedCard,
  setCurrentlyDraggedCard,
}) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "card",
      item: { card: card, path: path, index: index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [card]
  );

  const { initialOffset, currentOffset } = useDragLayer((monitor) => {
    return {
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    };
  });

  useEffect(() => {
    if (position && position.path !== path) return;
    if (currentlyDraggedCard !== undefined && currentlyDraggedCard !== index)
      return;
    if (!setPosition) return;
    if (isDragging) setPosition({ ...currentOffset, path });
    else setPosition(undefined);
  }, [isDragging, currentOffset, setPosition, currentlyDraggedCard, index]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: false });
  }, [preview]);

  useEffect(() => {
    if (!setCurrentlyDraggedCard) return;
    if (isDragging) {
      setCurrentlyDraggedCard(index);
    } else {
      setCurrentlyDraggedCard(undefined);
    }
  }, [index, isDragging, setCurrentlyDraggedCard]);

  useEffect(() => {
    if (!setDraggedCardPath) return;
    if (isDragging && path.includes("goals."))
      setDraggedCardPath({ path: path.replace("goals.", ""), index: index });
  }, [setDraggedCardPath, path, isDragging, index]);

  return (
    <div className="card" index={index}>
      {card ? (
        card.uncovered ? (
          <img
            onDoubleClick={() =>
              addToGoal(
                currentDeck,
                setCurrentDeck,
                card,
                path,
                counter,
                setCounter
              )
            }
            onContextMenu={(e) => {
              e.preventDefault();
              addToGoal(
                currentDeck,
                setCurrentDeck,
                card,
                path,
                counter,
                setCounter
              );
            }}
            ref={drag}
            className="card-picture"
            src={card.src}
            alt=""
            style={{
              display:
                path.includes("column") &&
                (isDragging || currentlyDraggedCard <= index)
                  ? "none"
                  : isDragging
                  ? "none"
                  : "",
            }}
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
