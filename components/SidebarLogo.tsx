"use client"
import { Twitter } from "lucide-react";
import Link from "next/link";


const SidebarLogo = () => {
 
  
 
  
  return (
    <Link href={"/"}>
    <div 
       className="
       rounded-full 
        h-14
        w-14
        p-4 
        flex 
        items-center 
        justify-center 
        hover:bg-blue-300 
        hover:bg-opacity-10 
        cursor-pointer
        ">
      <Twitter color="skyblue"/>
    </div>
      </Link>
  );
};

export default SidebarLogo;