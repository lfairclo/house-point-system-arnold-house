// apply new points

import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const db = getDatabase(); // Assume firebaseApp is already initialized

export async function add_points(person, industry, citizenship) {
  try {
    const snapshot = await get(ref(db, "arrays/house_points"));
    if (!snapshot.exists()) {
      alert("No data found in Firebase.");
      return;
    }

    //snapshot is value of array 
    const data = snapshot.val(); // this is your array
    //takes previous array and changes this array
    data[1] = 3; // set the 2nd value (index 1) to 3

    await set(ref(db, "arrays/house_points"), data);
    // sends to  Firebase
    alert("Updated index 1 to 3 successfully!");
  } catch (error) {
    console.error("Error updating array:", error);
    alert("Something went wrong.");
  }
}
