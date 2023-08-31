import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'

const AllUserss =async () => {
    const session=getServerSession(authOptions)
    console.log(session)
  return (
    <div>
      <p>h</p>
      <pre> {JSON.stringify(session)}</pre>
    </div>
  )
}

export default AllUserss