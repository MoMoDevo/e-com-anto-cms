"use client"
 import Avatar from '@/components/Avatar'
import Button from '@/components/ui/ButtonComponent'
import prismadb from '@/lib/prismaDb'
import { getServerSession } from 'next-auth'
 import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { BillboardForm } from '@/components/EditForm'
import { redirect, useRouter } from 'next/navigation'
import useEditModalStore from '@/app/hooks/useEditModal'
import { data } from 'autoprefixer'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Stringifier } from 'postcss'
interface Ids{

  ids: (string | undefined)

}
 interface  UserInterface{
  id?:string | null
  name?:string;
  username?:string;
  image?:null | undefined | string;
 
  bio?:string;
  email:string;
  followingIds:Ids[]
  






}

interface MainS{
  user:Session
}


interface Session{
  id:string;
  email:string;
  name:string | null;
  image:string;
  bio?:string;


}
 
const Details = ({
  params
}: {
  params: { email: string }
}) => {
  const {onClose,onOpen,isOpen}=useEditModalStore()
  const {data:session}=useSession()
  const router=useRouter()
  
  const [getUserDetail,setUserDetail]=useState< UserInterface | null>()
  console.log(getUserDetail)
  const cuurentUser=getUserDetail?.email===session?.user?.email
 
     
 
       useEffect(()=>{
    const fetcData=async()=>{
      try {
        const res=await axios.get(`/api/users/${params.email}`)
         setUserDetail(res.data)
        
      } catch (error) {
        
      }
    }
    fetcData()
  },[])
  const openedit=()=>{
    if(isOpen===true){
      onClose()
    }
    else{
      onOpen()
    }
    

  }
   {/*

  const checkFollowing=useMemo(()=>{
    const list=cuurentUser.
  },[])
  */}
 
   
  const handelFoloow=async()=>{

//@ts-ignore

    await axios.post(`/api/users/${params.email}`,session?.user?.id)
    
    
  }



  const stopFollowign=async()=>{
    //@ts-ignore
   await axios.delete(`/api/users/${params.email}`,session?.user?.id)

  }
  //@ts-ignore
  const isAlredyFollowing=getUserDetail?.followingIds.includes(session?.user?.id)
  
    
  
  
    
  return (
    <>
    <div className="flex flex-col relative ">
         <div className="bg-neutral-700 h-44 ">
        
        <div className="absolute -bottom-6 left-4 flex space-x-2 items-center">
        <Image src={getUserDetail?.image || "/images/placeholder.png"} alt='img' className='rounded-full' height={50} width={50}/>
 
        <p className='self-end capitalize text-white'>{getUserDetail?.name}</p>
      
        
          
         
        </div>
        <div className="flex">
        </div>
        </div>
{getUserDetail?.email ===session?.user?.email ? (      <div onClick={openedit} className='ml-auto text-white z-50 overflow-y-scroll'> <Link className='text-sm pr-2 text-white' href="">{isOpen?"Hide" :"Edit"}</Link></div>
):   ( <button onClick={handelFoloow} className={isAlredyFollowing? "hidden" :'text-white ml-auto items-center'}>Folloow</button>)}    

 

        
          
         
     
    

    </div>
    {isOpen && ( <div className="flex">


<BillboardForm initialData={getUserDetail}/>
</div>)}
<div className="flex">
  <p className='text-yellow-500 text-bold'>{getUserDetail?.followingIds.length}</p>

</div>
{/*@ts-ignore*/}
 
{isAlredyFollowing ? (<button onClick={stopFollowign}>unfollow</button>):null}
 

      

 
    



    </>
  )
}

export default Details