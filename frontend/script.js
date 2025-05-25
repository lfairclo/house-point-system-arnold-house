const socket = io('https://your-backend.onrender.com'); // replace with your backend URL
const valueSpan = document.getElementById('value');

socket.on('update', (newValue) => {
  valueSpan.textContent = newValue;
});

document.getElementById("createnewint").addEventListener("click", () => {
  const boyCount = parseInt(document.getElementById("boyCount").value);
  const teacherCount = parseInt(document.getElementById("teacherCount").value);

  let tempint = 101010;

  valueSpan = tempint;
}
