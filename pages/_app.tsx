import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {SiteContext} from '../context/SiteContext'
import {useState} from 'react'
import {auth} from '../utils/firebase/config'
import { onAuthStateChanged} from 'firebase/auth'
import {logoutUser} from '../utils/firebase/logoutUser'
import MainMenu from '../components/MainMenu'

function MyApp({ Component, pageProps }: AppProps) {
  const [user,setUser]=useState<boolean>(false)
  const [uid,setUid]=useState<string|null>(null)
  const [login,setLogin]=useState<boolean>(false)
  const siteData ={
    user,
    uid,
    login
  }
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
    <SiteContext.Provider value={siteData}>
      <MainMenu/>
      <Component {...pageProps} />
    </SiteContext.Provider>

  )
}

export default MyApp
