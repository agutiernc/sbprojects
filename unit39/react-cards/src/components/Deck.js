import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

const BASE_URL = 'http://deckofcardsapi.com/api/deck'

const Deck = () => {
  const [deck, setDeck] = useState('')
  const [cards, setCards] = useState(null)
  const [autoDraw, setAutoDraw] = useState(false)

  const timerId = useRef()

  // gets a new deck
  useEffect(() => {
    const getDeck = async () => {
      const res = await fetch(`${BASE_URL}/new/shuffle`)
      const data = await res.json()

      setDeck(data)
    }

    getDeck()
  }, [])

  const getCardData = async () => {
    const res = await fetch(`${BASE_URL}/${deck.deck_id}/draw/`)
    const data = await res.json()

    return data
  }
  
  const handleClick = async () => {
    try {

      if (autoDraw) return // button disabled if autoDraw is active

      const data = await getCardData()
      
      if (data.remaining === 0) {
        throw new Error('No cards remaining!')
      }

      setCards(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAutoDraw = () => {
    try {
      setAutoDraw(isClicked => !isClicked)
      
      if (autoDraw) {
        clearInterval(timerId.current)
        timerId.current = null
        
      } else {
        timerId.current = setInterval(async () => {
          const data = await getCardData()
  
          if (data.remaining === 0) {
            clearInterval(timerId.current)
            timerId.current = null

            throw new Error('No cards remaining!')
          }
  
          setCards(data)
        }, 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Hit me</button>
      <button onClick={handleAutoDraw}>
        {autoDraw ? 'Stop Drawing' : 'Start Drawing' }
      </button>

      {cards ? <Card imgUrl={cards.cards[0].image} /> : ''}
    </div>
  )
}

export default Deck;