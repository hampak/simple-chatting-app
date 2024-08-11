import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { app, io, server } from "./app";

// route imports

// configurations
dotenv.config()

app.use(express.json())

app.use(morgan("common"))
app.use(cors({
  origin: "https://courteous-passion-production.up.railway.app",
  methods: ['GET', 'POST']
}))

// routes
app.get("/", async (req, res) => {
  res.send("Hello World")
})

io.on('connection', (socket) => {
  console.log("a user connected", socket.id)
})

const port = 8000
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})