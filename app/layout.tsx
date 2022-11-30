'use client'
import '../styles/globals.css'
import MainMenu from "./MainMenu"
import { SiteContext } from '../context/SiteContext'
import { useEffect, useState } from 'react'
import {auth} from '../utils/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'



export default function RootLayout({children}:{children: React.ReactNode}) {
  const [user,setUser]=useState<any>()
  const [uid,setUid]=useState<string|null>(null)

  const siteData ={
    user,
    setUser,
    uid,
    setUid
  }
/*   try {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user.uid)
      }else{
        setUser(false)
      }
    })
  } catch (error) {
    setUser(false)
  } */
  onAuthStateChanged(auth,(user)=>{
    if(user){
      setUid(user.uid)
    }else{
      setUid(null)
    }
  })
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <SiteContext.Provider value={siteData}>
        <body className='flex flex-col w-full'>
          <MainMenu/>
          {children} 
        </body>
      </SiteContext.Provider>

    </html>
  )
}
