// authUtils.js

import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfJBmgrAAAAAOXs8gR2yQf6Hw34cmAkY_gBizP0'),
  isTokenAutoRefreshEnabled: true
});

/**
 * Gets the role of a user based on your teacher/student structure.
 * @param {string} uid - The Firebase Auth UID
 * @param {object} db - The Firebase Realtime Database object
 * @returns {Promise<string>} - 'teacher', 'student', or 'unknown'
 */
export async function getUserRole(uid, db) {
  const [teacherSnap, studentSnap] = await Promise.all([
    get(ref(db, `teachers/${uid}`)),
    get(ref(db, `students/${uid}`))
  ]);

  if (teacherSnap.exists()) return "teacher";
  if (studentSnap.exists()) return "student";
  return "unknown";
};

export async function getUserName(uid, db) {
  const [teacherSnap, studentSnap] = await Promise.all([
    get(ref(db, `teachers/${uid}/name`)),
    get(ref(db, `students/${uid}/name`))
  ]);

  if (teacherSnap.exists()) return "teacherSnap";
  if (studentSnap.exists()) return "studentSnap";
  return "unknown";
}
