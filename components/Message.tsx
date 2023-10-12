import { DocumentData } from "firebase/firestore"
import Image from "next/image"

type Props = {
  message: DocumentData
}

const Message = ({ message }: Props) => {
  const isChatGPT = message.user.name == "ChatGPT"

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto items-start">
        <div>
          <Image src={message.user.avatar} alt="" height={32} width={32} />
        </div>

        <div className="flex-1">
          <p className="pt-1 text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  )
}

export default Message
