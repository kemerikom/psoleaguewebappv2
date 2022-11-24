'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import { playerType, teamsType } from "../../../typings"
import { leagueUrl } from "../../../utils/src/leagueUrl"
import ReactCountryFlag from "react-country-flag";

export default function PageView({data}:{data:playerType}){
    const [team,setTeam]=useState<teamsType>()
    const [loading,setLoading]=useState<boolean>(false)
    useEffect(()=>{
        getTeamName()
    },[data])
    return(
        <div className="flex flex-col mx-auto rounded p-2 space-y-2 bg-white backdrop-blur-sm bg-opacity-70">
            <div className="flex flex-row h-40">
                <div className="flex items-center h-full aspect-square">
                    <img className="h-full aspect-square rounded-full" src="/teamlogo.png"></img>
                </div>
                <div className="flex flex-col w-full items-start p-3 space-y-1">
                    <h1>{data.username} <Link href={`/teams/${team?._id}`} className={`${team?'visible':'invisible'} hover:underline transition-all`}>[{team?.shortname||''}]</Link></h1>
                    
                    {team&&
                    <div className="flex flex-row space-x-2">
                        <div className="flex w-8 aspect-square rounded-full items-center justify-center">
                            <img className="w-full aspect-square rounded-full" src='/teamlogo.png'/>
                        </div>
                        <div className="flex h-full items-center justify-center">
                            <Link className="flex items-center justify-center hover:underline transition-all" href={`/teams/${team._id}`}>{team.name}</Link>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
    async function getTeamName() {
        setLoading(true)
        fetch(`${leagueUrl}/api/getTeamNameApi`,{
            method:'POST',
            body:JSON.stringify({teamId:data.teamid})
        })
        .then((res)=>{
            const resData=res.json()
            return resData
        })
        .then((data)=>{
            setTeam(data)
        })
        setLoading(false)
    }
}