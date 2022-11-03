import React from "react";
import { useFlip } from './hooks/hooks'
import backOfCard from "./back.png";
import "./PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [flipCard, setFlipCard] = useFlip()

  return (
    <img
      src={flipCard ? front : back}
      alt="playing card"
      onClick={setFlipCard}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
