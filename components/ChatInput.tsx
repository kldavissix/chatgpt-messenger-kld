"use client"

import { db } from "@/firebase"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useState, FormEvent } from "react"
import { useSession } from "next-auth/react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

import toast from "react-hot-toast"
import ModelSelection from "./ModelSelection"
import useSWR from "swr"

type Props = {
  chatId: string
}

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("")
  const { data: session } = useSession()

  // useSWR to get model
  // Using the same key allows you to share data among
  // different components!1

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  })

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!prompt) return
    const input = prompt.trim()
    setPrompt("")

    // Create message prompt

    const jsTimestamp = Date.now().toString()

    const message: Message = {
      text: input,
      sortKey: `${jsTimestamp}-0`,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    }

    // Store message prompt in firebase

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    )

    // Toast Notification to say loading

    const notification = toast.loading("ChatGPT is thinking...")

    // Send the prompt to ChatGPT

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        jsTimestamp,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast Notification to say successful
      toast.success("ChatGPT has responded!", {
        id: notification,
      })
    })
  }

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          type="text"
          placeholder="Type your message here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className=" bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
        />
        <button
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded 
          disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!prompt || !session}
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="sm:hidden">
        <ModelSelection />
      </div>
    </div>
  )
}

export default ChatInput
