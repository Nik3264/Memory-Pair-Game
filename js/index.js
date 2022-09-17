class Card {
  constructor(img, number, id) {
    this.img = img;
    this.number = number;
    this.id = id;
  }

  render() {
    return `<div class="flip-container" >
        <div id="${this.id}" class="flipper" number="${this.number}">
            <div class="front">
            </div>
            <div class="back">
                <img src="./img/${this.img}.jpg" alt="" class="img__back">
            </div>
        </div>
    </div>`;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let game = document.querySelector(".game__wrap");
let maxNumberOfCards = 6;
const numbersOfCard = [];

function initNumbersOfCard(numbersOfCard, maxNumberOfCards) {
  for (let i = 2; i < maxNumberOfCards + 2; i++) {
    numbersOfCard.push(Math.floor(i / 2));
  }
}

function createGamesField(){
  while (numbersOfCard.length > 0) {
    let i = getRandomInt(numbersOfCard.length);
    let random = numbersOfCard[i];
    let card = new Card(`0${random}`, random, `id${numbersOfCard.length}`);
    game.innerHTML += card.render();
    numbersOfCard.splice(i, 1);
  }
}

initNumbersOfCard(numbersOfCard, maxNumberOfCards);
createGamesField();

let cardsPressed = [];

function markRemove(cardsPressed) {
  if (cardsPressed.length > 1) {
    if (
      cardsPressed[0].number === cardsPressed[1].number &&
      cardsPressed[0].id !== cardsPressed[1].id
    ) {
      document.getElementById(cardsPressed.shift().id).classList.add("hidden");
      document.getElementById(cardsPressed.shift().id).classList.add("hidden");
    }
  }
}

function markRotate(cardsPressed) {
  if (cardsPressed.length > 1) {
    document.getElementById(cardsPressed.shift().id).classList.remove("round");
    document.getElementById(cardsPressed.shift().id).classList.remove("round");
  }
}

game.addEventListener("click", (event) => {
  let target = event.target;
  while (target != this) {
    if (target.getAttribute("number") != null) {
      let number = target.getAttribute("number");
      let id = target.getAttribute("id");
      cardsPressed.push({ number, id });
      
      target.classList.toggle("round");

      setTimeout(() => {
        markRemove(cardsPressed);
        markRotate(cardsPressed);
      }, 1500);
    }
    target = target.parentNode;
  }
});
