import { createServer } from "http";
import { Server } from "socket.io"
import express from "express"

const app = express()

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "https://client-production-081a.up.railway.app/",
    methods: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
  console.log("client is connected", socket.id)

  socket.on("register", async (userName) => {
    try {
      socket.data.userName = userName
      const welcomeMessage = {
        message: `${userName} has entered the chat`,
        name: userName,
        type: "system"
      }

      io.emit("welcomeMessage", welcomeMessage)
    } catch (error) {

    }
  })

  socket.on('sendMessage', async (message, cb) => {
    try {
      if (!message.userId) return

      io.emit("message", message)
    } catch (error) {

    }
  })

  socket.on("disconnect", () => {
    const userName = socket.data.userName
    console.log("user is disconnected", userName)
    const disconnectMessage = {
      message: `${userName} has left the chat`,
      name: userName,
      type: "system"
    }
    io.emit("disconnectUser", disconnectMessage)
  })
})

export {
  app,
  io,
  server
}