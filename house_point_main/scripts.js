// ✅ Import Firebase (must use 'type="module"' in your HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBJfBxrgo6rg8uXL9PIgY6ebL3gFGS3TI8",
  authDomain: "house-point-system-lfairclo.firebaseapp.com",
  databaseURL: "https://house-point-system-lfairclo-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "house-point-system-lfairclo",
  storageBucket: "house-point-system-lfairclo.firebasestorage.app",
  messagingSenderId: "941089391114",
  appId: "1:941089391114:web:028c06d8789846c72195f3"
};

// ✅ Initialize Firebase and DB
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Exported function to update array
export async function add_points(person, industry, citizenship) {
  try {
    const snapshot = await get(ref(db, "arrays/house_points"));
    if (!snapshot.exists()) {
      alert("No data found in Firebase.");
      return;
    }

    const data = snapshot.val(); // current array
    data[1] = 3; // change the second value to 3

    await set(ref(db, "arrays/house_points"), data); // save updated array
    alert("Updated index 1 to 3 successfully!");
  } catch (error) {
    console.error("Error updating array:", error);
    alert("Something went wrong.");
  }
}
