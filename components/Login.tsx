"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"

const Login = () => {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://uploads-ssl.webflow.com/621396eaae0610d2e24c450e/63d01548c5b3156b13a40e1f_ChatGPT-Feature-1200x900.png"
        width={300}
        height={300}
        alt="logo"
      />
      <button
        className="text-white font-bold text-3xl animate-pulse"
        onClick={() => signIn("google")}
      >
        Sign In to use ChatGPT
      </button>
    </div>
  )
}

export default Login
