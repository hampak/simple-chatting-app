import { createServer } from "http";
import { Server } from "socket.io"
import express from "express"

const app = express()

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
  console.log("client is connected", socket.id)


  socket.on("register", async (userName) => {
    try {
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
})

export {
  app,
  io,
  server
}