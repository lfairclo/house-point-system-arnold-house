// authUtils.js

import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
