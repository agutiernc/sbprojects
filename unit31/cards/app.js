const BASE_URL = 'http://deckofcardsapi.com/api'

/* 
  1. Make a request to the Deck of Cards API to request a single card 
      from a newly shuffled deck. Once you have the card, console.log the 
      value and the suit (e.g. “5 of spades”, “queen of diamonds”).
*/

$.getJSON(`${BASE_URL}/deck/new/draw/?count=1`)
  .then(data => {
    const card = data.cards[0]

    console.log(`${card.value} of ${card.suit}`)
  })
  .catch(err => console.log(err))


  /*
    2. Make a request to the deck of cards API to request a single card 
        from a newly shuffled deck. Once you have the card, make a request
        to the same API to get one more card from the same deck.

       Once you have both cards, console.log the values and suits of both cards.
  */

$.getJSON(`${BASE_URL}/deck/new/draw/?count=1`)
  .then(data => {
    const deckID = data.deck_id
    const card = data.cards[0]

    console.log(`${card.value} of ${card.suit}`)

    return $.getJSON(`${BASE_URL}/deck/${deckID}/draw/?count=2`)
  })
  .then(data => {
    const card = data.cards[0]

    console.log(`${card.value} of ${card.suit}`)
  })
  

/*
3. Build an HTML page that lets you draw cards from a deck. When the page loads,
    go to the Deck of Cards API to create a new deck, and show a button on the
    page that will let you draw a card. Every time you click the button, display
    a new card, until there are no cards left in the deck.
*/

let deckID = null

// On load or reload, create new deck and get deck ID
$.getJSON(`${BASE_URL}/deck/new/shuffle`)
  .then(data => {
    deckID = data.deck_id
  })

$('button').click( function() {

  $.getJSON(`${BASE_URL}/deck/${deckID}/draw/`)
    .then(data => {
      let cardImgURL = data.cards[0].image
      
      $('img').attr('src', `${cardImgURL}`)

      
      if (data.remaining === 0) $('button').remove() 
    })
})