"use client"
import { AiFillBank } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
 import { usePathname } from 'next/navigation'
 import {signOut, useSession} from "next-auth/react"
import React from 'react'
import SidebarItem from './SidebarItem'
import SidebarLogo from './SidebarLogo'
import { Button } from "./ui/button";
import SidebarTweetButton from "./SidebarTweetButton";
import { LogOut } from "lucide-react";

 
const Sidebar = () => {
  const {data:session}=useSession()

 
  const pathName=usePathname()
  
  const items=[{
    href:"/",
    label:"Home",
    icon:AiFillBank,
    active:pathName==="/",
    auth:false

  },
  {
    href:`/profile/${session?.user?.email}`,
    label:"Profile",
    icon:BiUser,
    active:pathName===`/profile/${session?.user?.email}`,
    auth:true
    

  },
  {
    href:"/notification",
    label:"Notificatios",
    icon:AiFillBell,
    active:pathName==="/notifications",
    auth:true

  },]
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            <SidebarLogo />
           
            {items.map((item) => (
              <SidebarItem
                key={item.href}
               
                href={item.href} 
                icon={item.icon} 
                label={item.label}
                active={item.active}
                auth={item.auth}
              />
            ))}
            <SidebarTweetButton/>
            {session?.user &&(  <Button variant={"outline"} className="ml-2 mt-3 hover:bg-slate-500" onClick={()=>signOut()}><LogOut/></Button>)}

          
            </div>
            </div>
            </div>
            
  )
}

export default Sidebar