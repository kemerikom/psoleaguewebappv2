'use client'
import Link from 'next/link'
import { Menu } from '@headlessui/react'

export default function MainMenu() {
    return(
        <div className="flex flex-row h-10 w-full items-center bg-black bg-opacity-5 backdrop-blur-sm justify-start hover:bg-blue-800 text-white px-2 transition-all">
            <div className="flex flex-row">
                <Link className='flex mx-1' href={'/'}>PSO League</Link>
                <Link className='flex mx-1' href={'/leagues'}>Leagues</Link>
                <Link className='flex mx-1' href={'/'}>Teams</Link>
                <Link className='flex mx-1' href={'/'}>Players</Link>
            </div>
            <div className='flex flex-row ml-auto h-full items-center justify-start'>
                <div className='flex flex-col'>
                    <Menu>
                        <Menu.Button>Profile</Menu.Button>
                        <Menu.Items className={'absolute bg-slate-800 top-10 right-2 p-3 flex flex-col items-end gap-y-2 rounded-b'}>
                            <Menu.Item><Link href={'/'}>My Profile</Link></Menu.Item>
                            <Menu.Item><Link href={'/'}>Settings</Link></Menu.Item>
                            <Menu.Item><Link href={'/'}>My Profile</Link></Menu.Item>
                            <Menu.Item><Link href={'/'}>My Profile</Link></Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>

            </div>
        </div>
    )
}