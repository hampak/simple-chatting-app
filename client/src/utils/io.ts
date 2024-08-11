import io from "socket.io-client";

// const uri = import.meta.env.VITE_STATUS === "development" ? "http://localhost:8000" : "https://server-production-982c.up.railway.app/"

export const socket = io("https://server-production-982c.up.railway.app/")
// export const socket = io(undefined)