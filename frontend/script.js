const socket = io('https://house-point-system-arnold-house.onrender.com'); // replace with your backend URL
const valueSpan = document.getElementById('value');

socket.on('update', (newValue) => {
  valueSpan.textContent = newValue;
});
