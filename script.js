const probabilities = [
  ["Goat", "Goat", "Car"],
  ["Goat", "Car", "Goat"],
  ["Car", "Goat", "Goat"],
];

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
    remainingDoors = probability.filter(check = (prob, index) => {
      if(index !== pickedDoor){
        return prob
      }
    })
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
