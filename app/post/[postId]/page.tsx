import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import CommentForm from "@/components/CommentForm"
import DetailsForm from "@/components/DetailsForm"
import prismadb from "@/lib/prismaDb"
import { getServerSession } from "next-auth"

 

const DetailsPage = async( { params }: { params: { postId: string} }) => {


  const {postId}=params
  const post=await prismadb.post.findUnique({where:{
    id:postId

  },
  include:{
    user:true,
    comments:true
  }
})
 {/*@ts-ignore*/}
console.log(post)

const session=await getServerSession(authOptions)
 
 

 

  return (
    <div className="flex flex-col w-full text-white">
      <p>{post?.body}</p>
      <p>created by:{post?.user.name}</p>
       {/*@ts-ignore*/}
      <p className="text-white">comment:{post?.comments?.map((comme)=>(
        <div className="flex" key={comme.id}>
          <p>comment:{comme.body}</p>

        </div>
      ))}</p>
      <hr />
     {/*@ts-ignore*/}
      <CommentForm postId={postId}   />
     

    

    </div>
  )
}

export default DetailsPage