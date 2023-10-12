"use client"

import React from "react"

import { ChildProcess } from "child_process"
import { Session } from "next-auth"
import { SessionProvider as Provider } from "next-auth/react"

type IProps = {
  children: React.ReactNode
  session: Session | null
}

export function SessionProvider({ children, session }: IProps) {
  return <Provider>{children}</Provider>
}
