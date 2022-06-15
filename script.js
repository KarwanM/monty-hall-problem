/* ------------------------- There is three probabilities for each game -------------------------*/
const probabilities = [
  ["goat", "goat", "car"],
  ["goat", "car", "goat"],
  ["car", "goat", "goat"],
];

/* -------------------------  -------------------------*/

let gameCount = 0;
let stickWinner = 0;
let switchWinner = 0;

let pickedDoor;
let revealedDoor;
let switchDoor;

let probability = [];

/* ------------------------- Access to HTML elements -------------------------*/

const door1 = document.getElementById("door1-container");
const door2 = document.getElementById("door2-container");
const door3 = document.getElementById("door3-container");

const door1Marker = document.getElementById("door1-mark");
const door2Marker = document.getElementById("door2-mark");
const door3Marker = document.getElementById("door3-mark");

const pickedDoorText = document.getElementById("picked");
const revealedDoorText = document.getElementById("revealed");
const switchDoorText = document.getElementById("switch");

const stickOrSwitchBtns = document.getElementById("stick-or-switch");
const stickBtn = document.getElementById("stick-button");
const switchBtn = document.getElementById("switch-button");

const newAndResetBtns = document.getElementById("new-and-reset");
const resetBtn = document.getElementById("reset-data");
const newGameBtn = document.getElementById("new-game");

const finalResultDisplay = document.getElementById("final-result");
const imageResult = document.getElementById("image-result");
const textResult = document.getElementById("text-result");

const data = document.getElementById("data");
const displayGameCount = document.getElementById("game-count");
const displayStickWinner = document.getElementById("stick-winner");
const displaySwitchWinner = document.getElementById("switch-winner");

/* ------------------------- Add picked door details to layout after picking a door -------------------------*/

const pickedDoorDetails = (num, door, marker) => {
  marker.src = "./assets/correct.png";
  marker.style.display = "block";
  door.disabled = true;

  pickedDoorText.innerHTML = "You have picked Door number " + num;
  pickedDoorText.style.display = "block";
};

/* ------------------------- Add revealed door details to layout after picking a door -------------------------*/

const revealedDoorDetails = (num, door, mark) => {
  revealedDoorText.innerHTML = "There is a Goat behind Door number " + num;
  revealedDoorText.style.display = "block";

  mark.src = "./assets/error.png";
  mark.style.display = "block";
  door.disabled = true;
};

/* ------------------------- Add Switch door details to layout after picking a door -------------------------*/

const switchDoorDetails = (num, door, mark) => {
  setTimeout(() => {
    mark.src = "./assets/swap.png";
    mark.style.display = "block";
    door.disabled = true;

    switchDoorText.innerHTML =
      "Would you like to Switch the Door " + num + " ?";
    switchDoorText.style.display = "block";

    stickOrSwitchBtns.style.display = "block";
  }, 3000);
};

/* ------------------------- Check the remaining doors for a Goat behind and pick a random door with a Goat behind if there is more than one -------------------------*/

const checkRemainingDoors = (num1, num2, doors, mark1, mark2, door1, door2) => {
  setTimeout(() => {
    if (doors.every((d) => d === "goat")) {
      const randomReveal = Math.floor(Math.random() * 2);

      if (randomReveal === 0) {
        revealedDoorDetails(num1, door1, mark1);
        switchDoorDetails(num2, door2, mark2);
        switchDoor = 2;
      } else {
        revealedDoorDetails(num2, door2, mark2);
        switchDoorDetails(num1, door1, mark1);
        switchDoor = 1;
      }
    } else {
      if (doors.indexOf("goat") === 0) {
        revealedDoorDetails(num1, door1, mark1);
        switchDoorDetails(num2, door2, mark2);
        switchDoor = 2;
      } else {
        revealedDoorDetails(num2, door2, mark2);
        switchDoorDetails(num1, door1, mark1);
        switchDoor = 1;
      }
    }
  }, 3000);
};

/* ------------------------- The new game starts here  -------------------------*/

const startTheGame = () => {
  // Generate random number to pick random probability
  let random = Math.floor(Math.random() * 3);

  // Random probability
  probability = probabilities[random];

  // Declear a new array for the remaining doors after picking a door
  let remainingDoors = [];

  /* ------------------------- Picking door number 1 -------------------------*/

  door1.addEventListener("click", (e) => {
    e.preventDefault();

    pickedDoor = 0;
    gameCount = +1;

    if (door2.disabled === false && door3.disabled === false) {
      pickedDoorDetails(1, door1, door1Marker);

      remainingDoors = probability.slice(1, 3);

      checkRemainingDoors(
        2,
        3,
        remainingDoors,
        door2Marker,
        door3Marker,
        door2,
        door3
      );
    }
  });

  /* ------------------------- Picking door number 2 -------------------------*/

  door2.addEventListener("click", (e) => {
    e.preventDefault();

    pickedDoor = 1;
    gameCount = +1;

    if (door1.disabled === false && door3.disabled === false) {
      pickedDoorDetails(2, door2, door2Marker);

      remainingDoors = probability.filter(
        (check = (prob, index) => {
          if (index !== probability[1]) {
            return prob;
          }
        })
      );

      checkRemainingDoors(
        1,
        3,
        remainingDoors,
        door1Marker,
        door3Marker,
        door1,
        door3
      );
    }
  });

  /* ------------------------- Picking door number 3 -------------------------*/

  door3.addEventListener("click", (e) => {
    e.preventDefault();

    pickedDoor = 2;
    gameCount = +1;

    if (door2.disabled === false && door1.disabled === false) {
      pickedDoorDetails(3, door3, door3Marker);

      remainingDoors = probability.slice(0, 2);
      checkRemainingDoors(
        1,
        2,
        remainingDoors,
        door1Marker,
        door2Marker,
        door1,
        door2
      );
    }
  });
};

