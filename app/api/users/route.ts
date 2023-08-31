import prismadb from "@/lib/prismaDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req:Request){
    const session=await getServerSession(authOptions)
    try {
        const users=await prismadb.user.findMany({
            orderBy:{
                createdAt:"asc"
            },
            where:{
                NOT:{
                    name:session?.user?.name
                }

            }
        })
      
        return NextResponse.json(users,{status:200})
        
    } catch (error) {
        return NextResponse.json("failed to load resourses",{status:501})

        
        
    }
}