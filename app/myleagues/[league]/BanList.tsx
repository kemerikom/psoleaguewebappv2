'use client'
import {useState,useEffect} from 'react'
import { banType, leagueName } from '../../../typings'
import { Disclosure } from '@headlessui/react'
import { TbBan } from 'react-icons/tb'
import {IoChevronDownOutline, IoRemove, IoRemoveCircleOutline} from 'react-icons/io5'


export default function BanList({data}:{data:leagueName}){
    const [banList,setBanList]=useState<banType[]>([])
    const [banUserName,setBanUserName]=useState<string>((''))
    useEffect(()=>{
        getBans()
    },[])
    return(
        <div className="flex flex-col p-2 bg-white rounded space-y-2 max-w-4xl w-full">
            <div className="flex row p-1 space-x-2">
                <input className="flex flex-1 rounded bg-blue-600 text-white placeholder:text-gray-100" defaultValue={banUserName} onChange={((e)=>setBanUserName(e.target.value))} maxLength={30} placeholder='Username'></input>
                <button className="flex bg-blue-600 p-2 aspect-square rounded text-white">
                    <TbBan className='text-2xl'/>
                </button>
            </div>
            <hr/>
            {banList.map((ban)=>{
                return(
                <Disclosure key={ban._id}>
                    {({open})=>{
                        return(
                            <>
                                <Disclosure.Button className={`flex flex-row items-center justify-between ${open?'bg-blue-800':'bg-blue-600'} transition-all text-white p-2 rounded`}>
                                    <label className='cursor-pointer'>{ban.username}</label>
                                    <IoChevronDownOutline className={`${open?'rotate-180':''} text-2xl transition-all`}/>
                                </Disclosure.Button>
                                <Disclosure.Panel className={'flex flex-col bg-blue-300 p-2 rounded space-y-2'}>
                                    <label>Banned Date: {new Date(ban.bannedtime).toLocaleString()}</label>
                                    <label>Reason: {ban.reason||'Unknown reason'}</label>
                                    <label>Unban Date: {ban.perma?'Permanent':new Date(ban.datetime||4859308800000).toLocaleString()}</label>
                                    <div className='flex ml-auto bg-red-600 text-white py-1 px-2 rounded space-x-1'>
                                        <label className='cursor-pointer'>Unban</label>
                                        <IoRemoveCircleOutline className='text-2xl'/>
                                    </div>
                                </Disclosure.Panel>
                            </>
    
                        )
                    }}
                </Disclosure>
                )
            })}

        </div>
    )
    async function getBans() {
        fetch(`${process.env.appPath}/api/getRegionOrLeagueBansApi`,{
            method:'POST',
            body:JSON.stringify({
                regionId:data.region,
                leagueId:data._id.toString()
            })
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setBanList(data)
        })
    }
}