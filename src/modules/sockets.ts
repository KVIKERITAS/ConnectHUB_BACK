import {Server} from 'socket.io';
import http from 'http';

module.exports = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  })

  io.on('connection', (socket) => {
    console.log(socket.id + "Connected");
  })
}