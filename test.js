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

let n = document.querySelector(".game__wrap");
let level = document.querySelector(".level");

console.log("n ", n);
console.log("n.firstChild ", n.firstChild);
console.log("n.childNodes.length ", n.childNodes.length);

function render(id, number, img) {
  return `<div class="flip-container" >
        <div id="${id}" class="flipper" number="${number}">
            <div class="front">
            </div>
            <div class="back">
                <img src="./img/${img}.jpg" alt="" class="img__back">
            </div>
        </div>
    </div>`;
}

function markRemove() {
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

function markRotate() {
  if (cardsPressed.length > 1) {
    document.getElementById(cardsPressed.shift().id).classList.remove("round");
    document.getElementById(cardsPressed.shift().id).classList.remove("round");
  }
}

function greetings() {
  n.innerHTML = '<div class="modal">you win!</div>';
}

function isWin() {
  let win = true;
  console.log("n.childNodes  ", n.childNodes);
  if (n.hasChildNodes) {
    n.childNodes.forEach((element) => {
      win = win && element.childNodes[1].classList.contains("hidden");
    });
  }
  return win;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let button3 = document.querySelector(".three");

button3.addEventListener("click", (event) => {
  numbersOfCard = [1, 1, 2, 2];
  /*
    n.innerHTML='';
    n.innerHTML+=render("id1","1","01");
    n.innerHTML+=render("id2","1","01");
    n.innerHTML+=render("id3","2","02");
    n.innerHTML+=render("id4","2","02");
*/
  console.log("numbersOfCard ", numbersOfCard);
  n.innerHTML = "";
  while (numbersOfCard.length > 0) {
    let i = getRandomInt(numbersOfCard.length);
    let random = numbersOfCard[i];
    let card = new Card(`0${random}`, random, `id${numbersOfCard.length}`);
    n.insertAdjacentHTML("beforeend", card.render());
    //this.game.innerHTML += card.render();
    //this.game.appendChild(card.render());
    numbersOfCard.splice(i, 1);
  }

  
});

let clicks = 0;
let cardsPressed = [];
let numbersOfCard = [1, 1, 2, 2];

n.addEventListener("click", (event) => {
  let target = event.target;
  console.log("target ", target);
  while (target != this) {
    if (target.getAttribute("number") != null) {
      clicks++;
      level.innerText = clicks;
      let number = target.getAttribute("number");
      let id = target.getAttribute("id");
      cardsPressed.push({ number, id });
      console.log("до  ", target.classList);
      target.classList.toggle("round");
      console.log("после  ", target.classList);

      setTimeout(() => {
        this.markRemove();
        this.markRotate();
        if (this.isWin()) {
          this.greetings();
        }
      }, 1500);
    }
    target = target.parentNode;
  }
});





cardChangeRequest(target)
.then(() => {
  return new Promise((resolve) => {
    console.log("173: 1- .then", target);
    setTimeout(() => {
      console.log("175: 1- .then before markRemove");
      this.markRemove(); //
      console.log("177: 1- .then after markRemove");
      resolve();
    }, 1000);
  });
})
.then(() => {
  //console.log("183: 2- .then before new Promise");
  //return new Promise((resolve) => {
  console.log("185: 2- .then");
  setTimeout(() => {
    console.log("187: 2- .then setTimeout before markRotate");
    this.markRotate();
    console.log("189: 2- .then setTimeout after markRotate");
    //resolve();
  }, 500);
  //});
}); /*
.then(() => {
  console.log("195: 3- .then before setTimeout");
  setTimeout(() => {
    console.log("197: 3- .then in setTimeout before isWin");
    if (this.isWin()) {
      this.greetings();
    }
    console.log("201: 3- .then in setTimeout after isWin");
  }, 1000);
}); */ //promise

markRemove(id1, id2) {
  /* let isPossible = true;
  while (isPossible && this.cardsPressed.length > 1) {
    if (
      this.cardsPressed[0].number === this.cardsPressed[1].number &&
      this.cardsPressed[0].id !== this.cardsPressed[1].id
    ) {*/
  document
    .getElementById(this.cardsPressed.shift().id)
    .classList.add("hidden");
  document
    .getElementById(this.cardsPressed.shift().id)
    .classList.add("hidden");
  /*} else {
      isPossible = false;
    }
  }*/ //while
}
