import prismadb from "@/lib/prismaDb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { Session } from "inspector"

export async function POST(req:Request){
    const session=await getServerSession(authOptions)

    try {
        const reqBody=await req.json()
        const {body}=reqBody
        const post=await prismadb.post.create({
            data:{
                body,
                //@ts-ignore
                userId:session?.user?.id


            }
        })
        return NextResponse.json("created!",{status:201})
        
    } catch (error) {
        console.log("faield to creata a post ")
        
    }
}
export async function GET(req:Request){
    const session=await getServerSession(authOptions)
    
    try {
        const posts=await prismadb.post.findMany({
          
            include:{
                //@ts-ignore
        user:true,
        comments:true
          
            }
            
          
      
        })
        return  NextResponse.json(posts,{status:200})


        
    } catch (error) {
        
    }
}