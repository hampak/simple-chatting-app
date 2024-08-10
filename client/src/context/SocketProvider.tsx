// "use client";

// import { createContext, useContext, useMemo } from "react";
// import { io, Socket } from "socket.io-client";

// const SocketContext = createContext<any>({})

// export const useSocket = () => {
//   const socket: {
//     socket: Socket
//   } = useContext(SocketContext)
//   return socket
// }

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const socket = useMemo(() => {
//     return io("http://localhost:8000")
//   }, [])

//   return (
//     <SocketContext.Provider value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   )
// }