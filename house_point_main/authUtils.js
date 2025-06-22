// authUtils.js

import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-check.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

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
}
