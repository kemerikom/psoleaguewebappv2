'use client'
import { userNameIdType } from "../../../typings";
import { Disclosure } from '@headlessui/react'
import {IoAdd, IoChevronDownOutline} from 'react-icons/io5'
import {useContext,useState} from 'react'
import { SiteContext } from "../../../context/SiteContext";
import Link from "next/link";
import { TbBan } from "react-icons/tb";


export default function StaffList({admins,mods,refrees,owner}:{admins:userNameIdType[],mods?:userNameIdType[],refrees?:userNameIdType[],owner:string}){
    const SiteData= useContext(SiteContext)
    const [adminUserName,setAdminUserName]=useState<string>('')
    return(
        <div className="flex flex-col p-2 bg-white rounded space-y-2 max-w-4xl w-full">
            <Disclosure>
                {({open})=>{
                    return(
                        <>
                            <Disclosure.Button className={'flex flex-row items-center justify-between bg-blue-600 text-white p-2 rounded'}>
                                <label className="cursor-pointer">Admins</label>
                                <IoChevronDownOutline className={`${open?'rotate-180':''} text-2xl transition-all`}/>
                            </Disclosure.Button>
                            <Disclosure.Panel className={'flex flex-col bg-blue-300 p-2 rounded space-y-2'}>
                                <div className="flex row p-1 space-x-2">
                                    <input className="flex flex-1 rounded" defaultValue={adminUserName} onChange={((e)=>setAdminUserName(e.target.value))} maxLength={30} placeholder='Username'></input>
                                    <button className="flex bg-blue-600 p-2 aspect-square rounded text-white">
                                        <IoAdd className="text-2xl"/>
                                    </button>
                                </div>
                                <hr/>
                                {admins.map((admin)=>{
                                    return(
                                        <div key={admin.id} className="flex flex-row items-center justify-between p-1 rounded hover:bg-blue-600 hover:text-white transition-all">
                                            <Link href={`/players/${admin.id}`} className='hover:underline'>{admin.username}</Link>
                                            <div className="flex py-1 px-2 bg-red-600 rounded text-white cursor-pointer">
                                                <label className="cursor-pointer">Remove</label>
                                                <TbBan className="text-2xl"/>
                                            </div>
                                        </div>
                                    )
                                })}

                            </Disclosure.Panel>
                        </>
                    )
                }}
            </Disclosure>
            <Disclosure>
                {({open})=>{
                    return(
                        <>
                            <Disclosure.Button className={'flex flex-row items-center justify-between bg-blue-600 text-white p-2 rounded'}>
                                <label className="cursor-pointer">Moderators</label>
                                <IoChevronDownOutline className={`${open?'rotate-180':''} text-2xl transition-all`}/>
                            </Disclosure.Button>
                            <Disclosure.Panel className={'flex flex-col bg-blue-300 p-2 rounded space-y-2'}>
                                <div className="flex row p-1 space-x-2">
                                    <input className="flex flex-1 rounded" defaultValue={adminUserName} onChange={((e)=>setAdminUserName(e.target.value))} maxLength={30} placeholder='Username'></input>
                                    <button className="flex bg-blue-600 p-2 aspect-square rounded text-white">
                                        <IoAdd className="text-2xl"/>
                                    </button>
                                </div>
                                <hr/>
                                {mods?.map((mod)=>{
                                    return(
                                        <div key={mod.id} className="flex flex-row items-center justify-between p-1 rounded hover:bg-blue-600 hover:text-white transition-all">
                                            <Link href={`/players/${mod.id}`} className='hover:underline'>{mod.username}</Link>
                                            <div className="flex py-1 px-2 bg-red-600 rounded text-white cursor-pointer">
                                                <label className="cursor-pointer">Remove</label>
                                                <TbBan className="text-2xl"/>
                                            </div>
                                        </div>
                                    )
                                })}

                            </Disclosure.Panel>
                        </>
                    )
                }}
            </Disclosure>
            <Disclosure>
                {({open})=>{
                    return(
                        <>
                            <Disclosure.Button className={'flex flex-row items-center justify-between bg-blue-600 text-white p-2 rounded'}>
                                <label className="cursor-pointer">Refrees</label>
                                <IoChevronDownOutline className={`${open?'rotate-180':''} text-2xl transition-all`}/>
                            </Disclosure.Button>
                            <Disclosure.Panel className={'flex flex-col bg-blue-300 p-2 rounded space-y-2'}>
                                <div className="flex row p-1 space-x-2">
                                    <input className="flex flex-1 rounded" defaultValue={adminUserName} onChange={((e)=>setAdminUserName(e.target.value))} maxLength={30} placeholder='Username'></input>
                                    <button className="flex bg-blue-600 p-2 aspect-square rounded text-white">
                                        <IoAdd className="text-2xl"/>
                                    </button>
                                </div>
                                <hr/>
                                {refrees?.map((refree)=>{
                                    return(
                                        <div key={refree.id} className="flex flex-row items-center justify-between p-1 rounded hover:bg-blue-600 hover:text-white transition-all">
                                            <Link href={`/players/${refree.id}`} className='hover:underline'>{refree.username}</Link>
                                            <div className="flex py-1 px-2 bg-red-600 rounded text-white cursor-pointer">
                                                <label className="cursor-pointer">Remove</label>
                                                <TbBan className="text-2xl"/>
                                            </div>
                                        </div>
                                    )
                                })}

                            </Disclosure.Panel>
                        </>
                    )
                }}
            </Disclosure>
        </div>
    )
}