import axios from "axios";
export async function getAllusers(){
    const res=await axios.get("/users")
    return res.data

}