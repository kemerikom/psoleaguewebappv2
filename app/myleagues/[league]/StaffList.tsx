'use client'
import { leagueIdType, siteDataType, userNameIdType } from "../../../typings";
import { Disclosure } from '@headlessui/react'
import {IoAdd, IoChevronDownOutline} from 'react-icons/io5'
import {useContext,useState,useEffect} from 'react'
import { SiteContext } from "../../../context/SiteContext";
import Link from "next/link";
import { TbBan } from "react-icons/tb";
import { exit } from "process";


export default function StaffList({admins,mods,refrees,owner,leagueId}:{admins:userNameIdType[],mods?:userNameIdType[],refrees?:userNameIdType[],owner:string,leagueId:string}){
    const SiteData= useContext(SiteContext)
    const [adminUserName,setAdminUserName]=useState<string>('')
    const [modUserName,setModUserName]=useState<string>('')
    const [refreeUserName,setRefreeUserName]=useState<string>('')
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
                                    <button className="flex bg-blue-600 p-2 aspect-square rounded text-white" onClick={adminAdd}>
                                        <IoAdd className="text-2xl"/>
                                    </button>
                                </div>
                                <hr/>
                                {admins.map((admin)=>{
                                    return(
                                        <div key={admin.id} className="flex flex-row items-center justify-between p-1 rounded hover:bg-blue-600 hover:text-white transition-all">
                                            <Link href={`/players/${admin.id}`} className='hover:underline'>{admin.username}</Link>
                                            <div className="flex py-1 px-2 bg-red-600 rounded text-white cursor-pointer" onClick={(()=>{adminRemove({adminUserName:admin.username,adminId:admin.id})})}>
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
                                    <input className="flex flex-1 rounded" defaultValue={modUserName} onChange={((e)=>setModUserName(e.target.value))} maxLength={30} placeholder='Username'></input>
                                    <button className="flex bg-blue-600 p-2 aspect-square rounded text-white" onClick={modAdd}>
                                        <IoAdd className="text-2xl"/>
                                    </button>
                                </div>
                                <hr/>
                                {mods?.map((mod)=>{
                                    return(
                                        <div key={mod.id} className="flex flex-row items-center justify-between p-1 rounded hover:bg-blue-600 hover:text-white transition-all">
                                            <Link href={`/players/${mod.id}`} className='hover:underline'>{mod.username}</Link>
                                            <div className="flex py-1 px-2 bg-red-600 rounded text-white cursor-pointer" onClick={(()=>{modRemove({moderatorUserName:mod.username,moderatorId:mod.id})})}>
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
                                    <input className="flex flex-1 rounded" defaultValue={refreeUserName} onChange={((e)=>setRefreeUserName(e.target.value))} maxLength={30} placeholder='Username'></input>
                                    <button className="flex bg-blue-600 p-2 aspect-square rounded text-white" onClick={refreeAdd}>
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
    async function adminAdd() {
        let exist=false
        admins.forEach((admin)=>{
            if(admin.username==adminUserName){
                exist=true
            }
        })
        if(!exist){
            const res = await fetch(`${process.env.appPath}/api/addAdminToLeagueApi`,{
                method:'POST',
                body:JSON.stringify({
                    leagueId,
                    userName:adminUserName
                })
            })
            const result = await res.json()
        }else{
            alert('This user is already admin')
        }
    }

    async function modAdd() {
        let exist =false
        mods?.forEach((mod)=>{
            if(mod.username==modUserName){
                exist=true
            }
        })
        if(!exist){
            const res = await fetch(`${process.env.appPath}/api/addModeratorToLeagueApi`,{
                method:'POST',
                body:JSON.stringify({
                    leagueId,
                    userName:modUserName
                })
            })
            const result = await res.json()
        }else{
            alert('This user already moderator')
        }

    }

    async function refreeAdd() {
        
    }

    async function adminRemove({adminUserName,adminId}:{adminUserName:string,adminId:string}){
        const res = await fetch(`${process.env.appPath}/api/removeLeagueAdminApi`,{
            method:'POST',
            body:JSON.stringify({
                leagueId,
                adminUserName,
                adminId
            })
        })
        const result= await res.json()
    }

    async function modRemove({moderatorUserName,moderatorId}:{moderatorUserName:string,moderatorId:string}) {
        const res = await fetch(`${process.env.appPath}/api/removeLeagueModeratorApi`,{
            method:'POST',
            body:JSON.stringify({
                leagueId,
                moderatorUserName,
                moderatorId
            })
        })
        const result= await res.json()
    }

    async function refreeRemove() {
        
    }
}