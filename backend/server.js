const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors());

let sharedInt = 10101011110011001;

// WebSocket logic
io.on('connection', (socket) => {
    socket.emit('update', sharedInt);

    socket.on('increment', () => {
        sharedInt++;
        io.emit('update', sharedInt);
    });

    socket.on('decrement', () => {
        sharedInt--;
        io.emit('update', sharedInt);
    });
});

// 👇 ADD THIS route to make `/data` work
app.get('/data', (req, res) => {
    res.json({ encoded: sharedInt });
});

// Port setup for Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
