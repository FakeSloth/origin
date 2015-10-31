import express from 'express';
import path from 'path';
import socket from 'socket.io';
import {Server} from 'http';

let app = express();
let server = Server(app);
let io = socket(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
	socket.on('chat:message', (message) => {
		io.emit('chat:message', message);
	});
});

server.listen(3000, () => console.log('Listening on port 3000...'));
