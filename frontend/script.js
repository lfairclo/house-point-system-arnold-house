import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// === Firebase Config (replace with your actual config) ===
const firebaseConfig = {
  apiKey: "AIzaSyBJfBxrgo6rg8uXL9PIgY6ebL3gFGS3TI8",
  authDomain: "house-point-system-lfairclo.firebaseapp.com",
  databaseURL: "https://house-point-system-lfairclo-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "house-point-system-lfairclo",
  storageBucket: "house-point-system-lfairclo.firebasestorage.app",
  messagingSenderId: "941089391114",
  appId: "1:941089391114:web:028c06d8789846c72195f3"
};

// === Init Firebase ===
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// === DOM Elements ===
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const output = document.getElementById('output');

// === Sample Array to Save ===
const sampleArray = [0, 1, 2, 10, 20, 30, 40, 50, 60, 70, 80];

// === Save array to Firebase ===
saveBtn.onclick = () => {
  set(ref(db, 'arrays/myArray'), sampleArray)
    .then(() => {
      output.innerText = "Sample array saved to Firebase!";
    })
    .catch(err => {
      output.innerText = "Save failed: " + err;
    });
};

// === Load array, parse into activity arrays ===
loadBtn.onclick = () => {
  get(ref(db, 'arrays/myArray'))
    .then(snapshot => {
      if (!snapshot.exists()) {
        output.innerText = "No data found.";
        return;
      }

      const arr = snapshot.val();

      const activity1 = [];
      const activity2 = [];
      const activity3 = [];
      const activity4 = [];

      for (let i = 3; i <= arr.length - 4; i += 4) {
        activity1.push(arr[i]);
        activity2.push(arr[i + 1]);
        activity3.push(arr[i + 2]);
        activity4.push(arr[i + 3]);
      }

      output.innerText = 
        "Loaded array: " + JSON.stringify(arr) + "\n\n" +
        "Activity 1: " + JSON.stringify(activity1) + "\n" +
        "Activity 2: " + JSON.stringify(activity2) + "\n" +
        "Activity 3: " + JSON.stringify(activity3) + "\n" +
        "Activity 4: " + JSON.stringify(activity4);
    })
    .catch(err => {
      output.innerText = "Load failed: " + err;
    });
};
