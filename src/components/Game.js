import React, { useState, useEffect } from "react";
import "../style/GameCard.css";

import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false); // New state for game status

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  const initializeCards = () => {
    const initialCards = images.concat(images).map((image, index) => ({
      id: index,
      image,
      flipped: false,
      matched: false,
    }));
    setCards(shuffleCards(initialCards));
  };

  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const flipCard = (card) => {
    if (card.flipped || card.matched) return;

    const updatedCard = { ...card, flipped: true };
    setSelectedCards([...selectedCards, updatedCard]);
    setCards(cards.map((c) => (c.id === card.id ? updatedCard : c)));
  };

  useEffect(() => {
    const checkForMatch = () => {
      if (selectedCards.length === 2) {
        const [card1, card2] = selectedCards;

        if (card1.image === card2.image) {
          const updatedCards = cards.map((card) =>
            card.id === card1.id || card.id === card2.id
              ? { ...card, matched: true }
              : card
          );
          setCards(updatedCards);
          setMatchedCards([...matchedCards, card1.id, card2.id]);
        } else {
          setTimeout(() => {
            const updatedCards = cards.map((card) =>
              card.id === card1.id || card.id === card2.id
                ? { ...card, flipped: false }
                : card
            );
            setCards(updatedCards);
          }, 1000);
        }
        setSelectedCards([]);
      }
    };

    checkForMatch();
  }, [selectedCards, cards, matchedCards]);

  useEffect(() => {
    initializeCards();
  }, []);

  const cardBack = "card-back.jpg";

  const restartGame = () => {
    initializeCards();
    setSelectedCards([]);
    setMatchedCards([]);
    setGameOver(false);
  };

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setGameOver(true);
    }
  }, [matchedCards, cards]);

  return (
    <div className="game-container">
      <div className="game">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? "flipped" : ""} ${
              card.matched ? "matched" : ""
            }`}
            onClick={() => flipCard(card)}
          >
            <img
              src={card.flipped || card.matched ? card.image : cardBack}
              alt="Card"
            />
          </div>
        ))}
      </div>
      <div className="footer">
        {gameOver ? (
          <button className="restart-button" onClick={restartGame}>
            Restart Game
          </button>
        ) : (
          <div className="copy">
            <span>&#169;</span> Giovana Manuquian, 2023
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
