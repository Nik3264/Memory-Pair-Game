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
let numbersOfCard = [];

for (let i = 2; i < 18; i++) {
  numbersOfCard.push(Math.floor(i / 2));
}

/*
numbersOfCard.sort(function() { return 0.5 - Math.random(17); });
console.log(numbersOfCard);

numbersOfCard.forEach((i)=>{
    let card = new Card(`0${i}`, i);
    game.innerHTML += card.render();
});
*/

while (numbersOfCard.length > 0) {
  let i = getRandomInt(numbersOfCard.length);
  let random = numbersOfCard[i];
  let card = new Card(`0${random}`, random, `id${numbersOfCard.length}`);
  game.innerHTML += card.render();
  numbersOfCard.splice(i, 1);
}
/*
function isSameCardPressed(id1, id2, number1, number2) {
  if (number1 === number2 && id1 != id2) {
    return true;
  } else {
    return false;
  }
}*/

let cardsPressed = [];
/*
let state = {
  cardNumberPressedPreviouse: 0,
  cardidPressedPreviouse: "",
  cardNumberPressed: 0,
  cardidPressed: "",
};*/

let removeId1 = "",
  removeId2 = "",
  rotateId1 = "",
  rotateId2 = "";
/*
function removeSame(id1, id2) {
  if (id1 != "" && id2 != "") {
    document.getElementById(id1).classList.add("hidden");
    document.getElementById(id2).classList.add("hidden");
  }
}

function rotateBack(id1, id2) {
  if (id1 != "" && id2 != "" && id1 != id2) {
    console.log("перевор ", id1, " ", id2);
    document.getElementById(id1).classList.remove("round");
    document.getElementById(id2).classList.remove("round");
  }
}*/

/*
function markRemove({
  cardNumberPressedPreviouse,
  cardidPressedPreviouse,
  cardNumberPressed,
  cardidPressed,
}) {
  if (
    cardNumberPressedPreviouse === cardNumberPressed &&
    cardidPressedPreviouse != cardidPressed
  ) {
    removeId1 = cardidPressedPreviouse;
    removeId2 = cardidPressed;
  }
}

function markRotate({
  cardNumberPressedPreviouse,
  cardidPressedPreviouse,
  cardNumberPressed,
  cardidPressed,
}) {
  if (
    cardNumberPressedPreviouse != cardNumberPressed &&
    cardidPressedPreviouse != cardidPressed &&
    cardidPressedPreviouse != "" &&
    cardidPressed != "" &&
    document
      .getElementById(cardidPressedPreviouse)
      .classList.contains("round") &&
    document.getElementById(cardidPressed).classList.contains("round")
  ) {
    rotateId1 = cardidPressedPreviouse;
    rotateId2 = cardidPressed;
  }
}
*/
function markRemove(cardsPressed) {
  if (cardsPressed.length > 1) {
    if (
      cardsPressed[0].number === cardsPressed[1].number &&
      cardsPressed[0].id !== cardsPressed[1].id
    ) {
      removeId1 = cardsPressed.shift().id;
      removeId2 = cardsPressed.shift().id;
      document.getElementById(removeId1).classList.add("hidden");
      document.getElementById(removeId2).classList.add("hidden");
    }
  }
}

function markRotate(cardsPressed) {
  if (cardsPressed.length > 1) {
    /*
    if (
      cardsPressed[0].number !== cardsPressed[1].number &&
      cardsPressed[0].id !== cardsPressed[1].id &&
      cardsPressed[0].id !== "" &&
      cardsPressed[1].id !== "" 

      
      &&
      document
      .getElementById(cardsPressed[0].id)
      .classList.contains("round") &&
      document
      .getElementById(cardsPressed[1].id)
      .classList.contains("round")
      
    ) {
      rotateId1 = cardsPressed.shift().id;
      rotateId2 = cardsPressed.shift().id;
      document.getElementById(rotateId1).classList.remove("round");
      document.getElementById(rotateId2).classList.remove("round");
    }*/
    rotateId1 = cardsPressed.shift().id;
    rotateId2 = cardsPressed.shift().id;
    document.getElementById(rotateId1).classList.remove("round");
    document.getElementById(rotateId2).classList.remove("round");
  }
}

function clearId(id1, id2) {
  id1 = "";
  id2 = "";
}

let isRound = true;

game.addEventListener("click", (event) => {
  let target = event.target;
  while (target != this) {
    if (target.getAttribute("number") != null) {
      let number = target.getAttribute("number");
      let id = target.getAttribute("id");
      cardsPressed.push({number,id});
      console.log("после присваивания нового знач ", cardsPressed);

      if (isRound) {
        target.classList.toggle("round");
      }

      setTimeout(() => {
        markRemove(cardsPressed);
        clearId(removeId1, removeId2);
        markRotate(cardsPressed);
        clearId(rotateId1, rotateId2);
      }, 1500);
      break;
    }
    target = target.parentNode;
  }
});
