 
  import prismadb from "@/lib/prismaDb";
import Image from "next/image";
 
const Navbar = async () => {
  const posts=await prismadb.post.findMany({})
 


 
  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
      {posts.map((post)=>(

        <div className="ml-auto flex items-center space-x-4" key={post.id}>
         <h1> { post.title}</h1>
         <h1> { post.desc}</h1>
         <Image src={post.imageUrl} fill alt="post image"/>
        </div>
      ))}

      
        
       k
      </div>
    </div>
  );
};
 
export default Navbar;