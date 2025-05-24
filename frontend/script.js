const socket = io('https://house-point-system-arnold-house.onrender.com'); // replace with your backend URL
const valueSpan = document.getElementById('value');

socket.on('update', (newValue) => {
  valueSpan.textContent = newValue;
});

function encodePointsData(data) {
  const { totals, students } = data;

  const writeValueWithLength = (num) => {
    const str = String(num);
    return str.length + str;
  };

  let result = "";

  // --- Global Totals ---
  result += writeValueWithLength(totals.house);
  result += writeValueWithLength(totals.industry);
  result += writeValueWithLength(totals.citizenship);

  // --- Student Count ---
  result += writeValueWithLength(students.length);

  // --- Each Student's Data ---
  for (const student of students) {
    // Industry
    result += writeValueWithLength(student.industry.length);
    for (const tid of student.industry) {
      result += tid.padStart(3, "0");
    }

    // Citizenship
    result += writeValueWithLength(student.citizenship.length);
    for (const tid of student.citizenship) {
      result += tid.padStart(3, "0");
    }
  }

  return result;
}


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

document.getElementById("updateButton").addEventListener("click", () => {
  // 👇 Replace this with your actual updated JS object
  const data = {
    totals: {
      house: 5123,
      industry: 4858,
      citizenship: 265,
    },
    students: [
      {
        id: "001",
        industry: ["001", "002", "003"],
        citizenship: ["100", "101"],
      },
      {
        id: "002",
        industry: ["005", "006"],
        citizenship: ["102"],
      },
      // ... up to 086
    ],
  };

  const encoded = encodePointsData(data);

  fetch("https://house-point-system-arnold-house.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encoded }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert("Updated successfully!");
      } else {
        alert("Failed to update.");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Server error.");
    });
});
