import React, { useEffect, useState } from "react";

const deck = [
  {
    name: "hearts",
    color: "red",
    src: "Images/ace_of_hearts.png",
    value: 1,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/ace_of_clubs.png",
    value: 1,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/ace_of_diamonds.png",
    value: 1,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/ace_of_spades.png",
    value: 1,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/2_of_hearts.png",
    value: 2,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/2_of_clubs.png",
    value: 2,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/2_of_diamonds.png",
    value: 2,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/2_of_spades.png",
    value: 2,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/3_of_hearts.png",
    value: 3,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/3_of_clubs.png",
    value: 3,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/3_of_diamonds.png",
    value: 3,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/3_of_spades.png",
    value: 3,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/4_of_hearts.png",
    value: 4,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/4_of_clubs.png",
    value: 4,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/4_of_diamonds.png",
    value: 4,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/4_of_spades.png",
    value: 4,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/5_of_hearts.png",
    value: 5,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/5_of_clubs.png",
    value: 5,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/5_of_diamonds.png",
    value: 5,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/5_of_spades.png",
    value: 5,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/6_of_hearts.png",
    value: 6,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/6_of_clubs.png",
    value: 6,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/6_of_diamonds.png",
    value: 6,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/6_of_spades.png",
    value: 6,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/7_of_hearts.png",
    value: 7,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/7_of_clubs.png",
    value: 7,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/7_of_diamonds.png",
    value: 7,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/7_of_spades.png",
    value: 7,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/8_of_hearts.png",
    value: 8,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/8_of_clubs.png",
    value: 8,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/8_of_diamonds.png",
    value: 8,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/8_of_spades.png",
    value: 8,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/9_of_hearts.png",
    value: 9,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/9_of_clubs.png",
    value: 9,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/9_of_diamonds.png",
    value: 9,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/9_of_spades.png",
    value: 9,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/10_of_hearts.png",
    value: 10,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/10_of_clubs.png",
    value: 10,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/10_of_diamonds.png",
    value: 10,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/10_of_spades.png",
    value: 10,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/jack_of_hearts.png",
    value: 11,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/jack_of_clubs.png",
    value: 11,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/jack_of_diamonds.png",
    value: 11,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/jack_of_spades.png",
    value: 11,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/queen_of_hearts.png",
    value: 12,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/queen_of_clubs.png",
    value: 12,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/queen_of_diamonds.png",
    value: 12,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/queen_of_spades.png",
    value: 12,
  },

  {
    name: "hearts",
    color: "red",
    src: " Images/king_of_hearts.png",
    value: 13,
  },
  {
    name: "clubs",
    color: "black",
    src: " Images/king_of_clubs.png",
    value: 13,
  },
  {
    name: "diamonds",
    color: "red",
    src: " Images/king_of_diamonds.png",
    value: 13,
  },
  {
    name: "spades",
    color: "black",
    src: " Images/king_of_spades.png",
    value: 13,
  },
];

const shufffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const currentDeck = deck.slice();
shufffleArray(currentDeck);

function Cards() {
  const [preview, setPreview] = useState();
  const [columnOne, setColumnOne] = useState();
  const [columnTwo, setColumnTwo] = useState();
  const [columnThree, setColumnThree] = useState();
  const [columnFour, setColumnFour] = useState();
  const [columnFive, setColumnFive] = useState();
  const [columnSix, setColumnSix] = useState();
  const [columnSeven, setColumnSeven] = useState();

  useEffect(() => {
    setColumnOne(<img className="card" src={currentDeck[0].src} alt="" />);
    setColumnTwo(<img className="card" src="Images/back.png" alt="" />);
    setColumnThree(<img className="card" src="Images/back.png" alt="" />);
    setColumnFour(<img className="card" src="Images/back.png" alt="" />);
    setColumnFive(<img className="card" src="Images/back.png" alt="" />);
    setColumnSix(<img className="card" src="Images/back.png" alt="" />);
    setColumnSeven(<img className="card" src="Images/back.png" alt="" />);
  }, []);

  const showPreview = () => {
    const previewCard = (
      <img className="card" src={currentDeck[0].src} alt="" />
    );
    setPreview(previewCard);
  };

  return (
    <div className="Cards">
      <div className="first-row">
        <div className="pile" onClick={showPreview}>
          <img className="card" src="Images/back.png" alt="" />
        </div>
        <div className="preview">{preview}</div>
        <div className="goals">
          <div className="hearts"></div>
          <div className="clubs"></div>
          <div className="diamonds"></div>
          <div className="spades"></div>
        </div>
      </div>
      <div className="second-row">
        <div className="column">{columnOne}</div>
        <div className="column">{columnTwo}</div>
        <div className="column">{columnThree}</div>
        <div className="column">{columnFour}</div>
        <div className="column">{columnFive}</div>
        <div className="column">{columnSix}</div>
        <div className="column">{columnSeven}</div>
      </div>
    </div>
  );
}

export default Cards;
