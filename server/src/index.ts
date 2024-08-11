import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { app, io, server } from "./app";

// route imports
// import dashboardRoutes from "./routes/dashboardRoutes"

// configurations
dotenv.config()

app.use(express.json())
// app.use(helmet())
// app.use(helmet.crossOriginResourcePolicy({
//   policy: "cross-origin"
// }))

app.use(morgan("common"))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  origin: "https://courteous-passion-production.up.railway.app/",
  methods: ['GET', 'POST']
}))

// routes
// app.use("/dashboard", dashboardRoutes) // http://localhost:8000/dashboard
app.get("/", async (req, res) => {
  res.send("Hello World")
})

io.on('connection', (socket) => {
  console.log("a user connected", socket.id)
})

// server
// const port = process.env.PORT || 3001;
const port = 8000
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})