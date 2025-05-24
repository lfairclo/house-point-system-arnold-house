const socket = io('https://house-point-system-arnold-house.onrender.com'); // replace with your backend URL
const valueSpan = document.getElementById('value');

socket.on('update', (newValue) => {
  valueSpan.textContent = newValue;
});

function decodePointsData(dataStr) {
  let i = 0;

  // --- Global Totals ---
  const readValueWithLength = () => {
    const len = parseInt(dataStr[i++], 10);
    const val = parseInt(dataStr.slice(i, i + len), 10);
    i += len;
    return val;
  };

  const totalHousePoints = readValueWithLength();
  const totalIndustryPoints = readValueWithLength();
  const totalCitizenshipPoints = readValueWithLength();

  // --- Student Count ---
  const studentCount = readValueWithLength();

  const students = [];

  for (let studentIndex = 0; studentIndex < studentCount; studentIndex++) {
    const studentId = String(studentIndex + 1).padStart(3, "0");

    // --- Industry Points ---
    const indLen = parseInt(dataStr[i++], 10);
    const indCount = parseInt(dataStr.slice(i, i + indLen), 10);
    i += indLen;

    const indTeachers = [];
    for (let j = 0; j < indCount; j++) {
      indTeachers.push(dataStr.slice(i, i + 3));
      i += 3;
    }

    // --- Citizenship Points ---
    const citLen = parseInt(dataStr[i++], 10);
    const citCount = parseInt(dataStr.slice(i, i + citLen), 10);
    i += citLen;

    const citTeachers = [];
    for (let j = 0; j < citCount; j++) {
      citTeachers.push(dataStr.slice(i, i + 3));
      i += 3;
    }

    // Store student entry
    students.push({
      id: studentId,
      industry: indTeachers,
      citizenship: citTeachers
    });
  }

  return {
    totals: {
      house: totalHousePoints,
      industry: totalIndustryPoints,
      citizenship: totalCitizenshipPoints
    },
    students
  };
}
