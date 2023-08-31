import prismadb from "@/lib/prismaDb"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
import { User } from "@prisma/client"
 
export async function PATCH(req:Request, { params }: { params: { email: string } }){
    const session=await prismadb.user.findUnique({
        where:{email:params.email}
    })
    if(!session) return NextResponse.json("unathenticated",{status:403})
    const body=await req.json()
const {name,image,username,bio}=body
    try {
        const updatedUser= await prismadb.user.update({
            where: {
              email: params.email,
            },
            data: {
              image,
              name,
              username,
              bio
          }
       } )
       return NextResponse.json("updated the profile detaisl",{status:200})
    } catch (error) {
        return NextResponse.json("failed to update",{status:501})

        
    }
}
 
export async function GET(
    req: Request,
    { params }: { params: { email: string } }
  ) {
    try {
      if (!params.email) {
        return new NextResponse("Billboard id is required", { status: 400 });
        
      }
       
      const user = await prismadb.user.findUnique({
        where: {
          email: params.email
        },
       
      
      });
      {/*
      const folowingCounts=await prismadb.user.count({
        where:{
          email:params.email

        },followingIds:{
          has:id
        }

      })
      */}
    
      return NextResponse.json(user);
    } catch (error) {
      console.log('[BILLBOARD_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

  interface MainS{
    user:Session
}


interface Session{
    id:string;
    email:string;
    name:string

}
  export async function POST(req:Request, { params }: { params: { email: string } }){
    const session:MainS | null=await getServerSession(authOptions)
    try {
          
       
        const updatedUser=await prismadb.user.update({
           
            where:{
                email:params?.email
            },
            data:{
                followingIds:{
                    push:session?.user?.id
                }

            }
        })
        
    } catch (error) {
      return NextResponse.json("server error failed to like",{status:501})
        
    }
}
  

export async function DELETE(req:Request,{params}:{params:{email:string}}){
  try {
    const session:MainS | null=await getServerSession(authOptions)




    const currentUser=await prismadb.user.findUnique({
      where:{
        id:session?.user?.id
      }
    })
    if(!session)  return NextResponse.json("unatenticated",{status:403})
     

    if(session?.user?.email===params.email){
      console.log("hello")
      return NextResponse.json("You cant follow urself",{status:400})

    
    }else{
      const cheCkFollower=await prismadb.user.update({
        where:{
          email:params.email
        },data:{
          followingIds:currentUser?.followingIds.filter((id)=>id !==id
      )}

        
      })

    }
    
  } catch (error) {
    
  }

}