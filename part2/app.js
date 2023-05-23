let baseURL = "https://deckofcardsapi.com/api/deck";

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
let singleCard = axios.get(
  "https://deckofcardsapi.com/api/deck/new/draw/?count=1"
);

singleCard
  .then((response) =>
    console.log(
      `${response.data.cards[0].value.toLowerCase()} of ${response.data.cards[0].suit.toLowerCase()}`
    )
  )
  .catch((err) => console.log(err));

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.
let twoCards = [];

for (let i = 0; i < 2; i++) {
  twoCards.push(
    axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
  );
}

Promise.all(twoCards)
  .then((cardArr) =>
    cardArr.forEach((response) =>
      console.log(
        `${response.data.cards[0].value.toLowerCase()} of ${response.data.cards[0].suit.toLowerCase()}`
      )
    )
  )
  .catch((err) => console.log(err));

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let deckId = null;
let $btn = $("button");
let $cardArea = $("#card-area");

$.getJSON(`${baseURL}/new/shuffle/`).then((response) => {
  deckId = response.deck_id;
  $btn.show();
});

$btn.on("click", function () {
  $.getJSON(`${baseURL}/${deckId}/draw/`).then((response) => {
    let cardSrc = response.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $("<img>", {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
        },
      })
    );
    if (response.remaining === 0) $btn.remove();
  });
});
