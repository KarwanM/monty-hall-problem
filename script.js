// There is three probabilities for each game
const probabilities = [
  ["goat", "goat", "car"],
  ["goat", "car", "goat"],
  ["car", "goat", "goat"],
];

let gameCount = 0;
let stickWinner = 0;
let switchWinner = 0;

let pickedDoor;
let revealedDoor;
let switchDoor;

// Generate random number to pick random probability
let random = Math.floor(Math.random() * 3);

// Random probability
let probability = probabilities[random];

console.log(probability);
// Access HTML elements

const stickBtn = document.getElementById("stick-button");
const switchBtn = document.getElementById("switch-button");
const resetBtn = document.getElementById("reset");

const door1 = document.getElementById("door1-container");
const door2 = document.getElementById("door2-container");
const door3 = document.getElementById("door3-container");

const door1Mark = document.getElementById("door1-mark");
const door2Mark = document.getElementById("door2-mark");
const door3Mark = document.getElementById("door3-mark");

const pickedDetails = document.getElementById("picked");
const revealDetails = document.getElementById("revealed");
const switchDetails = document.getElementById("switch");

const stickOrSwitchBtns = document.getElementById("stick-or-switch");

let remainingDoors = [];

const revealedDoorDetails = (door) => {
  revealDetails.innerHTML = "There is a Goat behind Door number " + door;
  revealDetails.style.display = "block";
};

const revealedDoorMark = (door, mark) => {
  mark.src = "./assets/error.png";
  mark.style.display = "block";
  door.disabled = true;
};
const switchDoorMark = (door, mark) => {
  setTimeout(() => {
    mark.src = "./assets/swap.png";
    mark.style.display = "block";
    door.disabled = true;
  }, 3000);
};

const checkRemainingDoors = (num1, num2, doors, mark1, mark2, door1, door2) => {
  setTimeout(() => {
    if (doors.every((d) => d === "goat")) {
      const randomReveal = Math.floor(Math.random() * 2);

      if (randomReveal === 0) {
        revealedDoorMark(door1, mark1);
        switchDoorMark(door2, mark2);
        revealedDoorDetails(num1);
        switchDoor = 2;
      } else {
        revealedDoorMark(door2, mark2);
        switchDoorMark(door1, mark1);
        revealedDoorDetails(num2);
        switchDoor = 1;
      }
    } else {
      if (doors.indexOf("goat") === 0) {
        revealedDoorMark(door1, mark1);
        switchDoorMark(door2, mark2);
        revealedDoorDetails(num1);
        switchDoor = 2;
      } else {
        revealedDoorMark(door2, mark2);
        switchDoorMark(door1, mark1);
        revealedDoorDetails(num2);
        switchDoor = 1;
      }
    }
  }, 3000);
};

// After click on Door number one

door1.addEventListener("click", (e) => {
  e.preventDefault();

  pickedDoor = 0;
  gameCount = +1;

  if (door2.disabled === false && door3.disabled === false) {
    door1Mark.src = "./assets/correct.png";
    door1Mark.style.display = "block";
    door1.disabled = true;

    pickedDetails.innerHTML = "You have picked Door number 1";
    pickedDetails.style.display = "block";

    remainingDoors = probability.slice(1, 3);

    checkRemainingDoors(
      2,
      3,
      remainingDoors,
      door2Mark,
      door3Mark,
      door2,
      door3
    );
  }

  setTimeout(() => {
    switchDetails.innerHTML = "Would you like to Switch the Door?";
    switchDetails.style.display = "block";

    stickOrSwitchBtns.style.display = "block";
  }, 6000);
});

// After click on Door number two

door2.addEventListener("click", (e) => {
  e.preventDefault();

  pickedDoor = 1;
  gameCount = +1;

  if (door1.disabled === false && door3.disabled === false) {
    door2Mark.src = "./assets/correct.png";
    door2Mark.style.display = "block";
    door2.disabled = true;

    pickedDetails.innerHTML = "You have picked Door number 2";
    pickedDetails.style.display = "block";

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
      door1Mark,
      door3Mark,
      door1,
      door3
    );
  }

  setTimeout(() => {
    switchDetails.innerHTML = "Would you like to Switch the Door?";
    switchDetails.style.display = "block";

    stickOrSwitchBtns.style.display = "block";
  }, 6000);
});

