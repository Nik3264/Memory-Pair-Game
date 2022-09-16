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

function isSameCardPressed(id1, id2, number1, number2) {
  if (number1 === number2 && id1 != id2) {
    return true;
  } else {
    return false;
  }
}

//let cardsPressed=[];
let state = {
  cardNumberPressedPreviouse: 0,
  cardidPressedPreviouse: "",
  cardNumberPressed: 0,
  cardidPressed: "",
};

let removeId1 = "",
  removeId2 = "",
  rotateId1 = "",
  rotateId2 = "";

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
}

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

function clearId(id1, id2) {
  id1 = "";
  id2 = "";
}
function shiftCurrentCardToPrev() {
  state.cardNumberPressedPreviouse = state.cardNumberPressed;
  state.cardidPressedPreviouse = state.cardidPressed;
}
let isRound = true;
//console.log("до евента ", cardNumberPressedPreviouse);

game.addEventListener("click", (event) => {
  //console.log("внутри ивента ", cardNumberPressedPreviouse);
  let target = event.target;
  while (target != this) {
    if (target.getAttribute("number") != null) {
      state.cardNumberPressed = target.getAttribute("number");
      state.cardidPressed = target.getAttribute("id");

      console.log("после присваивания нового знач ", state);

      if (isRound) {
        target.classList.toggle("round");
      }
      //cardsPressed.push({id:cardidPressed, number:cardNumberPressed, isActive:false});
      /*
      removeSame(removeId1, removeId2);
      clearId(removeId1, removeId2);

      rotateBack(rotateId1, rotateId2);
      clearId(rotateId1, rotateId2);
*/
      setTimeout(()=>{
        markRemove(state);
        markRotate(state);
        shiftCurrentCardToPrev(state);
      });

      setTimeout(()=>{
        
        removeSame(removeId1, removeId2);
        clearId(removeId1, removeId2);
        rotateBack(rotateId1, rotateId2);
        clearId(rotateId1, rotateId2);
        
      },1500);

      console.log(state);
      break;
    }

    target = target.parentNode;
  }
});
