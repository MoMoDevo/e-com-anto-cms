"use client"

import Sidebar from '@/components/Sidebar'
import './globals.css'
 
import { Inter } from 'next/font/google'
import Followbar from '@/components/Followbar'
import RegisterModal from '@/components/main/registerModal'
import LoginModal from '@/components/main/LoginModal'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/components/AuthProvider'
 
  
  
 
const inter = Inter({ subsets: ['latin'] })
 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    

    <html lang="en" className='bg-black'>
      <body className={inter.className}>
          <AuthProvider>
      <Toaster />
      <div className="h-screen bg-black  w-screen">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl outline-none">
        <div className="grid grid-cols-4 h-full outline-none">
          <Sidebar />
          <div 
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800
          ">
            <RegisterModal/>
            <LoginModal/>

            
            
            {children}
          </div>
          <Followbar />
        </div>
     </div>
    </div>
     
            </AuthProvider>
         </body>
    </html>
 
  )
}
