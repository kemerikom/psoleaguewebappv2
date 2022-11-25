'use client'
import {useState,useEffect} from 'react'
import { transferType } from '../../../typings'
import { leagueUrl } from '../../../utils/src/leagueUrl'
import Transfer from './Transfer'

export default function TeamHistory({userId}:{userId:string}){
    const [transfers,setTransfers]=useState<transferType[]>([])
    useEffect(()=>{
        getTransfers()
    },[userId])
    return(
        <div className='flex flex-col space-y-2 w-full items-center justify-center'>
            {transfers.sort((a,b)=>a.datetime-b.datetime).map((transfer:transferType)=>{
                return(
                    <Transfer key={transfer._id} data={transfer}/>
                )
            })}
        </div>
    )
    async function getTransfers() {
        fetch(`${leagueUrl}/api/getTransfersByUserId`,{
            method:'POST',
            body:JSON.stringify({userId})
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setTransfers(data)
        })
    }
}