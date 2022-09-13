class Card {
  constructor(img, number) {
    this.img = img;
    this.number = number;
  }

  render() {
    return `<div class="flip-container ${this.number}" >
        <div class="flipper">
            <div class="front">

            </div>
            <div class="back">

                <img src="./img/${this.img}.jpg" alt="" class="img__back">
            </div>
        </div>
    </div>`;
  }
}



let game = document.querySelector(".game__wrap");
let numberOfCard = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

for (let i = 2; i < 18; i++) {
  numberOfCard.push(Math.floor(i / 2));
}

while (numberOfCard.length > 0) {
  let i = getRandomInt(numberOfCard.length);
  let random = numberOfCard[i];
  console.log("i: ", i, "random: ", random);

  let card = new Card(`0${random}`, random);
  game.innerHTML += card.render();

  numberOfCard.splice(i, 1);
  console.log(numberOfCard);
}


