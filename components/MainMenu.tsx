import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { useContext, useState, useEffect } from 'react'
import { SiteContext } from '../context/SiteContext'
import {IoPersonCircle,IoPeopleCircle,IoSettingsSharp,IoLogOut,IoLogIn,IoFootball, IoNotifications} from 'react-icons/io5'
import { logoutUser } from '../utils/firebase/logoutUser'
import {useRouter} from 'next/router'
import { notificationType } from '../typings'

type leagueNames={
    _id:string,
    name:string,
    logo:string
}

type regionNames={
    _id:string,
    name:string,
    logo:string
}

export default function MainMenu() {
    const router = useRouter()
    const siteData:any=useContext(SiteContext)
    const [regions,setRegions]=useState<regionNames[]>([])
    const [leagues,setLeagues]=useState<leagueNames[]>([])
    const [notification, setNotification] = useState<boolean>(false)
    const {notifications} = siteData
    useEffect(() => {
        if (siteData){
            if (notifications){
                if(!notifications.find((notification: notificationType)=>notification.id == '1')){
                    setNotification(true)
                }else{
                    setNotification(false)
                }
            }else{
                setNotification(false)
            }
        }
        else{
            setNotification(false)
        }
    },[siteData])
    return(
        <div className="flex flex-row group h-10 sticky top-0 left-0 z-50 w-full items-center bg-black bg-opacity-10 backdrop-blur-sm justify-start hover:bg-blue-800 text-white px-2 transition-all">
            <div className="flex flex-row h-full">
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/'}>PSO League</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/leagues'}>Leagues</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/teams'}>Teams</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/players'}>Players</Link>
            </div>
            <div className='flex flex-row ml-auto h-full items-center justify-start'>
                <div className='flex flex-row h-full'>
                    <Menu as='div' className='relative whitespace-nowrap'>
                        <Menu.Button as='div' className={'hover:bg-blue-900 relative transition-all h-full mx-2 p-2 cursor-pointer'}>
                            <IoNotifications className='text-2xl'/>
                            {notification &&
                                <div className='flex absolute bottom-1 right-1 w-4 h-4 aspect-square rounded-full bg-red-600 items-center justify-center text-xs'>
                                    {notifications.length>=9? '9+': notifications.length}
                                </div>
                            }
                        </Menu.Button>
                        <Menu.Items as='div' className={'absolute bg-black bg-opacity-10 backdrop-blur-sm group-hover:bg-blue-800 hover:bg-blue-800 transition-all top-10 right-0 flex flex-col items-end gap-y-2 p-2 rounded-b outline-none'}>
                            {siteData.notifications.map((notification: notificationType) => {
                                return (
                                    <Link
                                    key={notification.id}
                                    href={notification.href}
                                    className='p-2 rounded hover:bg-blue-900 transition-all'
                                    >
                                        {notification.title}
                                    </Link>
                                )
                            })}
                        </Menu.Items>
                    </Menu>
                    <Menu>
                        <Menu.Button as='div' className={'hover:bg-blue-900 relative transition-all h-full mx-2 p-2 cursor-pointer'}>
                            {siteData.user!=null&&siteData.user.photoURL&&
                                <img src={siteData.user.photoURL} className='aspect-square rounded-full w-6 h-6'></img>
                            }
                            {!siteData.user&&
                                <IoPersonCircle className='text-2xl'/>
                            }
                            {siteData.user!=null&&!siteData.user.photoURL&&
                                <IoPersonCircle className='text-2xl'/>
                            }
                            {/* <div className='absolute bottom-2 right-2 w-2 aspect-square rounded-full bg-red-600'></div> */}
                        </Menu.Button>
                        <Menu.Items as='div' className={'absolute bg-black bg-opacity-10 backdrop-blur-sm group-hover:bg-blue-800 hover:bg-blue-800 transition-all top-10 right-2 flex flex-col items-end gap-y-2 p-2 rounded-b outline-none'}>
                            {siteData.login&&
                            <>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/'}>
                                    <IoPersonCircle className='text-2xl'/>
                                    <label className='cursor-pointer'>Profile</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full'></div>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/myteam'}>
                                    <IoPeopleCircle className='text-2xl'/>
                                    <label className='cursor-pointer'>My Team</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full'></div>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/settings'}>
                                    <IoSettingsSharp className='text-2xl'/>
                                    <label className='cursor-pointer'>Settings</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full'></div>
                                </Link>
                            </Menu.Item>
                            <hr/>
                            <Menu.Item>
                                <button onClick={logOutButton} className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded'>
                                    <IoLogOut className='text-2xl'/>
                                    <label className='cursor-pointer'>Log Out</label>
                                </button>
                            </Menu.Item>
                            </>
                            }
                            {!siteData.login&&
                            <>
                            <Menu.Item>
                                <Link className='flex flex-row items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/auth/login'}>
                                    <IoLogIn className='text-2xl'/>
                                    <label className='cursor-pointer'>Login</label>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/auth/signup'}>
                                    <IoFootball className='text-2xl'/>
                                    <label className='cursor-pointer'>Sign Up</label>
                                </Link>
                            </Menu.Item>
                            </>
                            }
                        </Menu.Items>
                    </Menu>
                </div>

            </div>
        </div>
    )
    async function logOutButton(){
        await logoutUser()
        fetch(`${process.env.appPath}/api/logoutUserApi`,{method:'POST'})
        router.push('/auth/login')

    }
}