const probabilities = [
  ["goat", "goat", "car"],
  ["goat", "car", "goat"],
  ["car", "goat", "goat"],
];

let random = Math.floor(Math.random() * 3);
let probability = probabilities[random];

const door1 = document.getElementById("door1");
const door2 = document.getElementById("door2");
const door3 = document.getElementById("door3");

const behindDoor1 = document.createElement("img");
const behindDoor2 = document.createElement("img");
const behindDoor3 = document.createElement("img");

behindDoor1.src = `./assets/${probability[0]}1.png`
behindDoor2.src = `./assets/${probability[1]}1.png`
behindDoor3.src = `./assets/${probability[2]}1.png`

door1.appendChild(behindDoor1)
door2.appendChild(behindDoor2)
door3.appendChild(behindDoor3)

door1.addEventListener("click", (e) => {
  e.preventDefault();
  if (door2.disabled === false && door3.disabled === false) {
    const pickedDoor = document.createElement("span");
    pickedDoor.innerHTML = "You picked door 1";
    door1.appendChild(pickedDoor);
    door1.disabled = true;
  } else if (door2.disabled === true || door3.disabled === true) {
    const revealedDoor = document.createElement("span");
    revealedDoor.innerHTML = "There is a Goat behind door number 1";

    door1.appendChild(revealedDoor);
    door1.disabled = true;
  } else {
  }
});

door2.addEventListener("click", (e) => {
  e.preventDefault();

  const pickedDoor = document.createElement("span");
  pickedDoor.innerHTML = "You picked door 2";

  if (door1.disabled === false && door3.disabled === false) {
    door2.appendChild(pickedDoor);
    door2.disabled = true;
  } else if (door1.disabled === true || door3.disabled === true) {
    const revealedDoor = document.createElement("span");
    revealedDoor.innerHTML = "There is a Goat behind door number 2";

    door2.appendChild(revealedDoor);
    door2.disabled = true;
  }
});

door3.addEventListener("click", (e) => {
  e.preventDefault();

  const pickedDoor = document.createElement("span");
  pickedDoor.innerHTML = "You picked door 3";

  if (door2.disabled === false && door1.disabled === false) {
    door3.appendChild(pickedDoor);
    door3.disabled = true;
  } else if (door2.disabled === true || door1.disabled === true) {
    const revealedDoor = document.createElement("span");
    revealedDoor.innerHTML = "There is a Goat behind door number 3";

    door3.appendChild(revealedDoor);
    door3.disabled = true;
  }
});

const pickedDoor = Math.floor(Math.random() * 3);

let stickWinner = 0;
let stickLosser = 0;

let switchWinner = 0;
let switchLooser = 0;

console.log(pickedDoor);

for (i = 0; i < 1000; i++) {
  let random = Math.floor(Math.random() * 3);
  let probability = probabilities[random];
  let remainingDoors = [];

  if (pickedDoor === 0) {
    remainingDoors = probability.slice(1, 3);
  } else if (pickedDoor === 2) {
    remainingDoors = probability.slice(0, 2);
  } else {
    remainingDoors = probability.filter(
      (check = (prob, index) => {
        if (index !== pickedDoor) {
          return prob;
        }
      })
    );
    // remainingDoors.push(probability[0], probability[2]);
  }

  const checkDoor = (door) => {
    if (door.every((d) => d === "Goat")) {
      return Math.floor(Math.random() * 2);
    } else {
      return door.indexOf("Goat");
    }
  };

  let revealedDoor = checkDoor(remainingDoors);
  let unRevealedDoor;

  if (revealedDoor === 0) {
    unRevealedDoor = 1;
  } else {
    unRevealedDoor = 0;
  }

  // console.log("\nPicked Door : " + 1);
  // console.log("\nBehind the Doors : " + probability);
  // console.log("\nThe remaining doors : " + probabilityWithoutPickedDoor);
  // console.log("\nRevealed Door is Door number : " + parseInt(revealedDoor + 2));
  // console.log(
  //   "\nUnrevealed Door is Door number : " + parseInt(unRevealedDoor + 2)
  // );

  // console.log(
  //   "\nBehind revealed Door is : " + probabilityWithoutPickedDoor[revealedDoor]
  // );
  // console.log(
  //   "\nBehind unrevealed Door is : " +
  //     probabilityWithoutPickedDoor[unRevealedDoor]
  // );

  const stickToTheDoor = (result) => {
    if (result === "Car") {
      return stickWinner++;
    } else {
      return stickLosser++;
    }
  };

  const switchTheDoor = (result) => {
    if (result === "Car") {
      return switchWinner++;
    } else {
      return switchLooser++;
    }
  };

  const stick = stickToTheDoor(probability[pickedDoor]);

  const switchDoor = switchTheDoor(remainingDoors[unRevealedDoor]);

  // console.log(stick + switchDoor);
}

console.log("\n The number of winners if stick is : " + stickWinner);
console.log("\n The number of loosers if stick is : " + stickLosser);
console.log("\n The number of winners if switch is : " + switchWinner);
console.log("\n The number of winners if switch is : " + switchLooser);
