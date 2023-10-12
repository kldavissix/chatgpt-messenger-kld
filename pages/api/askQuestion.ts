import admin from "firebase-admin"
import query from "@/lib/queryApi"
import { NextApiRequest, NextApiResponse } from "next"
import { adminDB } from "@/firebaseAdmin"

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, jsTimestamp, chatId, model, session } = req.body

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" })
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid ChatId!" })
  }

  // ChatGPT Query

  const response = await query(prompt, chatId, model)

  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    sortKey: `${jsTimestamp}-1`,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  }

  await adminDB
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message)

  // Return the answer as text

  res.status(200).json({ answer: message.text })
}
