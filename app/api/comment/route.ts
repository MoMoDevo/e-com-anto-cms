import prismadb from "@/lib/prismaDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req:Request){
    const session=await getServerSession(authOptions)
  
    const reqBody=await req.json()
    try{

        const {userId,body,postId}=reqBody
        const commentM=await prismadb.comment.create({
            data:{
                    //@ts-ignore
                userId:session?.user?.id,
                postId,
                body

            }
        
        })
        return NextResponse.json(commentM,{status:201})


    }catch{
        return  NextResponse.json("faild to comment",{status:500})
    }
}