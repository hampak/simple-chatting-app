"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});
// import { app } from "./app";
// route imports
// import dashboardRoutes from "./routes/dashboardRoutes"
// configurations
dotenv_1.default.config();
app.use(express_1.default.json());
// app.use(helmet())
// app.use(helmet.crossOriginResourcePolicy({
//   policy: "cross-origin"
// }))
app.use((0, morgan_1.default)("common"));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use((0, cors_1.default)());
// routes
// app.use("/dashboard", dashboardRoutes) // http://localhost:8000/dashboard
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello World");
}));
io.on('connection', (socket) => {
    console.log("a user connected", socket.id);
});
// server
// const port = process.env.PORT || 3001;
const port = 8000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
