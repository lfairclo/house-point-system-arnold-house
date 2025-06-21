// ✅ Import Firebase (must use 'type="module"' in your HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";

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

// ✅ Initialize Firebase app FIRST
const app = initializeApp(firebaseConfig);

// ✅ THEN initialize App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfJBmgrAAAAAOXs8gR2yQf6Hw34cmAkY_gBizP0'),
  isTokenAutoRefreshEnabled: true
});

// ✅ Then get DB reference
const db = getDatabase(app);


export async function add_points(boy, ind, cit,teacher) {
  
  console.log("Teacher : "+teacher);

  try{
    const indboy = await get(ref(db, `students/${boy}/ind`));
    if (!indboy.exists()) {
     alert("No indboy found in Firebase.");
     return;
    }
  }
  try
    const citboy = await get(ref(db, `students/${boy}/cit`));
    if (!citboy.exists()) {
     alert("No citboy found in Firebase.");
     return;
    }
  }
  const indboy = indboy.val();
  indboy.push(teacher);
  console.log(indboy);
  
  const citboy = citboy.val();
  citboy.push(teacher);
  console.log(citboy);

  await set(ref(db, `students/${boy}/ind`), boyarrayint);
    alert("Data updated successfully!");
  } catch (error) {
    console.error("Error updating array:", error);
    alert("Something went wrong.");
  }
  await set(ref(db, `students/${boy}/cit`), boyarraycit);
    alert("Data updated successfully!");
  } catch (error) {
    console.error("Error updating array:", error);
    alert("Something went wrong.");
  }
}


