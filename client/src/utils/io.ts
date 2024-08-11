import io from "socket.io-client";

export const socket = io("http://localhost:8000") // set it to the port your server is running on.