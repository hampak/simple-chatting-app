import { useEffect, useState } from "react"
import { socket } from "./utils/io"

type Messages = {
  name: string
  message: string
  createdAt?: Date
  userId?: string | undefined
  type: string
}

// type Users = {
//   name: string,
//   userId?: string | undefined
// }

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)
  const [name, setName] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Messages[]>([])
  // const [activeUsers, setActiveUsers] = useState<Users | Users[]>([])

  console.log(messages)

  const askName = () => {
    const data = prompt("Please enter your name to begin - manner chatting please!")

    if (data) {
      socket.emit("register", data)
      setName(data)
    } else {
      alert("Name cannot be blank")
      askName()
    }
  }

  useEffect(() => {

    socket.on('connect', () => {
      setIsConnected(true)
      console.log("connected", socket.id)
    })

    if (!name) {
      askName()
    }

    socket.on('message', (message) => {
      // console.log(message.data.name)
      setMessages((prevState) => prevState.concat(message))
    })

    socket.on('welcomeMessage', (welcomeMessage) => {
      setMessages((prevState) => prevState.concat(welcomeMessage))
    })

    socket.on("disconnectUser", (disconnectMessage) => {
      setMessages((prevState) => prevState.concat(disconnectMessage))
    })

    return () => {
      socket.off('connect');
      socket.off("message")
      socket.off("welcomeMessage")
      socket.off('disconnectUser');
    };
  }, [])



  const onSend = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (input.trim() === "") return

    const newMessage: Messages = {
      name: name!,
      message: input,
      createdAt: new Date(),
      userId: socket.id,
      type: "normal"
    }

    socket.emit('sendMessage', newMessage)
    setInput("")
  }

  return (
    <>
      <div className="bg-gray-100 flex flex-col w-[500px] mx-auto h-screen justify-between pb-2 pt-12 px-2 relative">
        {isConnected ? (
          <>
            <div className="absolute top-4 left-2 bg-green-400 rounded-full">
              <div className="bg-green-500 animate-ping w-2 h-2 rounded-full">
              </div>
            </div>
            <span className="absolute text-xs top-3 left-6">you're connected - start chatting!</span>
          </>
        ) : (
          <>
            <div className="absolute top-4 left-2 bg-red-400 rounded-full">
              <div className="bg-red-500 animate-ping w-2 h-2 rounded-full">
              </div>
            </div>
            <span className="absolute text-xs top-3 left-6">you're not connected - try refreshing</span>
          </>
        )}
        <div className="space-y-2 overflow-y-auto pt-2 pb-6 border-t-2 h-full">
          {
            messages.map((m, index) => (
              <>
                {
                  m.type === "normal" ? (
                    <>
                      {
                        m.userId === socket.id ? (
                          <div
                            key={index}
                            className="flex flex-col items-end"
                          >
                            <div
                              className="inline-flex justify-end p-2 rounded-md bg-blue-500 max-w-[200px] break-words flex-col text-white space-y-1"
                            >
                              <span className="text-xs underline">{m.name}</span>
                              <p className="text-sm">{m.message}</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {
                                new Date(m.createdAt!).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                  timeZone: "Asia/Seoul"
                                })
                              }
                            </p>
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="flex flex-col items-start"
                          >
                            <div
                              className="inline-flex justify-start p-2 rounded-md bg-gray-300 max-w-[200px] break-words flex-col text-black space-y-1"
                            >
                              <span className="text-xs underline">{m.name}</span>
                              <p className="text-sm">{m.message}</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              {
                                new Date(m.createdAt!).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                  timeZone: "Asia/Seoul"
                                })
                              }
                            </p>
                          </div>
                        )
                      }
                    </>
                  ) : (
                    <>
                      <div
                        key={index}
                        className="w-full flex justify-center"
                      >
                        <p className="bg-gray-400 text-white text-full px-2 rounded-lg text-sm">
                          {
                            m.name === undefined ? "" : (
                              <>{m.message}</>
                            )
                          }
                        </p>
                      </div>
                    </>
                  )
                }
              </>
            ))
          }
        </div>
        <form
          className="w-full flex space-x-2"
          onSubmit={onSend}
        >
          <input
            className="w-full border border-black rounded-md px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!socket.connected}
          />
          <button
            className="bg-black text-white p-2 rounded-md"
            type="submit"
            disabled={!socket.connected}
          >
            Send
          </button>
        </form>
      </div >
    </>
  )
}

export default App
