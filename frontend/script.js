const socket = io('https://house-point-system-arnold-house.onrender.com'); // replace with your backend URL
const valueSpan = document.getElementById('value');

socket.on('update', (newValue) => {
  valueSpan.textContent = newValue;
});

function updateSharedString(newValue) {
  fetch('https://house-point-system-arnold-house.onrender.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ encoded: newValue }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update shared string');
    }
    return response.json();
  })
  .then(data => {
    console.log('Shared string updated successfully:', data);
  })
  .catch(error => {
    console.error('Error updating shared string:', error);
  });
}

document.getElementById("createnewint").addEventListener("click", () => {
  const boyCount = parseInt(document.getElementById("boyCount").value);
  const teacherCount = parseInt(document.getElementById("teacherCount").value);

  let tempint = 101010;

  updateSharedString(tempint);
}
