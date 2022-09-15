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
let numberOfCard = [];

for (let i = 2; i < 18; i++) {
  numberOfCard.push(Math.floor(i / 2));
}

/*
numberOfCard.sort(function() { return 0.5 - Math.random(17); });
console.log(numberOfCard);

numberOfCard.forEach((i)=>{
    let card = new Card(`0${i}`, i);
    game.innerHTML += card.render();
});
*/

while (numberOfCard.length > 0) {
  let i = getRandomInt(numberOfCard.length);
  let random = numberOfCard[i];
  //console.log("i: ", i, "random: ", random);

  let card = new Card(`0${random}`, random, `id${numberOfCard.length}`);
  game.innerHTML += card.render();

  numberOfCard.splice(i, 1);
  //console.log(numberOfCard);
}

function isSameCardPressed(id1,id2,number1,number2) {
      if (number1 === number2 && id1 != id2) {
        return true;
      } else {
        return false;
      }
}

//let cardsPressed=[];
let cardNumberPressedPreviouse = 0,
  cardidPressedPreviouse = "",
  cardNumberPressed = 0,
  cardidPressed = "";
let isRound=true;
//console.log("до евента ", cardNumberPressedPreviouse);


game.addEventListener("click", (event) => {
  //console.log("внутри ивента ", cardNumberPressedPreviouse);
  let target = event.target;
  while (target != this) {
    let cardNumberPressed = target.getAttribute("number");
    let cardidPressed = target.getAttribute("id");
    //cardsPressed.push({id:cardidPressed, number:cardNumberPressed, isActive:false});
    

    if (cardNumberPressed != null) {
      
      if (isRound){target.classList.toggle("round");}

      if (
        isSameCardPressed(
          cardidPressed,
          cardidPressedPreviouse,
          cardNumberPressed,
          cardNumberPressedPreviouse
        )
      ) {
        target.classList.add("hidden");
        document.getElementById(cardidPressedPreviouse).classList.add("hidden");
        cardNumberPressedPreviouse = 0;
        cardidPressedPreviouse = 0;
        cardNumberPressed = 0;
        cardidPressed = 0;
        console.log("убрали одинаков ", cardNumberPressedPreviouse);
      } else {
        console.log("после елсе ", cardNumberPressedPreviouse);
        if (cardNumberPressedPreviouse === 0) {
          cardNumberPressedPreviouse = cardNumberPressed;
          //console.log(cardNumberPressed);
          cardidPressedPreviouse = cardidPressed;
          //console.log(cardidPressed);
        } //if (cardNumberPressedPreviouse != 0)
        else {
          console.log("перевернуть через 1с ",cardNumberPressedPreviouse);
          isRound=false;
          console.log("раунд перед тайм ", isRound);
          let timer = setTimeout(() => {
            isRound=true;
            console.log("раунд внутри таймера", isRound);
            cardNumberPressedPreviouse = 0;
            cardidPressedPreviouse = 0;
            cardNumberPressed = 0;
            cardidPressed = 0;
            let allCards = document.querySelectorAll(".round");
            //console.log(allCards);
            allCards.forEach((node) => {
              node.classList.remove("round");
            });
          }, 1500);
        }
      }
      break;
    }
    target = target.parentNode;
  }
});
