import { useEffect, useState } from "react"
import { socket } from "./utils/io"

type Messages = {
  name: string
  message: string
  createdAt: Date
  userId: string | undefined
}

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)
  const [name, setName] = useState<string | null>(null)
  // const [userId, setUserId] = useState<string | undefined>(undefined)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Messages[]>([])

  console.log(messages)

  const askName = () => {
    const data = prompt("Please Enter youre name to begin - manner chatting please!")
    setName(data)
  }

  useEffect(() => {


    socket.on('connect', () => {
      setIsConnected(true)
      console.log("connected", socket.id)
      // setUserId(socket.id)
      askName()
    })
    socket.on('disconnet', () => {

    })

    // return () => {
    //   socket.off('connect', onConnect);
    //   socket.off('disconnect', onDisconnect);
    // };
  }, [])



  const onSend = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (!name) {
      return askName()
    }

    if (input.trim() === "") return

    const newMessage: Messages = {
      name: name!,
      message: input,
      createdAt: new Date(),
      userId: socket.id
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
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
                  m.userId === socket.id ? (
                    <div
                      key={index}
                      className="flex justify-end"
                    >
                      <div
                        className="inline-flex justify-end p-2 rounded-md bg-blue-500 max-w-[200px] break-words flex-col text-white"
                      >
                        <span className="text-xs underline">{m.name}</span>
                        <p className="text-sm">{m.message}</p>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex justify-end"
                    >
                      <div
                        className="inline-flex justify-end p-2 rounded-md bg-gray-200 max-w-[200px] break-words"
                      >
                        <p>{m.message}</p>
                      </div>
                    </div>
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
