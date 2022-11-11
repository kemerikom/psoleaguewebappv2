'use client'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { useRouter } from 'next/router'

export default function MainMenu() {
    const router=useRouter()
    return(
        <div className="flex flex-row h-10 items-center justify-start bg-green-800 text-white px-2">
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