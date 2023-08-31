import prismadb from "@/lib/prismaDb";

export async function fetchAllposts(){
    const res=await fetch("/api/post")
    return res.json()
}
console.log(fetchAllposts())