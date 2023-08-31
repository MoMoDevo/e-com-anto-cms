import prismadb from "@/lib/prismaDb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

interface MainS{
    user:Session
}


interface Session{
    id:any;
    email:string;
    name:string

}

