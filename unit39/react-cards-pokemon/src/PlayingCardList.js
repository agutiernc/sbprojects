import React from "react";
import { useAxios } from "./hooks/hooks";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const BASE_URL = 'https://deckofcardsapi.com/api/deck/new/draw'
  const [data, setData] = useAxios(BASE_URL)

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>

      <div>
        <button onClick={setData}>Add a playing card!</button>
      </div>
      
      <div className="PlayingCardList-card-area">
        {data.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.cards[0].image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
