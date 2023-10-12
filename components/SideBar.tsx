"use client"

import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, query, orderBy } from "firebase/firestore"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"
import ModelSelection from "./ModelSelection"
import Image from "next/image"

const SideBar = () => {
  const { data: session } = useSession()

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  )

  return (
    <div className="p-2 flex flex-col h-screen ">
      <div className="flex-1">
        <div>
          <NewChat />
          <div>
            <div className="hidden sm:inline ">
              <ModelSelection />
            </div>
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="mt-2 animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            {/* Map through the CharTows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <div
          className="flex cursor-pointer ml-2 mb-2 items-center gap-2 text-white hover:opacity-50"
          onClick={() => signOut()}
        >
          <div>
            <Image
              src={session.user?.image!}
              alt="Profile Picture"
              height={32}
              width={32}
              style={{ borderRadius: "9999px" }}
            />
          </div>
          <p className="text-sm truncate">{session.user?.name}</p>
        </div>
      )}
    </div>
  )
}

export default SideBar
