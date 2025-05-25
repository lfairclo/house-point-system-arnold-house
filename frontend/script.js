const socket = io('https://house-point-system-arnold-house.onrender.com'); // ✅ FIXED
const valueSpan = document.getElementById('value');

socket.on('update', (newValue) => {
  console.log('Socket update received:', newValue);
  document.getElementById('value').textContent = newValue;
});



function updateSharedString(newValue) {
  console.log("Sending update to server:", newValue);
  fetch('https://house-point-system-arnold-house.onrender.com/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encoded: newValue }),
  })
  .then(res => res.json())
  .then(data => {
    console.log("Server acknowledged update:", data);
  })
  .catch(err => console.error("Update failed:", err));
}


function getSharedString() {
  fetch('https://house-point-system-arnold-house.onrender.com/data')
    .then(response => response.json())
    .then(data => {
      console.log('Retrieved shared string:', data.encoded);
      document.getElementById('value').textContent = data.encoded;
    })
    .catch(error => {
      console.error('Error retrieving shared string:', error);
    });
}


document.getElementById("createnewint").addEventListener("click", () => {
  const boyCount = parseInt(document.getElementById("boyCount").value);
  const teacherCount = parseInt(document.getElementById("teacherCount").value);

  let tempint = 101010;

  updateSharedString(tempint);
}

window.addEventListener('DOMContentLoaded', () => {
  getSharedString();
});
