"use client"

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons";

import MobileMenu from "./MobileMenu";
import { useCallback } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props{
   icon:IconType;
   href:string;
   label:string;
   active?:boolean
   onCLick?:()=>void;
   auth:boolean;



}

const SidebarItem = ({icon:Icon,href,label,active,onCLick,auth}:Props) => {
 const {data:session}=useSession()
  const loginModdal=useLoginModal()
  const router=useRouter()
  const handleClick=useCallback(()=>{
    if(auth && !session?.user ){
      loginModdal.onOpen()

    }
   else if (href) {
    router.push(href);
  }
  

  },[auth,loginModdal,router,session,href])

  return (
    <div className=  "flex flex-row items-center"  onClick={handleClick}  >
      <div   className= {`active ? bg-slate-400  : rounded-full h-14 w-14
       flex items-center hover:bg-slate-400 
       lg:hidden p-4 justify-center `}
      
     >
        <Icon  onClick={()=>router.push(href)}  />

      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
       </div>



     

    </div>
  )
}

export default SidebarItem