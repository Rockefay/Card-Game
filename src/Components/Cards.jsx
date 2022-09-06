import { get, times } from "lodash";
import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import deck from "../Consts/deck";
import { backPath, placeholderPath } from "../Consts/paths";
import { addToGoal, uncoverPreviewCard } from "./actions";
import Card from "./Card";
import Column from "./Column";

function Cards({ currentDeck, setCurrentDeck, counter, setCounter }) {
  const [currentlyDraggedCard, setCurrentlyDraggedCard] = useState();
  const [previewPosition, setPreviewPosition] = useState();
  const [goalsPosition, setGoalsPosition] = useState();
  const [draggedCardPath, setDraggedCardPath] = useState();

  useEffect(() => {
    if (
      deck.length ===
      currentDeck.goals.hearts.length +
        currentDeck.goals.clubs.length +
        currentDeck.goals.diamonds.length +
        currentDeck.goals.spades.length
    ) {
      window.location = "/endgame";
      localStorage.setItem("recentScore", counter);
    }
  }, [currentDeck, counter]);

  const showPreview = () => {
    uncoverPreviewCard(currentDeck, setCurrentDeck, counter, setCounter);
  };

  const [{ isOver }, dropToGoal] = useDrop(
    () => ({
      accept: "card",
      drop: (item) => {
        addToGoal(
          currentDeck,
          setCurrentDeck,
          item.card,
          item.path,
          counter,
          setCounter
        );
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [currentDeck]
  );
  return (
    <>
      <div className="Cards">
        <div className="first-row">
          <div className="pile" onClick={showPreview}>
            <img
              className="card"
              src={currentDeck.pile.length ? backPath : placeholderPath}
              alt=""
            />
          </div>
          <div className="preview">
            <Card
              card={currentDeck.preview[currentDeck.preview.length - 1]}
              path="preview"
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
              counter={counter}
              setCounter={setCounter}
              setCurrentlyDraggedCard={setCurrentlyDraggedCard}
              currentlyDraggedCard={currentlyDraggedCard}
              setPosition={setPreviewPosition}
              setDraggedCardPath={setDraggedCardPath}
            />
          </div>
          <div className="goals" ref={dropToGoal}>
            {Object.keys(currentDeck.goals).map((key) => (
              <div className={key} key={key}>
                {currentDeck.goals[key].map((card, index) => (
                  <Card
                    card={card}
                    index={index}
                    key={`${key}_${index}`}
                    path={`goals.${key}`}
                    currentDeck={currentDeck}
                    setCurrentDeck={setCurrentDeck}
                    counter={counter}
                    setCounter={setCounter}
                    setCurrentlyDraggedCard={setCurrentlyDraggedCard}
                    currentlyDraggedCard={currentlyDraggedCard}
                    setPosition={setGoalsPosition}
                    position={goalsPosition}
                    setDraggedCardPath={setDraggedCardPath}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="second-row">
          {times(7, (c) => (
            <Column
              key={`column_${c + 1}`}
              cards={currentDeck.columns[c + 1]}
              path={`columns.${c + 1}`}
              column={c + 1}
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
              counter={counter}
              setCounter={setCounter}
            />
          ))}
        </div>
      </div>
      {previewPosition &&
        currentDeck.preview[currentDeck.preview.length - 1]?.src && (
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
            <img
              className="card-picture dragged"
              src={currentDeck.preview[currentDeck.preview.length - 1]?.src}
              alt=""
            />
          </div>
        )}
      {goalsPosition &&
        currentDeck.goals[draggedCardPath.path][draggedCardPath.index]?.src && (
          <div
            className="goals-drag-preview card"
            id="card-preview"
            style={{
              position: "absolute",
              top: goalsPosition?.y + 100,
              left: goalsPosition?.x,
              zIndex: 999999,
              pointerEvents: "none",
            }}
          >
            <img
              className="card-picture dragged"
              src={
                currentDeck.goals[draggedCardPath.path][draggedCardPath.index]
                  ?.src
              }
              alt=""
            />
          </div>
        )}
    </>
  );
}

export default Cards;
