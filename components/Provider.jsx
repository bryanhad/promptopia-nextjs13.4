'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'

export default function Provider({children, session}) {
  return (
    // profides user session to every children 
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
