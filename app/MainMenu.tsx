'use client'
import Link from 'next/link'
import { Menu } from '@headlessui/react'

export default function MainMenu() {
    return(
        <div className="flex flex-row group h-10 sticky top-0 left-0 z-50 w-full items-center bg-black bg-opacity-10 backdrop-blur-sm justify-start hover:bg-blue-800 text-white px-2 transition-all">
            <div className="flex flex-row h-full">
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/'}>PSO League</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/leagues'}>Leagues</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/'}>Teams</Link>
                <Link className='flex mx-1 h-full p-2 hover:bg-blue-900 transition-all' href={'/'}>Players</Link>
            </div>
            <div className='flex flex-row ml-auto h-full items-center justify-start'>
                <div className='flex flex-col h-full'>
                    <Menu>
                        <Menu.Button className={'hover:bg-blue-900 transition-all h-full mx-2 p-2'}>Profile</Menu.Button>
                        <Menu.Items as='div' className={'absolute bg-black bg-opacity-10 backdrop-blur-sm group-hover:bg-blue-800 hover:bg-blue-800 transition-all top-10 right-2 flex flex-col items-end gap-y-2 rounded-b'}>
                            <Menu.Item>
                                <Link className='hover:bg-blue-900 transition-all py-2 px-5 w-full' href={'/'}>My Profile</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='hover:bg-blue-900 transition-all py-2 px-5 w-full' href={'/'}>Settings</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='hover:bg-blue-900 transition-all py-2 px-5 w-full' href={'/'}>My Profile</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='hover:bg-blue-900 transition-all py-2 px-5 w-full' href={'/'}>My Profile</Link>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>

            </div>
        </div>
    )
}