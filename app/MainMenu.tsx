'use client'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'
import { SiteContext } from '../context/SiteContext'
import {IoPersonCircle,IoPeopleCircle,IoSettingsSharp,IoLogOut,IoLogIn,IoFootball} from 'react-icons/io5'
import { logoutUser } from '../utils/firebase/logoutUser'

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
    const siteData:any=useContext(SiteContext)
    const [regions,setRegions]=useState<regionNames[]>([])
    const [leagues,setLeagues]=useState<leagueNames[]>([])
    /* useEffect(()=>{
        if(siteData.login){
            getLeagues()
            getRegions()
        }
    },[siteData.login]) */
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
                            <IoPeopleCircle className='text-2xl'/>
                            <div className='absolute bottom-2 right-2 w-2 aspect-square rounded-full bg-red-600'></div>
                        </Menu.Button>
                        <Menu.Items as='div' className={'absolute bg-black bg-opacity-10 backdrop-blur-sm group-hover:bg-blue-800 hover:bg-blue-800 transition-all top-10 right-0 flex flex-col items-end gap-y-2 p-2 rounded-b outline-none'}>
                        {regions.length>0&&
                            <>
                            <h3 className='text-center w-full'>Regions</h3>
                            <hr/>
                            {regions.map((region)=>{
                                return(
                                <Menu.Item key={region._id}>
                                    <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/'}>
                                        <div className='flex items-center justify-center w-8 aspect-square rounded-full'>
                                            <img src='teamlogo.png' className='flex w-full aspect-square rounded-full object-contain'></img>
                                        </div>
                                        <label className='cursor-pointer'>{region.name}</label>
                                    </Link>
                                </Menu.Item>
                                )
                            
                            })}
                            <hr/>
                            </>
                            }
                            {leagues.length>0&&
                            <>
                            <h3 className='text-center w-full'>Leagues</h3>
                            <hr/>
                            {leagues.map((league)=>{
                                return(
                                <Menu.Item key={league._id}>
                                    <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={`/myleagues/${league._id}`}>
                                        <div className='flex items-center justify-center w-8 aspect-square rounded-full'>
                                            <img src='teamlogo.png' className='flex w-full aspect-square rounded-full object-contain'></img>
                                        </div>
                                        <label className='cursor-pointer'>{league.name}</label>
                                    </Link>
                                </Menu.Item>
                                )
                            
                            })}
                            </>
                            }
                        </Menu.Items>
                    </Menu>
                    <Menu>
                        <Menu.Button as='div' className={'hover:bg-blue-900 relative transition-all h-full mx-2 p-2 cursor-pointer'}>
                            <IoPersonCircle className='text-2xl'/>
                            <div className='absolute bottom-2 right-2 w-2 aspect-square rounded-full bg-red-600'></div>
                        </Menu.Button>
                        <Menu.Items as='div' className={'absolute bg-black bg-opacity-10 backdrop-blur-sm group-hover:bg-blue-800 hover:bg-blue-800 transition-all top-10 right-2 flex flex-col items-end gap-y-2 p-2 rounded-b outline-none'}>
                            {siteData.login&&
                            <>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/'}>
                                    <IoPersonCircle className='text-2xl'/>
                                    <label className='cursor-pointer'>Profile</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full bg-red-600'></div>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/'}>
                                    <IoPeopleCircle className='text-2xl'/>
                                    <label className='cursor-pointer'>Team</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full bg-red-600'></div>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/settings'}>
                                    <IoSettingsSharp className='text-2xl'/>
                                    <label className='cursor-pointer'>Settings</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full bg-red-600'></div>
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
                                <Link className='flex flex-row items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-2 w-full rounded' href={'/'}>
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
    }
    async function getLeagues(){
        fetch(`${process.env.appPath}/api/getLeaguesByUidApi`)
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setLeagues(data)
        })
    }
    async function getRegions() {
        fetch(`${process.env.appPath}/api/getRegionsByUidApi`)
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setRegions(data)
        })
    }
}