import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})

// import { app } from "./app";

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
app.use(cors())

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