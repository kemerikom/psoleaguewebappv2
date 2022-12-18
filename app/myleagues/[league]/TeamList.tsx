'use client'
import {useEffect,useState} from 'react'
import { teamsType } from '../../../typings'
import Link from 'next/link'
import {TbBan} from 'react-icons/tb'

export default function TeamList({leagueId}:{leagueId:string}){
    const [teams,setTeams]=useState<teamsType[]>([])
    useEffect(()=>{
        if(leagueId!=undefined)getTeams()
    },[leagueId])
    return(
        <div className="flex flex-col p-2 space-y-2 bg-white rounded items-center">
            <div className='flex flex-col w-full items-center justify-center'>
                <div className='flex flex-row w-full items-start justify-start p-2 rounded'>
                    <Link href={`/teams/`}>Lasisx</Link>
                    <button className='flex ml-auto bg-red-600'>
                        <label>Kick Team</label>
                        <TbBan className='text-2xl text-white'/>
                    </button>
                </div>
            </div>
        </div>
    )
    async function getTeams() {
        fetch(`${process.env.appPath}/api/getLeagueTeamsApi`,{
            method:'POST',
            body:JSON.stringify({leagueId})
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setTeams(data)
        })
    }
}