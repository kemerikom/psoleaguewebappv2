import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import {SiteContext} from '../context/SiteContext'
import {useEffect, useState} from 'react'
import {auth} from '../utils/firebase/config'
import { onAuthStateChanged} from 'firebase/auth'
import {logoutUser} from '../utils/firebase/logoutUser'
import MainMenu from '../components/MainMenu'
import { notificationType, playerType } from '../typings'
import Head from 'next/head'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [user,setUser]=useState<any>()
  const [uid,setUid]=useState<string|null>(null)
  const [login,setLogin]=useState<boolean>(false)
  const [notifications, setNotifications] =useState <notificationType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const siteData ={
    user,
    uid,
    login,
    notifications,
    setNotifications
  }
  onAuthStateChanged(auth,async(user)=>{
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
      setUser(user)
    }else{
      setLogin(false)
      setUid(null)
    }
  })
  return (
    <SiteContext.Provider value={siteData}>
      <Head>
        <title>Pro Soccer League</title>
      </Head>
      <MainMenu/>
      {loading && 
      <div className='flex w-screen h-screen items-center justify-center'>
        <iframe className='flex w-32' src="https://embed.lottiefiles.com/animation/10052"></iframe>
      </div>
      }
      {!loading && 
        <Component {...pageProps} />
      }
      
    </SiteContext.Provider>

  )
}

export default MyApp

