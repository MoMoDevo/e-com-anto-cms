"use client"
import Link, { useRouter } from "next/navigation"
import Header from "@/components/Header"
import {useSession} from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import Image from "next/image"
const Home =  () => {
  const [body,setBody]=useState("")
  const {data:session}=useSession()
  const [getPost,setPosts]=useState<any[]>([])
  console.log(getPost)
  const [addDirect,setSAddDirect]=useState(false)
  
  const router=useRouter()

  const getData=async ()=>{
    try {
      const res=await axios.get("/api/post")
      setPosts(res.data)


      
    } catch (error) {

      toast.error("failed to fetch posts")
      
    }
  }

  useEffect(()=>{
    getData()
    
  },[])


  const submitHnadler=async(e:any)=>{
    e.preventDefault()
    try {
      //@ts-ignore
      const res=await axios.post("/api/post",{body,userId:session?.user?.id})
      router.refresh()
    
      setSAddDirect(addDirect)
   

      toast.success("post created!")
      
    } catch (error) {
      toast.error("faield to create a post")
      
    }
  }
   
  return (
    <>
    <div className="pt-12  h-12">
      <form onSubmit={submitHnadler}>
        <input type="text" placeholder="post" value={body} onChange={(e:any)=>setBody(e.target.value)}/>
        <button type="submit">Submit</button>

      </form>
      <hr color="white" />
      {getPost.length >1 && (getPost.map((post)=>(
        <div className="flex text-white h-10 flex-col border-solid  justify-between " key={post.id}>
          <p>{post.body}</p>
          <p>created by:{post.user.email}</p>
          <div className="self-end" >

          <Image width={40} onClick={()=>router.push(`/post/${post.id}`)}  height={40}  className="rounded-md"  src={post.user.image} alt="author pictre"/>
          </div>
         
          <hr />


        </div>
      )))}



 


    </div>
    </>
  )
}

export default Home