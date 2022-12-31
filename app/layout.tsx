'use client'
import '../styles/globals.css'
import MainMenu from "./MainMenu"
import { SiteContext } from '../context/SiteContext'
import { useEffect, useState } from 'react'
import { onAuthStateChanged} from 'firebase/auth'
import { logoutUser } from '../utils/firebase/logoutUser'
import {auth} from '../utils/firebase/config'


export default function RootLayout({children}:{children: React.ReactNode}) {
  const [user,setUser]=useState<boolean>(false)
  const [uid,setUid]=useState<string|null>(null)
  const [login,setLogin]=useState<boolean>(false)

  const siteData ={
    user,
    uid,
    login
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
      fetch(`${process.env.appPath}/api/getUserUidApi`)
      .then((res)=>{
        const resData=res.json()
        return resData
      })
      .then((data)=>{
        if(!data)logoutUser()
      })
      setLogin(true)
      setUid(user.uid)
    }else{
      setLogin(false)
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
