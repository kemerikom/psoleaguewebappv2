'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import { playerType, teamsType } from "../../../typings"
import { leagueUrl } from "../../../utils/src/leagueUrl"
import ReactCountryFlag from "react-country-flag";
import {IoHeartOutline, IoThumbsUpOutline, IoThumbsDownOutline} from 'react-icons/io5'
import { Tab } from '@headlessui/react'
import MedalRoom from "./MedalRoom"
import TeamHistory from "./TeamHistory"
import { BiTransferAlt } from "react-icons/bi"

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
                <div className="flex flex-col w-full items-start p-3 space-y-2">
                    <h1>{data.username} <Link href={`/teams/${team?._id}`} className={`${team?'visible':'invisible'} hover:underline transition-all`}>[{team?.shortname||''}]</Link></h1>
                    <ReactCountryFlag countryCode={data.country} svg title={data.country} style={{width:'30px'}}/>
                    {team&&
                    <div className="flex flex-row space-x-2">
                        <div className="flex w-6 aspect-square rounded-full items-center justify-center">
                            <img className="w-full aspect-square rounded-full" src='/teamlogo.png'/>
                        </div>
                        <div className="flex h-full items-center justify-center">
                            <Link className="flex items-center justify-center hover:underline transition-all" href={`/teams/${team._id}`}>{team.name}</Link>
                        </div>
                    </div>
                    }
                    <div className="flex flex-row space-x-2">
                        <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white cursor-default">
                            <label>{data.mainpos}</label>
                        </div>
                        <div className=" flex w-6 aspect-square rounded-full bg-green-600 items-center justify-center text-xs text-white">
                            <label>{data.secondpos}</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-row-reverse space-x-2">
                        <label className="flex flex-row space-x-1 mx-1 items-center justify-center text-lg cursor-pointer">
                            {data.followers?`${data.followers.length+1}`:0}
                            <IoHeartOutline/>
                        </label>
                        <div className="flex flex-row space-x-2 mx-1 border border-black rounded px-1">
                            <label className="flex flex-row items-center justify-center text-lg cursor-pointer">
                                <IoThumbsUpOutline/>
                                {data.upvote?`${data.upvote.length}`:0}
                            </label>
                            <label className="flex flex-row space-x-1 items-center justify-center text-lg cursor-pointer">
                                <IoThumbsDownOutline/>
                                {data.downvote?`${data.downvote.length}`:0}
                            </label>
                        </div>
                        <button className="btnPrimary">
                            <BiTransferAlt className="text-lg"/>
                        </button>
                    </div>
                </div>
            </div>

            <Tab.Group>
                <Tab.List className={'flex w-full bg-white p-1 items-center justify-center rounded outline-none'}>
                    <Tab className={'outline-none'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 rounded`}>Team History</div>
                        )}
                    </Tab>
                    <Tab className={'outline-none'}>
                        {({selected})=>(
                            <div className={`${selected?'bg-blue-600 text-white':'text-black'} p-2 rounded`}>Medals</div>
                        )}
                    </Tab>
                </Tab.List>
                <Tab.Panels className={'outline-none'}>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <TeamHistory userId={data._id}/>
                    </Tab.Panel>
                    <Tab.Panel className={'flex w-full p-2 bg-white rounded'}>
                        <MedalRoom userId={data._id}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
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