import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan";

// route imports
// import dashboardRoutes from "./routes/dashboardRoutes"

// configurations
dotenv.config()
const app = express();

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({
  policy: "cross-origin"
}))

app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// routes
// app.use("/dashboard", dashboardRoutes) // http://localhost:8000/dashboard
app.get("/hello", async (req, res) => {
  res.send({
    message: "hello"
  })
})

// server
const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})