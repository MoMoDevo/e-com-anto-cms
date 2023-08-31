"use client"

import React, { useCallback } from 'react'
import { Button } from './ui/button'
import useLoginModal from '@/app/hooks/useLoginModal'
 

const SidebarTweetButton = () => {
  const user=false
  const loginModal=useLoginModal()
  const OpenModal= useCallback(() => {
    if(!user)
 
    loginModal.onOpen();
 
  }, [loginModal,user])

  return (
    <div>
        <Button onClick={OpenModal} className='bg-sky-300 w-4/6 md:w-full'>Tweet</Button>
    </div>
  )
}

export default SidebarTweetButton