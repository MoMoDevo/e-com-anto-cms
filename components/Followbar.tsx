 
 "use client"
 
import { CalendarDays } from "lucide-react"
 
import {
  Avatar,
 
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


import axios from "axios";
import { useEffect, useState } from "react";
 
import Image from "next/image";
import Button from "./ui/ButtonComponent";
import { useParams } from "next/navigation";
import Link from "next/link";

 
interface USER{
  id?:string,
  username:string;
  email:string;
  image:any

}
 



const FollowBar =() => {
  

  const [users,setUsers]=useState <USER []>([])
  
  useEffect(()=>{
    const fetchData=async()=>{
      const res=await axios.get("/api/users")
      setUsers(res.data)
   
    }
    fetchData()

  },[])

 
 

   
  

  return (
    <div className="px-6 py-4 hidden lg:block h-auto">
      <div className="bg-neutral-800 rounded-xl p-1">
        <h2 className="text-white text-xl font-semibold text-center">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user)=>(
            
            <div className="flex gap-1 outline-none flex-wrap items-center" key={user.id}>
          
            <HoverCard>
      <HoverCardTrigger asChild>
           <div className="flex gap-x-2 items-center">     <Image  src={user?.image  || '/images/placeholder.png'} width={40}  height={40}  alt="k" className="rounded-full" />
       <h4 className="text-sm text-white font-semibold">{user?.username}</h4>
       </div> 
 
      </HoverCardTrigger>
      <HoverCardContent className="w-55">
        <Link href={`/profile/${user?.email}`}>
        <div className="flex justify-between items-center gap-x-1">
          <Avatar>
          <Image  src={user?.image  || '/images/placeholder.png'} width={40}  height={40}  alt="k" className="rounded-full" />

            
          </Avatar>
          <div className="flex">
          <p className="capitalize">{user?.username.split("",9)}</p>


          </div>
         
        </div>
        </Link>
      </HoverCardContent>
    </HoverCard>
           
 

            

            </div>
          ))}
        
      
          
           
        
          
        </div>
      </div>
    </div>
  );
};

export default FollowBar;