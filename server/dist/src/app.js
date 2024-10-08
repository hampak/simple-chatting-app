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
exports.server = exports.io = exports.app = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = (0, http_1.createServer)(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST']
    }
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("client is connected", socket.id);
    socket.on("register", (userName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            socket.data.userName = userName;
            const welcomeMessage = {
                message: `${userName} has entered the chat`,
                name: userName,
                type: "system"
            };
            io.emit("welcomeMessage", welcomeMessage);
        }
        catch (error) {
        }
    }));
    socket.on('sendMessage', (message, cb) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!message.userId)
                return;
            io.emit("message", message);
        }
        catch (error) {
        }
    }));
    socket.on("disconnect", () => {
        const userName = socket.data.userName;
        console.log("user is disconnected", userName);
        const disconnectMessage = {
            message: `${userName} has left the chat`,
            name: userName,
            type: "system"
        };
        io.emit("disconnectUser", disconnectMessage);
    });
});
