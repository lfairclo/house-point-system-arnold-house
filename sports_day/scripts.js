import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJfBxrgo6rg8uXL9PIgY6ebL3gFGS3TI8",
  authDomain: "house-point-system-lfairclo.firebaseapp.com",
  databaseURL: "https://house-point-system-lfairclo-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "house-point-system-lfairclo",
  storageBucket: "house-point-system-lfairclo.firebasestorage.app",
  messagingSenderId: "941089391114",
  appId: "1:941089391114:web:028c06d8789846c72195f3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const loadBtn = document.getElementById("loadBtn");
const output = document.getElementById("output");

loadBtn.onclick = () => {
  get(ref(db, "arrays/myArray"))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        output.innerText = "No data found.";
        return;
      }

      const arr = snapshot.val();
      const numPeople = Math.floor(arr.length / 4);

      // Create activity lists
      const activity1 = [];
      const activity2 = [];
      const activity3 = [];
      const activity4 = [];

      // Fill activity lists
      for (let i = 0; i < arr.length; i += 4) {
        activity1.push(arr[i]);
        activity2.push(arr[i + 1]);
        activity3.push(arr[i + 2]);
        activity4.push(arr[i + 3]);
      }

      // Build display table
      let html = "<table border='1' cellpadding='6' style='border-collapse: collapse;'>";
      html += "<tr><th>Person</th><th>Activity 1</th><th>Activity 2</th><th>Activity 3</th><th>Activity 4</th></tr>";

      for (let i = 0; i < numPeople; i++) {
        html += `<tr>
          <td>Person ${i + 1}</td>
          <td>${activity1[i]}</td>
          <td>${activity2[i]}</td>
          <td>${activity3[i]}</td>
          <td>${activity4[i]}</td>
        </tr>`;
      }

      html += "</table>";
      output.innerHTML = html;
    })
    .catch((err) => {
      output.innerText = "Load failed: " + err;
    });

  
};
