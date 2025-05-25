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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
