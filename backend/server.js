const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
@@ -15,19 +14,6 @@ app.use(cors());

let sharedInt = 0;

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
