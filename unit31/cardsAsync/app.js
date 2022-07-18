const BASE_URL = 'http://deckofcardsapi.com/api'

/* 
  1. Make a request to the Deck of Cards API to request a single card 
      from a newly shuffled deck. Once you have the card, console.log the 
      value and the suit (e.g. “5 of spades”, “queen of diamonds”).
*/

async function singleCard() {
  const res = await fetch(`${BASE_URL}/deck/new/draw/?count=1`)
  const data = await res.json()
  const { value, suit } = data.cards[0]

  console.log(`${value} of ${suit}`)
}

singleCard()


/*
  2. Make a request to the deck of cards API to request a single card 
      from a newly shuffled deck. Once you have the card, make a request
      to the same API to get one more card from the same deck.

     Once you have both cards, console.log the values and suits of both cards.
*/

async function secondCard() {
  // 1st card requests
  const res = await fetch(`${BASE_URL}/deck/new/draw/?count=1`)
  const firstCardData = await res.json()
  const deckID = firstCardData.deck_id
  const { value, suit } = firstCardData.cards[0]

  // 2nd card requests
  const res2 = await fetch(`${BASE_URL}/deck/${deckID}/draw/?count=1`)
  const secondCardData = await res2.json()
  const { value: value2, suit: suit2 } = secondCardData.cards[0]

  console.log(`First Card is ${value} of ${suit}`)

  console.log(`Second Card is ${value2} of ${suit2}`)
}

secondCard()


/*
3. Build an HTML page that lets you draw cards from a deck. When the page loads,
    go to the Deck of Cards API to create a new deck, and show a button on the
    page that will let you draw a card. Every time you click the button, display
    a new card, until there are no cards left in the deck.
*/

async function initDeck() {
  const res = await fetch (`${BASE_URL}/deck/new/shuffle`)
  const deckData = await res.json()
  const deckID = deckData.deck_id
  const btn = document.querySelector('button')
  const img = document.querySelector('img')

  btn.addEventListener('click', async function() {
    const res2 = await fetch(`${BASE_URL}/deck/${deckID}/draw/`)
    const newCardData = await res2.json()
    const cardImgURL = newCardData.cards[0].image
    
    // change image
    img.setAttribute('src', cardImgURL)

    // remove button if there are no remaining cards
    if (newCardData.remaining === 0) btn.remove()
  })
}

initDeck()