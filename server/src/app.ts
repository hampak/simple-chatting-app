import { createServer } from "http";
import { Server } from "socket.io"
import express from "express"

const app = express()

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

const setupSocket = () => {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id)
  })
}

setupSocket()

// server.listen(8001, () => {
//   console.log("server listening on port", 8001)
// })

export {
  app,
  io,
  server
}