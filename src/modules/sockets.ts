import {Server} from 'socket.io';
import http from 'http';
import Chat from '../db/chat';

module.exports = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  })

  io.on('connection', (socket) => {
    console.log(socket.id + "Connected");

    socket.on("join-room", room => {
        socket.join(room)
    })

    socket.on("sendMessage", async (data) => {

      const foundChat = await Chat.find({participants: data.participants})

      if (foundChat.length > 0) {
        const chat = await Chat.findOneAndUpdate({_id: data._id}, {$push: {chat: data.chat}, $set: {updatedAt: Date.now()}}, {new: true})

        io.to(data._id).emit("updateChat", chat)
      } else {
        const chat = new Chat({
          participants: data.participants,
          chat: [data.chat],
          updatedAt: Date.now()
        })
        await chat.save()
      }
    })
  })
}