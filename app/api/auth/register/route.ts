import prismadb from "@/lib/prismaDb"
import bcrypt from "bcrypt"
import { NextResponse } from 'next/server'

export async function POST(req:Request){
    const reqBody=await req.json()
    try {
        const {email,password,username,name}=reqBody
        const hashedPassword=await bcrypt.hash(password,8)
        const user=await prismadb.user.create({
            data:{email,username,hashedPassword,name

            }
        })
        return   NextResponse.json(user,{status:201})

        
    } catch (error) {
        
    }
}