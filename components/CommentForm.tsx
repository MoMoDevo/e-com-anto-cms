"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
 

 interface Props{
    postId:string;
   
 }
 
const CommentForm = ({postId}:Props  ) => {
    const router=useRouter()
    const[body,setBody]=useState("")
    const{data:session}=useSession()

  //@ts-ignore
const userId=session?.user?.id


const handelSubmit=async(e:any)=>{
    e.preventDefault()
    try {
        //@ts-ignore
     await axios.post("/api/comment",{body,userId,postId})
     setBody("")
    router.refresh()
    
    } catch (error) {
        toast.error("failed to comment")
        
    }


}

 
 
  return (
        <form onSubmit={handelSubmit}>
    <div className="mt-12">
         <input type="text" value={body} onChange={(e:any)=>setBody(e.target.value)} placeholder="comment" name="comment"/>
            <button  type="submit">comment</button>

    </div>
        </form>
  )
}

export default CommentForm