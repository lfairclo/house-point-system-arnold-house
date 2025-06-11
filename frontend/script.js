function split_to_activities() {
const myArray = [0, 1, 2, 10, 20, 30, 40, 50, 60, 70, 80];

// Create empty activity arrays
const activity1 = [];
const activity2 = [];
const activity3 = [];
const activity4 = [];

// Start processing from index 3
for (let i = 3; i <= myArray.length - 4; i += 4) {
  activity1.push(myArray[i]);
  activity2.push(myArray[i + 1]);
  activity3.push(myArray[i + 2]);
  activity4.push(myArray[i + 3]);
}

console.log("Activity 1:", activity1);
console.log("Activity 2:", activity2);
console.log("Activity 3:", activity3);
console.log("Activity 4:", activity4);

}