// After click on Door number three

door3.addEventListener("click", (e) => {
  e.preventDefault();

  pickedDoor = 2;
  gameCount = +1;

  if (door2.disabled === false && door1.disabled === false) {
    door3Mark.src = "./assets/correct.png";
    door3Mark.style.display = "block";
    door3.disabled = true;

    pickedDetails.innerHTML = "You have picked Door number 3";
    pickedDetails.style.display = "block";

    remainingDoors = probability.slice(0, 2);

    checkRemainingDoors(
      1,
      2,
      remainingDoors,
      door1Mark,
      door2Mark,
      door1,
      door2
    );
  }

  setTimeout(() => {
    switchDetails.innerHTML = "Would you like to Switch the Door?";
    switchDetails.style.display = "block";

    stickOrSwitchBtns.style.display = "block";
  }, 6000);
});

stickBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (probability[pickedDoor] === "car") {
    stickWinner += 1;
  }

  console.log(
    gameCount +
      " : " +
      " Stick winner: " +
      stickWinner +
      " : " +
      " Switch winner " +
      switchWinner
  );
});

switchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (probability[switchDoor] === "car") {
    switchWinner += 1;
  }

  console.log(
    gameCount +
      " : " +
      " Stick winner: " +
      stickWinner +
      " : " +
      " Switch winner " +
      switchWinner
  );
});



// const pickedDoor = Math.floor(Math.random() * 3);

// let stickWinner = 0;
// let stickLosser = 0;

// let switchWinner = 0;
// let switchLooser = 0;

// console.log(pickedDoor);

// for (i = 0; i < 1000; i++) {
//   let random = Math.floor(Math.random() * 3);
//   let probability = probabilities[random];
//   let remainingDoors = [];

//   if (pickedDoor === 0) {
//     remainingDoors = probability.slice(1, 3);
//   } else if (pickedDoor === 2) {
//     remainingDoors = probability.slice(0, 2);
//   } else {
//     remainingDoors = probability.filter(
//       (check = (prob, index) => {
//         if (index !== pickedDoor) {
//           return prob;
//         }
//       })
//     );
//     // remainingDoors.push(probability[0], probability[2]);
//   }

//   const checkDoor = (door) => {
//     if (door.every((d) => d === "goat")) {
//       return Math.floor(Math.random() * 2);
//     } else {
//       return door.indexOf("goat");
//     }
//   };

//   let revealedDoor = checkDoor(remainingDoors);
//   let unRevealedDoor;

//   if (revealedDoor === 0) {
//     unRevealedDoor = 1;
//   } else {
//     unRevealedDoor = 0;
//   }

//   // console.log("\nPicked Door : " + 1);
//   // console.log("\nBehind the Doors : " + probability);
//   // console.log("\nThe remaining doors : " + probabilityWithoutPickedDoor);
//   // console.log("\nRevealed Door is Door number : " + parseInt(revealedDoor + 2));
//   // console.log(
//   //   "\nUnrevealed Door is Door number : " + parseInt(unRevealedDoor + 2)
//   // );

//   // console.log(
//   //   "\nBehind revealed Door is : " + probabilityWithoutPickedDoor[revealedDoor]
//   // );
//   // console.log(
//   //   "\nBehind unrevealed Door is : " +
//   //     probabilityWithoutPickedDoor[unRevealedDoor]
//   // );

//   const stickToTheDoor = (result) => {
//     if (result === "car") {
//       return stickWinner++;
//     } else {
//       return stickLosser++;
//     }
//   };

//   const switchTheDoor = (result) => {
//     if (result === "car") {
//       return switchWinner++;
//     } else {
//       return switchLooser++;
//     }
//   };

//   const stick = stickToTheDoor(probability[pickedDoor]);

//   const switchDoor = switchTheDoor(remainingDoors[unRevealedDoor]);

//   // console.log(stick + switchDoor);
// }

// console.log("\n The number of winners if stick is : " + stickWinner);
// console.log("\n The number of loosers if stick is : " + stickLosser);
// console.log("\n The number of winners if switch is : " + switchWinner);
// console.log("\n The number of winners if switch is : " + switchLooser);
