"use client"
import {SessionProvider} from "next-auth/react"
interface Children{
  children:React.ReactNode;
 }
export const AuthProvider = ({children}:Children) => {
  return (
    <SessionProvider  >{children}</SessionProvider>
  )
}
 