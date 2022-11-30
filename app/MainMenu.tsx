'use client'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'
import { SiteContext } from '../context/SiteContext'
import {auth} from '../utils/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import {IoPersonCircle,IoPeopleCircle,IoSettingsSharp,IoLogOut,IoLogIn,IoFootball} from 'react-icons/io5'

export default function MainMenu() {
    const [user,setUser]=useState()
    const [login,setLogin]=useState<boolean>(true)
    return(
        <div className="flex flex-row group h-10 sticky top-0 left-0 z-50 w-full items-center bg-black bg-opacity-10 backdrop-blur-sm justify-start hover:bg-blue-800 text-white px-2 transition-all">
            <div className="flex flex-row h-full">
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/'}>PSO League</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/leagues'}>Leagues</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/teams'}>Teams</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/players'}>Players</Link>
            </div>
            <div className='flex flex-row ml-auto h-full items-center justify-start'>
                <div className='flex flex-col h-full'>
                    <Menu>
                        <Menu.Button as='div' className={'hover:bg-blue-900 relative transition-all h-full mx-2 p-2 cursor-pointer'}>
                            <IoPersonCircle className='text-2xl'/>
                            <div className='absolute bottom-2 right-2 w-2 aspect-square rounded-full bg-red-600'></div>
                        </Menu.Button>
                        <Menu.Items as='div' className={'absolute bg-black bg-opacity-10 backdrop-blur-sm group-hover:bg-blue-800 hover:bg-blue-800 transition-all top-10 right-2 flex flex-col items-end gap-y-2 p-2 rounded-b outline-none'}>
                            {login&&
                            <>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-4 w-full' href={'/'}>
                                    <IoPersonCircle className='text-2xl'/>
                                    <label className='cursor-pointer'>Profile</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full bg-red-600'></div>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-4 w-full' href={'/'}>
                                    <IoPeopleCircle className='text-2xl'/>
                                    <label className='cursor-pointer'>Team</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full bg-red-600'></div>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-4 w-full' href={'/settings'}>
                                    <IoSettingsSharp className='text-2xl'/>
                                    <label className='cursor-pointer'>Settings</label>
                                    <div className='absolute bottom-2 left-2 w-2 aspect-square rounded-full bg-red-600'></div>
                                </Link>
                            </Menu.Item>
                            <hr/>
                            <Menu.Item>
                                <Link className='flex flex-row relative items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-4 w-full' href={'/'}>
                                    <IoLogOut className='text-2xl'/>
                                    <label className='cursor-pointer'>Log Out</label>
                                </Link>
                            </Menu.Item>
                            </>
                            }
                            {!login&&
                            <>
                            <Menu.Item>
                                <Link className='flex flex-row items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-4 w-full' href={'/'}>
                                    <IoLogIn className='text-2xl'/>
                                    <label className='cursor-pointer'>Login</label>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex flex-row items-center justify-between space-x-2 hover:bg-blue-900 transition-all py-2 px-4 w-full' href={'/'}>
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

}