/* ------------------------- Reset the game and start a new one -------------------------*/

const newGame = () => {
  door1Marker.src = "";
  door1Marker.style.display = "none";

  door2Marker.src = "";
  door2Marker.style.display = "none";

  door3Marker.src = "";
  door3Marker.style.display = "none";

  pickedDoorText.innerHTML = "";
  pickedDoorText.style.display = "none";

  revealedDoorText.innerHTML = "";
  revealedDoorText.style.display = "none";

  switchDoorText.innerHTML = "";
  switchDoorText.style.display = "none";

  stickOrSwitchBtns.style.display = "none";

  door1.disabled = false;
  door2.disabled = false;
  door3.disabled = false;

  resetBtn.style.display = "none";

  finalResultDisplay.style.display = "none";
  imageResult.src = "";

  stickBtn.disabled = false;
  switchBtn.disabled = false;

  startTheGame();
};

/* ------------------------- Show the result -------------------------*/

const result = (text, door, behind, result) => {
  imageResult.src = `./assets/${behind}.png`;
  textResult.innerHTML = `You ${result}, after ${text} to Door number ${
    door + 1
  }`;
  finalResultDisplay.style.display = "block";
};

/* ------------------------- Results of multiple games -------------------------*/

const resultData = () => {
  displayGameCount.innerHTML = "Games played: " + gameCount;
  displayStickWinner.innerHTML =
    "Winners if Sticking with original Door: " + stickWinner;
  displaySwitchWinner.innerHTML =
    "Winners if Switching with other Door: " + switchWinner;
};

/* ------------------------- Stick with the original door and show result -------------------------*/

stickBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetBtn.style.display = "block";
  if (probability[pickedDoor] === "car") {
    result("Sticking ", pickedDoor, probability[pickedDoor], " Won ");
    stickWinner += 1;
  } else {
    switchWinner += 1;
    result("Sticking ", pickedDoor, probability[pickedDoor], "Lost");
  }
  newGameBtn.disabled = false;
  switchBtn.disabled = true;
  stickBtn.disabled = true;
  data.style.display = "block";
  resultData();
  gameCount += 1;
});

/* ------------------------- Switch with the other door and show result -------------------------*/

switchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  resetBtn.style.display = "block";
  if (probability[switchDoor] === "car") {
    result("Switching ", switchDoor, probability[switchDoor], " Won ");
    switchWinner += 1;
  } else {
    result("Switching ", switchDoor, probability[switchDoor], " Lost ");
    stickWinner += 1;
  }
  newGameBtn.disabled = false;
  stickBtn.disabled = true;
  switchBtn.disabled = true;
  data.style.display = "block";
  resultData();
  gameCount += 1;
});

/* ------------------------- Start a new one -------------------------*/

newGameBtn.addEventListener("click", () => {
  newGame();
  newGameBtn.disabled = true;
});

/* ------------------------- Reset all the data from previous games -------------------------*/

resetBtn.addEventListener("click", () => {
  newGame();
  gameCount = 0;
  stickWinner = 0;
  switchWinner = 0;
  data.style.display = "none";
});

/* ------------------------- Random games -------------------------*/

const randomGames = document.getElementById("number");
const randomButton = document.getElementById("random-button");
const numberOfGames = document.getElementById("random-games");
const displayStickRandomWinners = document.getElementById(
  "stick-random-winners"
);
const displaySwitchRandomWinners = document.getElementById(
  "switch-random-winners"
);

randomButton.addEventListener("click", (e) => {
  e.preventDefault();

  let randomStickWinner = 0;
  let randomSwitchWinner = 0;

  const randomPickedDoor = Math.floor(Math.random() * 3);

  for (i = 0; i < randomGames.value; i++) {
    let random = Math.floor(Math.random() * 3);
    let probability = probabilities[random];
    let remainingDoors = [];

    if (randomPickedDoor === 0) {
      remainingDoors = probability.slice(1, 3);
    } else if (randomPickedDoor === 2) {
      remainingDoors = probability.slice(0, 2);
    } else {
      remainingDoors = probability.filter(
        (check = (prob, index) => {
          if (index !== randomPickedDoor) {
            return prob;
          }
        })
      );
    }

    const checkDoor = (door) => {
      if (door.every((d) => d === "goat")) {
        return Math.floor(Math.random() * 2);
      } else {
        return door.indexOf("goat");
      }
    };

    let randomRevealedDoor = checkDoor(remainingDoors);
    let randomSwitchDoor;

    if (randomRevealedDoor === 0) {
      randomSwitchDoor = 1;
    } else {
      randomSwitchDoor = 0;
    }

    const stickToTheDoor = (result) => {
      if (result === "car") {
        return randomStickWinner++;
      }
    };

    const switchTheDoor = (result) => {
      if (result === "car") {
        return randomSwitchWinner++;
      }
    };

    stickToTheDoor(probability[randomPickedDoor]);

    switchTheDoor(remainingDoors[randomSwitchDoor]);

  }

  numberOfGames.innerHTML = "Number of games: " + randomGames.value
  displayStickRandomWinners.innerHTML = "Winners if stick to the first picked door is : " + randomStickWinner;
  displaySwitchRandomWinners.innerHTML = "Winners if switch to the other is : " + randomSwitchWinner;
  randomGames.value = "";
});
