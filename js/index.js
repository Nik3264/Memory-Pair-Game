
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
                <img src="./img/sky10.jpg" alt="" class="img__back">
            </div>
            <div class="back">
                <img src="./img/${this.img}.jpg" alt="" class="img__back">
            </div>
        </div>
    </div>`;
  }
}

class Game {
  constructor(maxNumberOfCards, classParent) {
    this.maxNumberOfCards = Math.floor(maxNumberOfCards / 2) * 2;
    this.numbersOfCard = [];
    this.game = document.querySelector(classParent);
    this.cardsPressed = [];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  initNumbersOfCard() {
    for (let i = 2; i < this.maxNumberOfCards + 2; i++) {
      this.numbersOfCard.push(Math.floor(i / 2));
    }
  }

  createGamesField() {
    this.clicks = 0;
    this.game.innerHTML = "";
    while (this.numbersOfCard.length > 0) {
      let i = this.getRandomInt(this.numbersOfCard.length);
      let random = this.numbersOfCard[i];
      let card = new Card(
        `0${random}`,
        random,
        `id${this.numbersOfCard.length}`
      );
      this.game.insertAdjacentHTML("beforeend", card.render());
      this.numbersOfCard.splice(i, 1);
    }
  }

  markRemove() {
    if (this.cardsPressed.length > 1) {
      if (
        this.cardsPressed[0].number === this.cardsPressed[1].number &&
        this.cardsPressed[0].id !== this.cardsPressed[1].id
      ) {
        document
          .getElementById(this.cardsPressed.shift().id)
          .classList.add("hidden");
        document
          .getElementById(this.cardsPressed.shift().id)
          .classList.add("hidden");
      }
    }
  }

  markRotate() {
    if (this.cardsPressed.length > 1) {
      document
        .getElementById(this.cardsPressed.shift().id)
        .classList.remove("round");
      document
        .getElementById(this.cardsPressed.shift().id)
        .classList.remove("round");
    }
  }

  greetings() {
    this.game.innerHTML = '<div class="modal">you win!</div>';
  }

  isWin() {
    let win = true;
    if (this.game.hasChildNodes) {
      this.game.childNodes.forEach((element) => {
        win = win && element.childNodes[1].classList.contains("hidden");
      });
    }
    return win;
  }

  start() {
    this.initNumbersOfCard();
    this.createGamesField();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  let level = document.querySelector(".level"),
    button3 = document.querySelector(".three"),
    button4 = document.querySelector(".four"),
    buttonNumber = document.querySelector(".number");

  let myGame = new Game(0, ".game__wrap");

  let number = 0,
    clicks = 0;

  function initGame(number) {
    clicks = 0;
    level.innerText = `click:${clicks}`;
    myGame.maxNumberOfCards = number;
    myGame.start();
  }

  button3.addEventListener("click", () => {
    initGame(12);
  });

  button4.addEventListener("click", () => {
    initGame(16);
  });

  buttonNumber.addEventListener("click", (event) => {
    let game = document.querySelector(".game__wrap");
    game.innerHTML =
      '<div class="game__number">Input number, please (<16)<input class="game__number__input"></div>';
    let newGameInput = document.querySelector(".game__number__input");
    newGameInput.focus();
    newGameInput.addEventListener("change", () => {
      number = Math.floor(Number(newGameInput.value) / 2) * 2;
      initGame(number);
    });
  });

  function myListener(event) {
    let target = event.target;
    while (target != this.game) {
      if (target.getAttribute("number") != null) {
        clicks++;
        level.innerText = `click:${clicks}`;
        let number = target.getAttribute("number");
        let id = target.getAttribute("id");
        this.cardsPressed.push({ number, id });
        target.classList.toggle("round");
        setTimeout(() => {
          setTimeout(()=>{
            if (this.isWin()) {
            this.greetings();
          }
          },500);
          this.markRemove();
          this.markRotate();
        }, 1500);
      }
      target = target.parentNode;
    }
  }
  myGame.game.addEventListener("click", myListener.bind(myGame));
});
